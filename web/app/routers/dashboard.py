from fastapi import APIRouter
from app.database import SessionLocal
from app.models import (
    User,
    Society,
    Block,
    Flat,
    ResidentFlat,
    EmergencyContact,
    EmergencyAlert
)
from app.schemas import DashboardSummaryResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary", response_model=DashboardSummaryResponse)
def get_dashboard_summary():
    db = SessionLocal()

    total_users = db.query(User).count()
    total_societies = db.query(Society).count()
    total_blocks = db.query(Block).count()
    total_flats = db.query(Flat).count()
    total_resident_mappings = db.query(ResidentFlat).count()
    total_emergency_contacts = db.query(EmergencyContact).count()
    total_emergency_alerts = db.query(EmergencyAlert).count()
    verified_contacts = db.query(EmergencyContact).filter(EmergencyContact.is_verified == True).count()

    db.close()

    return DashboardSummaryResponse(
        total_users=total_users,
        total_societies=total_societies,
        total_blocks=total_blocks,
        total_flats=total_flats,
        total_resident_mappings=total_resident_mappings,
        total_emergency_contacts=total_emergency_contacts,
        total_emergency_alerts=total_emergency_alerts,
        verified_contacts=verified_contacts
    )