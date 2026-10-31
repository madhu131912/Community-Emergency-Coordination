from fastapi import APIRouter, HTTPException, Depends
from app.schemas import UserRegister, UserLogin, UserProfileResponse, UserProfileUpdate
from app.database import SessionLocal
from app.auth import get_password_hash, verify_password, create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from app.config import ACCESS_TOKEN_EXPIRE_MINUTES
from app.models import (
    User,
    UserRole,
    Role,
    ResidentFlat,
    Society,
    Block,
    Flat,
    SecurityProfile
)

router = APIRouter()

@router.post("/register")
def register_user(user: UserRegister):
    db = SessionLocal()

    # 1. Check duplicate email
    existing_email = db.query(User).filter(User.email == user.email).first()
    if existing_email:
        db.close()
        raise HTTPException(status_code=400, detail="Email already registered")

    # 2. Check duplicate phone
    existing_phone = db.query(User).filter(User.phone == user.phone).first()
    if existing_phone:
        db.close()
        raise HTTPException(status_code=400, detail="Phone number already registered")

    # 3. Check role exists
    role = db.query(Role).filter(Role.id == user.role_id).first()
    if not role:
        db.close()
        raise HTTPException(status_code=404, detail="Role not found")

    # 4. Role-based validation for Resident
    if user.role_id == 1:   # assuming 1 = Resident
        if not user.society_id or not user.block_id or not user.flat_id:
            db.close()
            raise HTTPException(
                status_code=400,
                detail="Resident must have society_id, block_id and flat_id"
            )

        # Check society exists
        society = db.query(Society).filter(Society.id == user.society_id).first()
        if not society:
            db.close()
            raise HTTPException(status_code=404, detail="Society not found")

        # Check block exists
        block = db.query(Block).filter(Block.id == user.block_id).first()
        if not block:
            db.close()
            raise HTTPException(status_code=404, detail="Block not found")

        # Check flat exists
        flat = db.query(Flat).filter(Flat.id == user.flat_id).first()
        if not flat:
            db.close()
            raise HTTPException(status_code=404, detail="Flat not found")

    # 5. Save user
    new_user = User(
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        phone=user.phone,
        password=get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # 6. Save user-role mapping
    user_role = UserRole(
        user_id=new_user.id,
        role_id=user.role_id
    )
    db.add(user_role)

    # 7. Save resident-flat mapping only for Resident
    if user.role_id == 1:
        resident_flat = ResidentFlat(
            user_id=new_user.id,
            society_id=user.society_id,
            block_id=user.block_id,
            flat_id=user.flat_id
        )
        db.add(resident_flat)

    db.commit()
    db.close()

    return {"message": "User registered successfully"}

@router.post("/login")
def login_user(user: UserLogin):
    db = SessionLocal()

    existing_user = db.query(User).filter(User.email == user.email).first()

    if not existing_user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    # verify hashed password
    if not verify_password(user.password, existing_user.password):
        db.close()
        raise HTTPException(status_code=401, detail="Invalid password")

    # create JWT token
    access_token = create_access_token(
        data={"sub": existing_user.email}
    )

    db.close()

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": existing_user.id,
        "email": existing_user.email
    }

@router.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = SessionLocal()

    try:
        # Swagger sends username field; here username = email
        existing_user = db.query(User).filter(User.email == form_data.username).first()

        # IMPORTANT: return 401 for both wrong email and wrong password
        if not existing_user or not verify_password(form_data.password, existing_user.password):
            raise HTTPException(
                status_code=401,
                detail="Incorrect email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )

        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

        access_token = create_access_token(
            data={"sub": existing_user.email},
            expires_delta=access_token_expires
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    finally:
        db.close()

@router.get("/profile/{user_id}", response_model=UserProfileResponse)
def get_user_profile(user_id: int):
    db = SessionLocal()

    # 1. Get user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Get user role
    user_role = db.query(UserRole).filter(UserRole.user_id == user_id).first()
    role = None
    if user_role:
        role = db.query(Role).filter(Role.id == user_role.role_id).first()

    # 3. Get resident flat mapping
    resident_flat = db.query(ResidentFlat).filter(ResidentFlat.user_id == user_id).first()

    society_name = None
    block_name = None
    flat_number = None

    if resident_flat:
        society = db.query(Society).filter(Society.id == resident_flat.society_id).first()
        block = db.query(Block).filter(Block.id == resident_flat.block_id).first()
        flat = db.query(Flat).filter(Flat.id == resident_flat.flat_id).first()

        if society:
            society_name = society.society_name
        if block:
            block_name = block.block_name
        if flat:
            flat_number = flat.flat_number

    # 4. Get security profile if exists
    security_profile = db.query(SecurityProfile).filter(SecurityProfile.user_id == user_id).first()

    employee_id = None
    shift_details = None

    if security_profile:
        employee_id = security_profile.employee_id
        shift_details = security_profile.shift_details

    response = UserProfileResponse(
        user_id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        phone=user.phone,
        role_id=role.id if role else None,
        role_name=role.role_name if role else None,
        society_name=society_name,
        block_name=block_name,
        flat_number=flat_number,
        employee_id=employee_id,
        shift_details=shift_details
    )

    db.close()
    return response


@router.put("/profile/{user_id}", response_model=UserProfileResponse)
def update_user_profile(user_id: int, updated_data: UserProfileUpdate):
    db = SessionLocal()

    # 1. Get user
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Update user basic fields
    user.first_name = updated_data.first_name
    user.last_name = updated_data.last_name
    user.phone = updated_data.phone

    db.commit()
    db.refresh(user)

    # 3. Fetch role
    user_role = db.query(UserRole).filter(UserRole.user_id == user_id).first()
    role = None
    if user_role:
        role = db.query(Role).filter(Role.id == user_role.role_id).first()

    # 4. Fetch resident flat info
    resident_flat = db.query(ResidentFlat).filter(ResidentFlat.user_id == user_id).first()

    society_name = None
    block_name = None
    flat_number = None

    if resident_flat:
        society = db.query(Society).filter(Society.id == resident_flat.society_id).first()
        block = db.query(Block).filter(Block.id == resident_flat.block_id).first()
        flat = db.query(Flat).filter(Flat.id == resident_flat.flat_id).first()

        if society:
            society_name = society.society_name
        if block:
            block_name = block.block_name
        if flat:
            flat_number = flat.flat_number

    # 5. Fetch security profile if exists
    security_profile = db.query(SecurityProfile).filter(SecurityProfile.user_id == user_id).first()

    employee_id = None
    shift_details = None

    if security_profile:
        employee_id = security_profile.employee_id
        shift_details = security_profile.shift_details

    response = UserProfileResponse(
        user_id=user.id,
        first_name=user.first_name,
        last_name=user.last_name,
        email=user.email,
        phone=user.phone,
        role_id=role.id if role else None,
        role_name=role.role_name if role else None,
        society_name=society_name,
        block_name=block_name,
        flat_number=flat_number,
        employee_id=employee_id,
        shift_details=shift_details
    )

    db.close()
    return response