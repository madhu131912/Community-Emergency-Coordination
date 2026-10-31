from fastapi import APIRouter, HTTPException, Depends
from app.database import SessionLocal
from app.models import Flat, Block
from app.schemas import FlatCreate, FlatResponse
from app.auth import get_current_admin_user

router = APIRouter()


@router.post("/", response_model=FlatResponse)
def create_flat(
    flat: FlatCreate,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()

    # check block exists
    block = db.query(Block).filter(Block.id == flat.block_id).first()
    if not block:
        db.close()
        raise HTTPException(status_code=404, detail="Block not found")

    new_flat = Flat(
        block_id=flat.block_id,
        flat_number=flat.flat_number,
        floor_number=flat.floor_number
    )

    db.add(new_flat)
    db.commit()
    db.refresh(new_flat)
    db.close()

    return new_flat

@router.get("/", response_model=list[FlatResponse])
def get_all_flats():
    db = SessionLocal()
    flats = db.query(Flat).all()
    db.close()
    return flats


@router.get("/{flat_id}", response_model=FlatResponse)
def get_flat_by_id(flat_id: int):
    db = SessionLocal()
    flat = db.query(Flat).filter(Flat.id == flat_id).first()
    db.close()

    if not flat:
        raise HTTPException(status_code=404, detail="Flat not found")

    return flat

@router.get("/by-block/{block_id}", response_model=list[FlatResponse])
def get_flats_by_block(block_id: int):
    db = SessionLocal()

    block = db.query(Block).filter(Block.id == block_id).first()
    if not block:
        db.close()
        raise HTTPException(status_code=404, detail="Block not found")

    flats = db.query(Flat).filter(Flat.block_id == block_id).all()
    db.close()
    return flats


@router.put("/{flat_id}", response_model=FlatResponse)
def update_flat(
    flat_id: int,
    updated_flat: FlatCreate,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()
    flat = db.query(Flat).filter(Flat.id == flat_id).first()

    if not flat:
        db.close()
        raise HTTPException(status_code=404, detail="Flat not found")

    # check block exists
    block = db.query(Block).filter(Block.id == updated_flat.block_id).first()
    if not block:
        db.close()
        raise HTTPException(status_code=404, detail="Block not found")

    flat.block_id = updated_flat.block_id
    flat.flat_number = updated_flat.flat_number
    flat.floor_number = updated_flat.floor_number

    db.commit()
    db.refresh(flat)
    db.close()

    return flat

@router.delete("/{flat_id}")
def delete_flat(
    flat_id: int,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()
    flat = db.query(Flat).filter(Flat.id == flat_id).first()

    if not flat:
        db.close()
        raise HTTPException(status_code=404, detail="Flat not found")

    db.delete(flat)
    db.commit()
    db.close()

    return {"message": f"Flat with id {flat_id} deleted successfully"}