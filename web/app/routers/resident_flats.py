from fastapi import APIRouter, HTTPException, Depends
from app.auth import get_current_admin_user
from app.database import SessionLocal
from app.models import User, UserRole, Role, ResidentFlat, Society, Block, Flat
from app.schemas import ResidentFlatCreate, ResidentFlatResponse

router = APIRouter(prefix="/resident-flats", tags=["Resident Flats"])


# =========================================================
# CREATE RESIDENT-FLAT MAPPING
# =========================================================
@router.post("/", response_model=ResidentFlatResponse)
def create_resident_flat_mapping(
    mapping: ResidentFlatCreate,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()

    # 1. Check user exists
    user = db.query(User).filter(User.id == mapping.user_id).first()
    if not user:
        db.close()
        raise HTTPException(status_code=404, detail="User not found")

    # 2. Check user role mapping exists
    user_role = db.query(UserRole).filter(UserRole.user_id == mapping.user_id).first()
    if not user_role:
        db.close()
        raise HTTPException(status_code=404, detail="User role not found")

    role = db.query(Role).filter(Role.id == user_role.role_id).first()
    if not role:
        db.close()
        raise HTTPException(status_code=404, detail="Role not found")

    # 3. Ensure user is a Resident
    if role.role_name.lower() != "resident":
        db.close()
        raise HTTPException(status_code=400, detail="Only resident users can be mapped to flats")

    # 4. Prevent duplicate mapping for same resident
    existing_mapping = db.query(ResidentFlat).filter(ResidentFlat.user_id == mapping.user_id).first()
    if existing_mapping:
        db.close()
        raise HTTPException(status_code=400, detail="Resident is already mapped to a flat")

    # 5. Check society exists
    society = db.query(Society).filter(Society.id == mapping.society_id).first()
    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    # 6. Check block exists
    block = db.query(Block).filter(Block.id == mapping.block_id).first()
    if not block:
        db.close()
        raise HTTPException(status_code=404, detail="Block not found")

    # 7. Check flat exists
    flat = db.query(Flat).filter(Flat.id == mapping.flat_id).first()
    if not flat:
        db.close()
        raise HTTPException(status_code=404, detail="Flat not found")

    # 8. Create mapping
    new_mapping = ResidentFlat(
        user_id=mapping.user_id,
        society_id=mapping.society_id,
        block_id=mapping.block_id,
        flat_id=mapping.flat_id
    )

    db.add(new_mapping)
    db.commit()
    db.refresh(new_mapping)

    response = ResidentFlatResponse(
        id=new_mapping.id,
        user_id=user.id,
        resident_name=f"{user.first_name} {user.last_name}".strip(),
        resident_email=user.email,
        society_id=society.id,
        society_name=society.society_name,
        block_id=block.id,
        block_name=block.block_name,
        flat_id=flat.id,
        flat_number=flat.flat_number
    )

    db.close()
    return response


# =========================================================
# GET ALL RESIDENT-FLAT MAPPINGS
# =========================================================
@router.get("/", response_model=list[ResidentFlatResponse])
def get_all_resident_flat_mappings():
    db = SessionLocal()

    mappings = db.query(ResidentFlat).all()
    response_list = []

    for mapping in mappings:
        user = db.query(User).filter(User.id == mapping.user_id).first()
        society = db.query(Society).filter(Society.id == mapping.society_id).first()
        block = db.query(Block).filter(Block.id == mapping.block_id).first()
        flat = db.query(Flat).filter(Flat.id == mapping.flat_id).first()

        if user and society and block and flat:
            response_list.append(
                ResidentFlatResponse(
                    id=mapping.id,
                    user_id=user.id,
                    resident_name=f"{user.first_name} {user.last_name}".strip(),
                    resident_email=user.email,
                    society_id=society.id,
                    society_name=society.society_name,
                    block_id=block.id,
                    block_name=block.block_name,
                    flat_id=flat.id,
                    flat_number=flat.flat_number
                )
            )

    db.close()
    return response_list


# =========================================================
# GET RESIDENT MAPPING BY USER ID
# =========================================================
@router.get("/user/{user_id}", response_model=ResidentFlatResponse)
def get_mapping_by_user_id(user_id: int):
    db = SessionLocal()

    mapping = db.query(ResidentFlat).filter(ResidentFlat.user_id == user_id).first()
    if not mapping:
        db.close()
        raise HTTPException(status_code=404, detail="Resident mapping not found")

    user = db.query(User).filter(User.id == mapping.user_id).first()
    society = db.query(Society).filter(Society.id == mapping.society_id).first()
    block = db.query(Block).filter(Block.id == mapping.block_id).first()
    flat = db.query(Flat).filter(Flat.id == mapping.flat_id).first()

    if not user or not society or not block or not flat:
        db.close()
        raise HTTPException(status_code=404, detail="Related mapping data not found")

    response = ResidentFlatResponse(
        id=mapping.id,
        user_id=user.id,
        resident_name=f"{user.first_name} {user.last_name}".strip(),
        resident_email=user.email,
        society_id=society.id,
        society_name=society.society_name,
        block_id=block.id,
        block_name=block.block_name,
        flat_id=flat.id,
        flat_number=flat.flat_number
    )

    db.close()
    return response


# =========================================================
# GET ALL RESIDENTS OF A FLAT
# =========================================================
@router.get("/flat/{flat_id}", response_model=list[ResidentFlatResponse])
def get_residents_by_flat_id(flat_id: int):
    db = SessionLocal()

    mappings = db.query(ResidentFlat).filter(ResidentFlat.flat_id == flat_id).all()
    if not mappings:
        db.close()
        raise HTTPException(status_code=404, detail="No residents found for this flat")

    response_list = []

    for mapping in mappings:
        user = db.query(User).filter(User.id == mapping.user_id).first()
        society = db.query(Society).filter(Society.id == mapping.society_id).first()
        block = db.query(Block).filter(Block.id == mapping.block_id).first()
        flat = db.query(Flat).filter(Flat.id == mapping.flat_id).first()

        if user and society and block and flat:
            response_list.append(
                ResidentFlatResponse(
                    id=mapping.id,
                    user_id=user.id,
                    resident_name=f"{user.first_name} {user.last_name}".strip(),
                    resident_email=user.email,
                    society_id=society.id,
                    society_name=society.society_name,
                    block_id=block.id,
                    block_name=block.block_name,
                    flat_id=flat.id,
                    flat_number=flat.flat_number
                )
            )

    db.close()
    return response_list


# =========================================================
# DELETE RESIDENT-FLAT MAPPING
# =========================================================
@router.delete("/{mapping_id}")
def delete_resident_flat_mapping(
    mapping_id: int,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()

    mapping = db.query(ResidentFlat).filter(ResidentFlat.id == mapping_id).first()
    if not mapping:
        db.close()
        raise HTTPException(status_code=404, detail="Resident mapping not found")

    db.delete(mapping)
    db.commit()
    db.close()

    return {"message": "Resident mapping deleted successfully"}