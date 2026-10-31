from fastapi import APIRouter, HTTPException
from app.database import SessionLocal

from app.models import (
    SOSAlert,
    IncidentAssignment,
    User,
    Society,
    Block,
    Flat,
    VolunteerAvailability,
    VolunteerProfile,
    IncidentTimeline,
    IncidentClosure,
    EscalationLog
)

from app.schemas import (
    IncidentAssignmentCreate,
    IncidentAssignmentResponse,
    IncidentStatusUpdate,
    IncidentActionRequest,
    IncidentCloseRequest,
    IncidentTimelineResponse
)


router = APIRouter(
    prefix="/api/incidents",
    tags=["Incident Management"]
)


# =========================================================
# VALID INCIDENT STATUSES
# =========================================================

VALID_STATUSES = [
    "Open",
    "Assigned",
    "In Progress",
    "Resolved",
    "Closed"
]


ESCALATION_LEVELS = {
    1: "Guardian",
    2: "Security",
    3: "Volunteer",
    4: "Emergency Contact"
}


# =========================================================
# HELPER - CREATE TIMELINE EVENT
# =========================================================

def add_timeline_event(
    db,
    incident_id: int,
    action: str,
    performed_by=None
):
    timeline = IncidentTimeline(
        incident_id=incident_id,
        action=action,
        performed_by=performed_by
    )

    db.add(timeline)

    return timeline


# =========================================================
# MANUAL ASSIGN INCIDENT
# =========================================================

@router.post(
    "/assign",
    response_model=IncidentAssignmentResponse
)
def assign_incident(
    assignment: IncidentAssignmentCreate
):

    db = SessionLocal()

    try:

        incident = db.query(SOSAlert).filter(
            SOSAlert.id == assignment.sos_alert_id
        ).first()

        if not incident:
            raise HTTPException(
                status_code=404,
                detail="Incident not found"
            )

        if incident.status in ["Resolved", "Closed"]:
            raise HTTPException(
                status_code=400,
                detail="Resolved or closed incident cannot be assigned"
            )

        responder = db.query(User).filter(
            User.id == assignment.responder_id
        ).first()

        if not responder:
            raise HTTPException(
                status_code=404,
                detail="Responder not found"
            )

        existing_assignment = db.query(
            IncidentAssignment
        ).filter(
            IncidentAssignment.sos_alert_id
            == assignment.sos_alert_id
        ).first()

        if existing_assignment:

            if existing_assignment.status != "Rejected":
                raise HTTPException(
                    status_code=400,
                    detail="Incident is already assigned"
                )

            db.delete(existing_assignment)
            db.flush()

        new_assignment = IncidentAssignment(
            sos_alert_id=assignment.sos_alert_id,
            responder_id=assignment.responder_id,
            responder_role=assignment.responder_role,
            status="Assigned"
        )

        db.add(new_assignment)

        incident.status = "Assigned"

        add_timeline_event(
            db,
            incident.id,
            f"Incident assigned to {assignment.responder_role}",
            assignment.responder_id
        )

        db.commit()
        db.refresh(new_assignment)

        return new_assignment

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()


# =========================================================
# AUTO ASSIGN AVAILABLE VOLUNTEER
# =========================================================

@router.post(
    "/{incident_id}/auto-assign",
    response_model=IncidentAssignmentResponse
)
def auto_assign_volunteer(
    incident_id: int
):

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

        if incident.status in ["Resolved", "Closed"]:
            raise HTTPException(
                status_code=400,
                detail="Resolved or closed incident cannot be assigned"
            )

        existing_assignment = db.query(
            IncidentAssignment
        ).filter(
            IncidentAssignment.sos_alert_id == incident_id
        ).first()

        if existing_assignment:

            if existing_assignment.status != "Rejected":
                raise HTTPException(
                    status_code=400,
                    detail="Incident is already assigned"
                )

            db.delete(existing_assignment)
            db.flush()

        volunteer = (
            db.query(User)
            .join(
                VolunteerAvailability,
                VolunteerAvailability.volunteer_id == User.id
            )
            .join(
                VolunteerProfile,
                VolunteerProfile.user_id == User.id
            )
            .filter(
                VolunteerAvailability.is_available == True,
                VolunteerProfile.society_id == incident.society_id,
                User.is_active == True
            )
            .order_by(User.id.asc())
            .first()
        )

        if not volunteer:
            raise HTTPException(
                status_code=404,
                detail="No available volunteer found"
            )

        new_assignment = IncidentAssignment(
            sos_alert_id=incident.id,
            responder_id=volunteer.id,
            responder_role="Volunteer",
            status="Assigned"
        )

        db.add(new_assignment)

        incident.status = "Assigned"

        add_timeline_event(
            db,
            incident.id,
            "Volunteer Assigned",
            volunteer.id
        )

        db.commit()
        db.refresh(new_assignment)

        return new_assignment

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()


