from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models import EmergencyAlert, User
from app.schemas import EmergencyAlertCreate, EmergencyAlertResponse

router = APIRouter(prefix="/emergency-alerts", tags=["Emergency Alerts"])


# =========================================================
# CREATE ALERT / SOS
# =========================================================
@router.post("/", response_model=EmergencyAlertResponse)
def create_emergency_alert(alert: EmergencyAlertCreate):
    db = SessionLocal()

    # check user exists
    user = db.query(User).filter(User.id == alert.user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    new_alert = EmergencyAlert(
        user_id=alert.user_id,
        alert_type=alert.alert_type,
        message=alert.message,
        status="active"
    )

    db.add(new_alert)
    db.commit()
    db.refresh(new_alert)
    db.close()

    return new_alert


# =========================================================
# GET ALL ALERTS
# =========================================================
@router.get("/", response_model=list[EmergencyAlertResponse])
def get_all_emergency_alerts():
    db = SessionLocal()
    alerts = db.query(EmergencyAlert).all()
    db.close()
    return alerts


# =========================================================
# GET ALERT BY ID
# =========================================================
@router.get("/{alert_id}", response_model=EmergencyAlertResponse)
def get_emergency_alert_by_id(alert_id: int):
    db = SessionLocal()
    alert = db.query(EmergencyAlert).filter(EmergencyAlert.id == alert_id).first()
    db.close()

    if not alert:
        raise HTTPException(status_code=404, detail="Emergency alert not found")

    return alert


# =========================================================
# GET ALERTS BY USER ID
# =========================================================
@router.get("/user/{user_id}", response_model=list[EmergencyAlertResponse])
def get_emergency_alerts_by_user(user_id: int):
    db = SessionLocal()

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    alerts = db.query(EmergencyAlert).filter(EmergencyAlert.user_id == user_id).all()
    db.close()
    return alerts