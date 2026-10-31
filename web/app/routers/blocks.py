from fastapi import APIRouter, HTTPException, Depends
from app.database import SessionLocal
from app.models import Block, Society
from app.schemas import BlockCreate, BlockResponse
from app.auth import get_current_admin_user

router = APIRouter()


@router.post("/", response_model=BlockResponse)
def create_block(
    block: BlockCreate,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()

    # check society exists
    society = db.query(Society).filter(Society.id == block.society_id).first()
    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    new_block = Block(
        society_id=block.society_id,
        block_name=block.block_name,
        description=block.description
    )

    db.add(new_block)
    db.commit()
    db.refresh(new_block)
    db.close()

    return new_block
@router.get("/", response_model=list[BlockResponse])
def get_all_blocks():
    db = SessionLocal()
    blocks = db.query(Block).all()
    db.close()
    return blocks


@router.get("/{block_id}", response_model=BlockResponse)
def get_block_by_id(block_id: int):
    db = SessionLocal()
    block = db.query(Block).filter(Block.id == block_id).first()
    db.close()

    if not block:
        raise HTTPException(status_code=404, detail="Block not found")

    return block

@router.get("/by-society/{society_id}", response_model=list[BlockResponse])
def get_blocks_by_society(society_id: int):
    db = SessionLocal()

    society = db.query(Society).filter(Society.id == society_id).first()
    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    blocks = db.query(Block).filter(Block.society_id == society_id).all()
    db.close()
    return blocks

@router.put("/{block_id}", response_model=BlockResponse)
def update_block(
    block_id: int,
    updated_block: BlockCreate,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()
    block = db.query(Block).filter(Block.id == block_id).first()

    if not block:
        db.close()
        raise HTTPException(status_code=404, detail="Block not found")

    # check society exists
    society = db.query(Society).filter(Society.id == updated_block.society_id).first()
    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    block.society_id = updated_block.society_id
    block.block_name = updated_block.block_name
    block.description = updated_block.description

    db.commit()
    db.refresh(block)
    db.close()

    return block

@router.delete("/{block_id}")
def delete_block(
    block_id: int,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()
    block = db.query(Block).filter(Block.id == block_id).first()

    if not block:
        db.close()
        raise HTTPException(status_code=404, detail="Block not found")

    db.delete(block)
    db.commit()
    db.close()

    return {"message": f"Block with id {block_id} deleted successfully"}