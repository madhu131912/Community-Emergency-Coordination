from fastapi import APIRouter, HTTPException, Depends
from app.database import SessionLocal
from app.models import Society
from app.schemas import SocietyCreate, SocietyResponse
from app.auth import get_current_admin_user

router = APIRouter()

@router.post("/", response_model=SocietyResponse)
def create_society(
    society: SocietyCreate,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()

    new_society = Society(
        society_name=society.society_name,
        address=society.address,
        city=society.city,
        state=society.state,
        pincode=society.pincode,
        status=society.status
    )

    db.add(new_society)
    db.commit()
    db.refresh(new_society)
    db.close()

    return new_society

@router.get("/", response_model=list[SocietyResponse])
def get_all_societies():
    db = SessionLocal()
    societies = db.query(Society).all()
    db.close()
    return societies


@router.get("/{society_id}", response_model=SocietyResponse)
def get_society_by_id(society_id: int):
    db = SessionLocal()
    society = db.query(Society).filter(Society.id == society_id).first()
    db.close()

    if not society:
        raise HTTPException(status_code=404, detail="Society not found")

    return society

@router.put("/{society_id}", response_model=SocietyResponse)
def update_society(
    society_id: int,
    updated_society: SocietyCreate,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()
    society = db.query(Society).filter(Society.id == society_id).first()

    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    society.society_name = updated_society.society_name
    society.address = updated_society.address
    society.city = updated_society.city
    society.state = updated_society.state
    society.pincode = updated_society.pincode
    society.status = updated_society.status

    db.commit()
    db.refresh(society)
    db.close()

    return society

@router.delete("/{society_id}")
def delete_society(
    society_id: int,
    current_admin=Depends(get_current_admin_user)
):
    db = SessionLocal()
    society = db.query(Society).filter(Society.id == society_id).first()

    if not society:
        db.close()
        raise HTTPException(status_code=404, detail="Society not found")

    db.delete(society)
    db.commit()
    db.close()

    return {"message": f"Society with id {society_id} deleted successfully"}