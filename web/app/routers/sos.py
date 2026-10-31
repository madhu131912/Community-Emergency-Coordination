from fastapi import APIRouter, HTTPException
from app.database import SessionLocal

from app.models import (
    SOSAlert,
    User,
    ResidentFlat,
    Society,
    Block,
    Flat,
    IncidentTimeline
)

from app.schemas import (
    SOSAlertCreate,
    SOSAlertResponse,
    SOSAlertStatusUpdate
)

# =========================================================
# AUTOMATIC ESCALATION SERVICE
# =========================================================

from app.services.escalation_service import start_escalation_timer


router = APIRouter(
    prefix="/api/sos",
    tags=["SOS Alerts"]
)


# =========================================================
# VALID SOS / INCIDENT STATUSES
# =========================================================

ALLOWED_STATUSES = [
    "Open",
    "Assigned",
    "Accepted",
    "Rejected",
    "In Progress",
    "Resolved",
    "Closed",
    "Cancelled"
]


# =========================================================
# HELPER - ADD TIMELINE EVENT
# =========================================================

def add_timeline_event(
    db,
    incident_id: int,
    action: str,
    performed_by=None
):

    event = IncidentTimeline(
        incident_id=incident_id,
        action=action,
        performed_by=performed_by
    )

    db.add(event)

    return event


# =========================================================
# CREATE SOS ALERT
# =========================================================

@router.post(
    "/",
    response_model=SOSAlertResponse
)
def create_sos_alert(
    alert: SOSAlertCreate
):

    db = SessionLocal()

    new_alert_id = None

    try:

        # -----------------------------------------
        # 1. Check resident
        # -----------------------------------------

        resident = db.query(User).filter(
            User.id == alert.resident_id
        ).first()

        if not resident:
            raise HTTPException(
                status_code=404,
                detail="Resident not found"
            )

        # -----------------------------------------
        # 2. Get resident-flat mapping
        # -----------------------------------------

        mapping = db.query(ResidentFlat).filter(
            ResidentFlat.user_id == alert.resident_id
        ).first()

        if not mapping:
            raise HTTPException(
                status_code=404,
                detail="Resident flat mapping not found"
            )

        # -----------------------------------------
        # 3. Validate society
        # -----------------------------------------

        society = db.query(Society).filter(
            Society.id == mapping.society_id
        ).first()

        if not society:
            raise HTTPException(
                status_code=404,
                detail="Society not found"
            )

        # -----------------------------------------
        # 4. Validate block
        # -----------------------------------------

        block = db.query(Block).filter(
            Block.id == mapping.block_id
        ).first()

        if not block:
            raise HTTPException(
                status_code=404,
                detail="Block not found"
            )

        # -----------------------------------------
        # 5. Validate flat
        # -----------------------------------------

        flat = db.query(Flat).filter(
            Flat.id == mapping.flat_id
        ).first()

        if not flat:
            raise HTTPException(
                status_code=404,
                detail="Flat not found"
            )

        # -----------------------------------------
        # 6. Create SOS
        # -----------------------------------------

        new_alert = SOSAlert(
            resident_id=alert.resident_id,
            society_id=mapping.society_id,
            block_id=mapping.block_id,
            flat_id=mapping.flat_id,
            emergency_type=alert.emergency_type,
            emergency_message=alert.emergency_message,
            status="Open"
        )

        db.add(new_alert)

        # Get ID before commit
        db.flush()

        # -----------------------------------------
        # 7. Timeline - SOS Created
        # -----------------------------------------

        add_timeline_event(
            db=db,
            incident_id=new_alert.id,
            action="SOS Created",
            performed_by=alert.resident_id
        )

        # -----------------------------------------
        # 8. Initial notification workflow
        # -----------------------------------------

        add_timeline_event(
            db=db,
            incident_id=new_alert.id,
            action=(
                "Primary Guardian and Security "
                "Notification Initiated"
            ),
            performed_by=None
        )

        # -----------------------------------------
        # 9. Save SOS + timeline
        # -----------------------------------------

        db.commit()

        db.refresh(new_alert)

        # Store ID before leaving DB session
        new_alert_id = new_alert.id

        # -----------------------------------------
        # 10. START AUTOMATIC ESCALATION TIMER
        # -----------------------------------------
        #
        # This starts in a background thread.
        # The API response does NOT wait 30 seconds.
        # -----------------------------------------

        start_escalation_timer(new_alert_id)

        return new_alert

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
# GET ALL SOS ALERTS
# =========================================================

