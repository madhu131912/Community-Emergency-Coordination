from fastapi import APIRouter, HTTPException
from app.database import SessionLocal

from app.models import (
    SOSAlert,
    EscalationLog,
    IncidentAssignment,
    VolunteerAvailability,
    VolunteerProfile,
    User
)

from app.schemas import EscalationLogResponse


router = APIRouter(
    prefix="/api/escalation",
    tags=["Escalation"]
)


# =========================================================
# ESCALATION LEVELS
# =========================================================

ESCALATION_LEVELS = {
    1: "Guardian",
    2: "Security",
    3: "Volunteer",
    4: "Emergency Contact"
}


# =========================================================
# START ESCALATION
# =========================================================

@router.post("/start/{incident_id}")
def start_escalation(incident_id: int):

    db = SessionLocal()

    try:

        # -------------------------------------------------
        # Check incident
        # -------------------------------------------------

        incident = db.query(SOSAlert).filter(
            SOSAlert.id == incident_id
        ).first()

        if not incident:
            raise HTTPException(
                status_code=404,
                detail="Incident not found"
            )

        # -------------------------------------------------
        # Check if escalation already started
        # -------------------------------------------------

        existing = db.query(EscalationLog).filter(
            EscalationLog.sos_alert_id == incident_id
        ).first()

        if existing:
            raise HTTPException(
                status_code=400,
                detail="Escalation already started"
            )

        # -------------------------------------------------
        # Level 1 = Guardian
        # -------------------------------------------------

        incident.status = "Escalated"

        log = EscalationLog(
            sos_alert_id=incident.id,
            escalated_to=incident.resident_id,
            escalation_level=1
        )

        db.add(log)

        db.commit()
        db.refresh(log)

        return {
            "message": "Escalation started",
            "current_level": 1,
            "current_stage": ESCALATION_LEVELS[1]
        }

    finally:
        db.close()


# =========================================================
# ESCALATE TO NEXT LEVEL
# =========================================================

@router.post("/next/{incident_id}")
def escalate_next_level(incident_id: int):

    db = SessionLocal()

    try:

        # -------------------------------------------------
        # Check incident
        # -------------------------------------------------

        incident = db.query(SOSAlert).filter(
            SOSAlert.id == incident_id
        ).first()

        if not incident:
            raise HTTPException(
                status_code=404,
                detail="Incident not found"
            )

        # -------------------------------------------------
        # Find latest escalation level
        # -------------------------------------------------

        latest = db.query(EscalationLog).filter(
            EscalationLog.sos_alert_id == incident_id
        ).order_by(
            EscalationLog.escalation_level.desc()
        ).first()

        if not latest:
            raise HTTPException(
                status_code=400,
                detail="Escalation not started"
            )

        if latest.escalation_level >= 4:
            return {
                "message": "Maximum escalation level reached",
                "current_level": latest.escalation_level,
                "current_stage": ESCALATION_LEVELS[
                    latest.escalation_level
                ]
            }

        # -------------------------------------------------
        # Calculate next level
        # -------------------------------------------------

        next_level = latest.escalation_level + 1

        # -------------------------------------------------
        # DEFAULT escalated_to
        #
        # For Guardian/Security/Emergency Contact testing,
        # keep current resident reference.
        #
        # For Volunteer level we replace it with actual
        # volunteer ID.
        # -------------------------------------------------

        escalated_to = incident.resident_id
        assigned_volunteer = None

        # =================================================
        # LEVEL 3 = VOLUNTEER
        # AUTO ASSIGN ONLINE VOLUNTEER
        # =================================================

        if next_level == 3:

            # ---------------------------------------------
            # Check whether this incident already has
            # an active assignment
            # ---------------------------------------------

            existing_assignment = db.query(
                IncidentAssignment
            ).filter(
                IncidentAssignment.sos_alert_id
                == incident_id
            ).first()

            if (
                existing_assignment
                and existing_assignment.status != "Rejected"
            ):

                assigned_volunteer = db.query(User).filter(
                    User.id == existing_assignment.responder_id
                ).first()

                escalated_to = (
                    existing_assignment.responder_id
                )

            else:

                # -----------------------------------------
                # If previous responder rejected,
                # remove old rejected assignment
                # -----------------------------------------

                if existing_assignment:

                    db.delete(existing_assignment)
                    db.flush()

                # -----------------------------------------
                # Find ONLINE volunteer from same society
                # -----------------------------------------

                volunteer = (
                    db.query(User)
                    .join(
                        VolunteerAvailability,
                        VolunteerAvailability.volunteer_id
                        == User.id
                    )
                    .join(
                        VolunteerProfile,
                        VolunteerProfile.user_id
                        == User.id
                    )
                    .filter(
                        VolunteerAvailability.is_available
                        == True,

                        VolunteerProfile.society_id
                        == incident.society_id,

                        User.is_active == True
                    )
                    .order_by(
                        User.id.asc()
                    )
                    .first()
                )

                # -----------------------------------------
                # No volunteer found
                #
                # We still record level 3, then the system
                # can continue to Emergency Contact.
                # -----------------------------------------

                if not volunteer:

                    log = EscalationLog(
                        sos_alert_id=incident.id,
                        escalated_to=incident.resident_id,
                        escalation_level=3
                    )

                    db.add(log)

                    incident.status = "Escalated"

                    db.commit()
                    db.refresh(log)

                    return {
                        "message":
                            "Escalated to Volunteer level, "
                            "but no online volunteer was available",

                        "current_level": 3,
                        "current_stage": "Volunteer",

                        "volunteer_assigned": False,

                        "next_action":
                            "Escalate to Emergency Contact"
                    }

                # -----------------------------------------
                # Volunteer found
                # -----------------------------------------

                assigned_volunteer = volunteer

                escalated_to = volunteer.id

                # -----------------------------------------
                # Create assignment automatically
                # -----------------------------------------

                new_assignment = IncidentAssignment(
                    sos_alert_id=incident.id,
                    responder_id=volunteer.id,
                    responder_role="Volunteer",
                    status="Assigned"
                )

                db.add(new_assignment)

                incident.status = "Assigned"

        # =================================================
        # CREATE ESCALATION LOG
        # =================================================

        log = EscalationLog(
            sos_alert_id=incident.id,
            escalated_to=escalated_to,
            escalation_level=next_level
        )

        db.add(log)

        # If this isn't volunteer assignment,
        # incident remains escalated.
        if next_level != 3:
            incident.status = "Escalated"

        db.commit()
        db.refresh(log)

        # =================================================
        # VOLUNTEER RESPONSE
        # =================================================

        if next_level == 3:

            return {
                "message":
                    "Escalated to Volunteer and volunteer "
                    "assigned automatically",

                "current_level": 3,

                "current_stage": "Volunteer",

                "volunteer_assigned": True,

                "responder_id": escalated_to,

                "responder_name": (
                    f"{assigned_volunteer.first_name} "
                    f"{assigned_volunteer.last_name}"
                    if assigned_volunteer
                    else None
                ),

                "incident_status": incident.status
            }

        # =================================================
        # NORMAL RESPONSE
        # =================================================

        return {
            "message": "Escalated successfully",
            "current_level": next_level,
            "current_stage": ESCALATION_LEVELS[next_level]
        }

    finally:
        db.close()