# =========================================================
# GET ASSIGNED RESPONDER
# =========================================================

@router.get(
    "/{incident_id}/assigned",
    response_model=IncidentAssignmentResponse
)
def get_assignment(
    incident_id: int
):

    db = SessionLocal()

    try:

        assignment = db.query(
            IncidentAssignment
        ).filter(
            IncidentAssignment.sos_alert_id == incident_id
        ).first()

        if not assignment:
            raise HTTPException(
                status_code=404,
                detail="No assignment found"
            )

        return assignment

    finally:
        db.close()


# =========================================================
# ACCEPT INCIDENT
# =========================================================

@router.post("/{incident_id}/accept")
def accept_incident(
    incident_id: int
):

    db = SessionLocal()

    try:

        assignment = db.query(
            IncidentAssignment
        ).filter(
            IncidentAssignment.sos_alert_id == incident_id
        ).first()

        if not assignment:
            raise HTTPException(
                status_code=404,
                detail="Assignment not found"
            )

        if assignment.status == "Rejected":
            raise HTTPException(
                status_code=400,
                detail="Rejected assignment cannot be accepted"
            )

        incident = db.query(SOSAlert).filter(
            SOSAlert.id == incident_id
        ).first()

        if not incident:
            raise HTTPException(
                status_code=404,
                detail="Incident not found"
            )

        if incident.status in ["Resolved", "Closed"]:
            raise HTTPException(
                status_code=400,
                detail="Incident is already resolved or closed"
            )

        assignment.status = "Accepted"
        incident.status = "In Progress"

        add_timeline_event(
            db,
            incident_id,
            f"{assignment.responder_role} Accepted Incident",
            assignment.responder_id
        )

        add_timeline_event(
            db,
            incident_id,
            "Assistance In Progress",
            assignment.responder_id
        )

        db.commit()

        return {
            "message": "Incident accepted",
            "incident_id": incident_id,
            "responder_id": assignment.responder_id,
            "responder_role": assignment.responder_role,
            "status": "In Progress",
            "escalation_stopped": True
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()


# =========================================================
# REJECT INCIDENT
# =========================================================

@router.post("/{incident_id}/reject")
def reject_incident(
    incident_id: int
):

    db = SessionLocal()

    try:

        assignment = db.query(
            IncidentAssignment
        ).filter(
            IncidentAssignment.sos_alert_id == incident_id
        ).first()

        if not assignment:
            raise HTTPException(
                status_code=404,
                detail="Assignment not found"
            )

        incident = db.query(SOSAlert).filter(
            SOSAlert.id == incident_id
        ).first()

        if not incident:
            raise HTTPException(
                status_code=404,
                detail="Incident not found"
            )

        if incident.status in ["Resolved", "Closed"]:
            raise HTTPException(
                status_code=400,
                detail="Resolved or closed incident cannot be rejected"
            )

        assignment.status = "Rejected"
        incident.status = "Open"

        add_timeline_event(
            db,
            incident_id,
            f"{assignment.responder_role} Declined Incident",
            assignment.responder_id
        )

        db.commit()

        return {
            "message": "Incident rejected",
            "incident_id": incident_id,
            "status": "Open",
            "requires_escalation": True
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()


# =========================================================
# GET COMPLETE INCIDENT DETAILS
# =========================================================

@router.get("/{incident_id}")
def get_incident_details(
    incident_id: int
):

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

        resident = db.query(User).filter(
            User.id == incident.resident_id
        ).first()

        society = db.query(Society).filter(
            Society.id == incident.society_id
        ).first()

        block = db.query(Block).filter(
            Block.id == incident.block_id
        ).first()

        flat = db.query(Flat).filter(
            Flat.id == incident.flat_id
        ).first()

        assignment = db.query(
            IncidentAssignment
        ).filter(
            IncidentAssignment.sos_alert_id == incident_id
        ).first()

        responder = None

        if assignment:
            responder = db.query(User).filter(
                User.id == assignment.responder_id
            ).first()

        latest_escalation = db.query(
            EscalationLog
        ).filter(
            EscalationLog.sos_alert_id == incident_id
        ).order_by(
            EscalationLog.escalation_level.desc()
        ).first()

        escalation_level = 0
        escalation_stage = "Not Started"

        if latest_escalation:
            escalation_level = latest_escalation.escalation_level
            escalation_stage = ESCALATION_LEVELS.get(
                escalation_level,
                "Unknown"
            )

        return {
            "id": incident.id,

            "resident_id": incident.resident_id,
            "resident_name": (
                f"{resident.first_name} {resident.last_name}"
                if resident else None
            ),

            "society_id": incident.society_id,
            "society_name": (
                society.society_name if society else None
            ),

            "block_id": incident.block_id,
            "block_name": (
                block.block_name if block else None
            ),

            "flat_id": incident.flat_id,
            "flat_number": (
                flat.flat_number if flat else None
            ),

            "emergency_type": incident.emergency_type,
            "emergency_message": incident.emergency_message,

            "status": incident.status,

            "created_at": incident.created_at,
            "updated_at": incident.updated_at,

            "responder_id": (
                assignment.responder_id
                if assignment else None
            ),

            "responder_name": (
                f"{responder.first_name} {responder.last_name}"
                if responder else None
            ),

            "responder_role": (
                assignment.responder_role
                if assignment else None
            ),

            "assignment_status": (
                assignment.status
                if assignment else None
            ),

            "current_escalation_level": escalation_level,
            "current_escalation_stage": escalation_stage
        }

    finally:
        db.close()


# =========================================================
# UPDATE INCIDENT STATUS
# =========================================================

@router.patch("/{incident_id}/status")
def update_incident_status(
    incident_id: int,
    status_data: IncidentStatusUpdate
):

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

        if status_data.status not in VALID_STATUSES:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Invalid status. Allowed statuses: "
                    "Open, Assigned, In Progress, Resolved, Closed"
                )
            )

        if incident.status == "Closed":
            raise HTTPException(
                status_code=400,
                detail="Closed incident cannot be updated"
            )

        # Closed must use the close endpoint so that
        # closure documentation is always recorded.
        if status_data.status == "Closed":
            raise HTTPException(
                status_code=400,
                detail="Use /close endpoint to close an incident"
            )

        old_status = incident.status
        incident.status = status_data.status

        add_timeline_event(
            db,
            incident_id,
            f"Status changed from {old_status} to {status_data.status}",
            status_data.performed_by
        )

        db.commit()

        return {
            "message": "Incident status updated",
            "incident_id": incident_id,
            "previous_status": old_status,
            "status": incident.status
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()


# =========================================================
# RESPONDER ACTION
#
# Reached Location
# Assistance Started
# Resolved
# =========================================================

@router.post("/{incident_id}/action")
def incident_action(
    incident_id: int,
    action_data: IncidentActionRequest
):

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

        if incident.status == "Closed":
            raise HTTPException(
                status_code=400,
                detail="Closed incident cannot be updated"
            )

        user = db.query(User).filter(
            User.id == action_data.performed_by
        ).first()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        allowed_actions = [
            "Reached Location",
            "Assistance Started",
            "Resolved"
        ]

        if action_data.action not in allowed_actions:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Allowed actions: Reached Location, "
                    "Assistance Started, Resolved"
                )
            )

        if action_data.action == "Reached Location":
            incident.status = "In Progress"

        elif action_data.action == "Assistance Started":
            incident.status = "In Progress"

        elif action_data.action == "Resolved":
            incident.status = "Resolved"

        add_timeline_event(
            db,
            incident_id,
            action_data.action,
            action_data.performed_by
        )

        db.commit()

        return {
            "message": "Incident action recorded",
            "incident_id": incident_id,
            "action": action_data.action,
            "status": incident.status
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()


# =========================================================
# RESOLVE INCIDENT
# =========================================================

@router.post("/{incident_id}/resolve")
def resolve_incident(
    incident_id: int,
    performed_by: int
):

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

        if incident.status == "Closed":
            raise HTTPException(
                status_code=400,
                detail="Incident is already closed"
            )

        user = db.query(User).filter(
            User.id == performed_by
        ).first()

        if not user:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        incident.status = "Resolved"

        add_timeline_event(
            db,
            incident_id,
            "Incident Resolved",
            performed_by
        )

        db.commit()

        return {
            "message": "Incident resolved",
            "incident_id": incident_id,
            "status": "Resolved"
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()


# =========================================================
# CLOSE INCIDENT
# =========================================================

@router.post("/{incident_id}/close")
def close_incident(
    incident_id: int,
    closure_data: IncidentCloseRequest
):

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

        if incident.status == "Closed":
            raise HTTPException(
                status_code=400,
                detail="Incident is already closed"
            )

        # Enforce lifecycle:
        # incident should be resolved before closure.
        if incident.status != "Resolved":
            raise HTTPException(
                status_code=400,
                detail="Incident must be resolved before closing"
            )

        closing_user = db.query(User).filter(
            User.id == closure_data.closed_by
        ).first()

        if not closing_user:
            raise HTTPException(
                status_code=404,
                detail="Closing user not found"
            )

        existing_closure = db.query(
            IncidentClosure
        ).filter(
            IncidentClosure.incident_id == incident_id
        ).first()

        if existing_closure:
            raise HTTPException(
                status_code=400,
                detail="Closure documentation already exists"
            )

        closure = IncidentClosure(
            incident_id=incident_id,
            resolution_summary=closure_data.resolution_summary,
            closed_by=closure_data.closed_by,
            remarks=closure_data.remarks
        )

        db.add(closure)

        incident.status = "Closed"

        add_timeline_event(
            db,
            incident_id,
            "Incident Closed",
            closure_data.closed_by
        )

        db.commit()
        db.refresh(closure)

        return {
            "message": "Incident closed successfully",
            "incident_id": incident_id,
            "status": "Closed",
            "resolution_summary": closure.resolution_summary,
            "closed_by": closure.closed_by,
            "closed_at": closure.closed_at,
            "remarks": closure.remarks
        }

    except HTTPException:
        db.rollback()
        raise

    except Exception as error:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )

    finally:
        db.close()





# =========================================================
# GET INCIDENT TIMELINE / HISTORY
# =========================================================

@router.get(
    "/{incident_id}/history",
    response_model=list[IncidentTimelineResponse]
)
def get_incident_history(
    incident_id: int
):

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

        timeline = db.query(
            IncidentTimeline
        ).filter(
            IncidentTimeline.incident_id == incident_id
        ).order_by(
            IncidentTimeline.timestamp.asc()
        ).all()

        return timeline

    finally:
        db.close()


# =========================================================
# GET CLOSURE DOCUMENTATION
# =========================================================

@router.get("/{incident_id}/closure")
def get_incident_closure(
    incident_id: int
):

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

        closure = db.query(
            IncidentClosure
        ).filter(
            IncidentClosure.incident_id == incident_id
        ).first()

        if not closure:
            raise HTTPException(
                status_code=404,
                detail="Incident closure not found"
            )

        closing_user = db.query(User).filter(
            User.id == closure.closed_by
        ).first()

        return {
            "incident_id": incident_id,
            "status": incident.status,

            "resolution_summary":
                closure.resolution_summary,

            "closed_by":
                closure.closed_by,

            "closed_by_name": (
                f"{closing_user.first_name} {closing_user.last_name}"
                if closing_user else None
            ),

            "closed_at":
                closure.closed_at,

            "remarks":
                closure.remarks
        }

    finally:
        db.close()