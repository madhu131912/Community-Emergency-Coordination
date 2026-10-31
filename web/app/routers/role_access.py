from fastapi import APIRouter, HTTPException, Depends
from app.database import SessionLocal
from app.models import User, Role, UserRole
from app.schemas import UserRoleAssign, UserRoleResponse
from app.auth import get_current_admin_user

router = APIRouter(prefix="/role-access", tags=["Role & Access"])


# =========================================================
# GET ALL USERS WITH ROLE INFO
# =========================================================
@router.get("/", response_model=list[UserRoleResponse])
def get_all_users_with_roles():
    db = SessionLocal()

    users = db.query(User).all()
    response_list = []

    for user in users:
        user_role = db.query(UserRole).filter(UserRole.user_id == user.id).first()

        role_id = None
        role_name = None

        if user_role:
            role = db.query(Role).filter(Role.id == user_role.role_id).first()
            if role:
                role_id = role.id
                role_name = role.role_name

        response_list.append(
            UserRoleResponse(
                user_id=user.id,
                full_name=f"{user.first_name} {user.last_name}".strip(),
                email=user.email,
                role_id=role_id,
                role_name=role_name
            )
        )

    db.close()
    return response_list


# =========================================================
# GET ROLE INFO FOR ONE USER
# =========================================================
@router.get("/{user_id}", response_model=UserRoleResponse)
def get_user_role_by_user_id(user_id: int):
    db = SessionLocal()

    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    user_role = db.query(UserRole).filter(UserRole.user_id == user_id).first()

    role_id = None
    role_name = None

    if user_role:
        role = db.query(Role).filter(Role.id == user_role.role_id).first()
        if role:
            role_id = role.id
            role_name = role.role_name

    response = UserRoleResponse(
        user_id=user.id,
        full_name=f"{user.first_name} {user.last_name}".strip(),
        email=user.email,
        role_id=role_id,
        role_name=role_name
    )

    db.close()
    return response


# =========================================================
# ASSIGN / UPDATE ROLE FOR USER
# ADMIN ONLY
# =========================================================
@router.post("/assign-role", response_model=UserRoleResponse)
def assign_or_update_role(
    payload: UserRoleAssign,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()

    user = db.query(User).filter(User.id == payload.user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    role = db.query(Role).filter(Role.id == payload.role_id).first()
    if not role:
        db.close()
        raise HTTPException(status_code=404, detail="Role not found")

    user_role = db.query(UserRole).filter(UserRole.user_id == payload.user_id).first()

    if user_role:
        user_role.role_id = payload.role_id
    else:
        user_role = UserRole(user_id=payload.user_id, role_id=payload.role_id)
        db.add(user_role)

    db.commit()
    db.refresh(user_role)

    response = UserRoleResponse(
        user_id=user.id,
        full_name=f"{user.first_name} {user.last_name}".strip(),
        email=user.email,
        role_id=role.id,
        role_name=role.role_name
    )

    db.close()
    return response