from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models import SecurityProfile, User, Society, UserRole
from app.schemas import SecurityProfileCreate, SecurityProfileResponse

router = APIRouter()


@router.post("/", response_model=SecurityProfileResponse)
def create_security_profile(profile: SecurityProfileCreate):
    db = SessionLocal()

    # check user exists
    user = db.query(User).filter(User.id == profile.user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")
    
     # check user role
    user_role = db.query(UserRole).filter(UserRole.user_id == profile.user_id).first()
    if not user_role or user_role.role_id != 4:
        db.close()
        raise HTTPException(
            status_code=400,
            detail="Security profile can only be created for users with Security role"
        )

    # check society exists
    society = db.query(Society).filter(Society.id == profile.society_id).first()
    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    new_profile = SecurityProfile(
        user_id=profile.user_id,
        society_id=profile.society_id,
        employee_id=profile.employee_id,
        shift_details=profile.shift_details
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)
    db.close()

    return new_profile


@router.get("/", response_model=list[SecurityProfileResponse])
def get_all_security_profiles():
    db = SessionLocal()
    profiles = db.query(SecurityProfile).all()
    db.close()
    return profiles

@router.get("/{profile_id}", response_model=SecurityProfileResponse)
def get_security_profile_by_id(profile_id: int):
    db = SessionLocal()
    profile = db.query(SecurityProfile).filter(SecurityProfile.id == profile_id).first()
    db.close()

    if not profile:
        raise HTTPException(status_code=404, detail="Security profile not found")

    return profile

@router.get("/by-user/{user_id}", response_model=SecurityProfileResponse)
def get_security_profile_by_user(user_id: int):
    db = SessionLocal()

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    profile = db.query(SecurityProfile).filter(SecurityProfile.user_id == user_id).first()
    db.close()

    if not profile:
        raise HTTPException(status_code=404, detail="Security profile not found for this user")

    return profile

@router.put("/{profile_id}", response_model=SecurityProfileResponse)
def update_security_profile(profile_id: int, updated_profile: SecurityProfileCreate):
    db = SessionLocal()
    profile = db.query(SecurityProfile).filter(SecurityProfile.id == profile_id).first()

    if not profile:
        db.close()
        raise HTTPException(status_code=404, detail="Security profile not found")

    user = db.query(User).filter(User.id == updated_profile.user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")
    
    # check user role
    user_role = db.query(UserRole).filter(UserRole.user_id == updated_profile.user_id).first()
    if not user_role or user_role.role_id != 4:
        db.close()
        raise HTTPException(
            status_code=400,
            detail="Security profile can only be created for users with Security role"
        )

    society = db.query(Society).filter(Society.id == updated_profile.society_id).first()
    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    profile.user_id = updated_profile.user_id
    profile.society_id = updated_profile.society_id
    profile.employee_id = updated_profile.employee_id
    profile.shift_details = updated_profile.shift_details

    db.commit()
    db.refresh(profile)
    db.close()

    return profile

@router.delete("/{profile_id}")
def delete_security_profile(profile_id: int):
    db = SessionLocal()
    profile = db.query(SecurityProfile).filter(SecurityProfile.id == profile_id).first()

    if not profile:
        db.close()
        raise HTTPException(status_code=404, detail="Security profile not found")

    db.delete(profile)
    db.commit()
    db.close()

    return {"message": f"Security profile with id {profile_id} deleted successfully"}