@router.get(
    "/",
    response_model=list[SOSAlertResponse]
)
def get_all_sos_alerts():

    db = SessionLocal()

    try:

        alerts = (
            db.query(SOSAlert)
            .order_by(SOSAlert.created_at.desc())
            .all()
        )

        return alerts

    finally:

        db.close()


# =========================================================
# GET ACTIVE SOS ALERTS
# =========================================================

@router.get(
    "/active/list",
    response_model=list[SOSAlertResponse]
)
def get_active_sos_alerts():

    db = SessionLocal()

    try:

        alerts = (
            db.query(SOSAlert)
            .filter(
                SOSAlert.status.in_([
                    "Open",
                    "Assigned",
                    "Accepted",
                    "In Progress"
                ])
            )
            .order_by(SOSAlert.created_at.desc())
            .all()
        )

        return alerts

    finally:

        db.close()


# =========================================================
# GET RESIDENT SOS HISTORY
# =========================================================

@router.get(
    "/resident/{resident_id}/history",
    response_model=list[SOSAlertResponse]
)
def get_resident_sos_history(
    resident_id: int
):

    db = SessionLocal()

    try:

        resident = db.query(User).filter(
            User.id == resident_id
        ).first()

        if not resident:
            raise HTTPException(
                status_code=404,
                detail="Resident not found"
            )

        alerts = (
            db.query(SOSAlert)
            .filter(
                SOSAlert.resident_id == resident_id
            )
            .order_by(SOSAlert.created_at.desc())
            .all()
        )

        return alerts

    finally:

        db.close()


# =========================================================
# GET SOS ALERT BY ID
# =========================================================

@router.get(
    "/{alert_id}",
    response_model=SOSAlertResponse
)
def get_sos_alert_by_id(
    alert_id: int
):

    db = SessionLocal()

    try:

        alert = db.query(SOSAlert).filter(
            SOSAlert.id == alert_id
        ).first()

        if not alert:
            raise HTTPException(
                status_code=404,
                detail="SOS Alert not found"
            )

        return alert

    finally:

        db.close()


# =========================================================
# UPDATE SOS STATUS
# =========================================================

@router.patch(
    "/{alert_id}/status",
    response_model=SOSAlertResponse
)
def update_sos_status(
    alert_id: int,
    status_update: SOSAlertStatusUpdate
):

    db = SessionLocal()

    try:

        alert = db.query(SOSAlert).filter(
            SOSAlert.id == alert_id
        ).first()

        if not alert:
            raise HTTPException(
                status_code=404,
                detail="SOS Alert not found"
            )

        if status_update.status not in ALLOWED_STATUSES:

            raise HTTPException(
                status_code=400,
                detail="Invalid status"
            )

        # -----------------------------------------
        # Closed incidents cannot change
        # -----------------------------------------

        if alert.status == "Closed":

            raise HTTPException(
                status_code=400,
                detail="Closed incident cannot be updated"
            )

        # -----------------------------------------
        # Close must use Incident Closure API
        # -----------------------------------------

        if status_update.status == "Closed":

            raise HTTPException(
                status_code=400,
                detail=(
                    "Use the incident close endpoint "
                    "to close an incident"
                )
            )

        # -----------------------------------------
        # Resident cancellation
        # -----------------------------------------

        if status_update.status == "Cancelled":

            if alert.status != "Open":

                raise HTTPException(
                    status_code=400,
                    detail=(
                        "Only Open alerts can be cancelled."
                    )
                )

        old_status = alert.status

        alert.status = status_update.status

        # -----------------------------------------
        # Timeline
        # -----------------------------------------

        add_timeline_event(
            db=db,
            incident_id=alert.id,
            action=(
                f"SOS Status Changed: "
                f"{old_status} -> "
                f"{status_update.status}"
            ),
            performed_by=None
        )

        db.commit()

        db.refresh(alert)

        return alert

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