# =========================================================
# STOP ESCALATION
# =========================================================

@router.post("/stop/{incident_id}")
def stop_escalation(incident_id: int):

    db = SessionLocal()

    try:

        incident = db.query(SOSAlert).filter(
            SOSAlert.id == incident_id
        ).first()

        if not incident:
            raise HTTPException(
                status_code=404,
                detail="Incident not found"
            )

        incident.status = "In Progress"

        db.commit()

        return {
            "message": "Escalation stopped",
            "incident_id": incident_id,
            "status": "In Progress"
        }

    finally:
        db.close()


# =========================================================
# GET ESCALATION LOGS
# =========================================================

@router.get(
    "/logs/{incident_id}",
    response_model=list[EscalationLogResponse]
)
def get_escalation_logs(incident_id: int):

    db = SessionLocal()

    try:

        logs = db.query(EscalationLog).filter(
            EscalationLog.sos_alert_id == incident_id
        ).order_by(
            EscalationLog.escalation_level
        ).all()

        return logs

    finally:
        db.close()


# =========================================================
# GET INCIDENT ESCALATION STATUS
# =========================================================

@router.get("/{incident_id}")
def get_incident_escalation(incident_id: int):

    db = SessionLocal()

    try:

        incident = db.query(SOSAlert).filter(
            SOSAlert.id == incident_id
        ).first()

        if not incident:
            raise HTTPException(
                status_code=404,
                detail="Incident not found"
            )

        logs = db.query(EscalationLog).filter(
            EscalationLog.sos_alert_id == incident_id
        ).order_by(
            EscalationLog.escalation_level
        ).all()

        current_level = 0

        if logs:
            current_level = logs[-1].escalation_level

        # ---------------------------------------------
        # Check assignment
        # ---------------------------------------------

        assignment = db.query(
            IncidentAssignment
        ).filter(
            IncidentAssignment.sos_alert_id
            == incident_id
        ).first()

        assignment_data = None

        if assignment:

            responder = db.query(User).filter(
                User.id == assignment.responder_id
            ).first()

            assignment_data = {
                "responder_id":
                    assignment.responder_id,

                "responder_name":
                    (
                        f"{responder.first_name} "
                        f"{responder.last_name}"
                        if responder
                        else None
                    ),

                "responder_role":
                    assignment.responder_role,

                "assignment_status":
                    assignment.status
            }

        return {
            "incident_status":
                incident.status,

            "current_level":
                current_level,

            "current_stage":
                ESCALATION_LEVELS.get(
                    current_level,
                    "Not Started"
                ),

            "escalation_count":
                len(logs),

            "assignment":
                assignment_data,

            "logs":
                logs
        }

    finally:
        db.close()