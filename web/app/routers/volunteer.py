from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models import VolunteerAvailability, User
from app.schemas import (
    VolunteerAvailabilityUpdate,
    VolunteerAvailabilityResponse
)

router = APIRouter(
    prefix="/api/volunteer",
    tags=["Volunteer"]
)

# =========================================================
# GET VOLUNTEER AVAILABILITY
# =========================================================
@router.get(
    "/availability/{volunteer_id}",
    response_model=VolunteerAvailabilityResponse
)
def get_volunteer_availability(volunteer_id: int):

    db = SessionLocal()

    availability = (
        db.query(VolunteerAvailability)
        .filter(VolunteerAvailability.volunteer_id == volunteer_id)
        .first()
    )

    if not availability:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Volunteer availability not found"
        )

    db.close()
    return availability


# =========================================================
# UPDATE VOLUNTEER AVAILABILITY
# =========================================================
@router.put(
    "/availability/{volunteer_id}",
    response_model=VolunteerAvailabilityResponse
)
def update_volunteer_availability(
    volunteer_id: int,
    availability_data: VolunteerAvailabilityUpdate
):

    db = SessionLocal()

    volunteer = (
        db.query(User)
        .filter(User.id == volunteer_id)
        .first()
    )

    if not volunteer:
        db.close()
        raise HTTPException(
            status_code=404,
            detail="Volunteer not found"
        )

    availability = (
        db.query(VolunteerAvailability)
        .filter(VolunteerAvailability.volunteer_id == volunteer_id)
        .first()
    )

    if availability:

        availability.is_available = availability_data.is_available

    else:

        availability = VolunteerAvailability(
            volunteer_id=volunteer_id,
            is_available=availability_data.is_available
        )

        db.add(availability)

    db.commit()
    db.refresh(availability)

    db.close()

    return availability