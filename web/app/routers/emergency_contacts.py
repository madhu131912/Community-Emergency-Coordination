from fastapi import APIRouter, HTTPException
from app.database import SessionLocal
from app.models import EmergencyContact, User
from app.schemas import (
    EmergencyContactCreate,
    EmergencyContactUpdate,
    EmergencyContactResponse
)

router = APIRouter(prefix="/emergency-contacts", tags=["Emergency Contacts"])


# =========================================================
# GET ALL EMERGENCY CONTACTS
# =========================================================
@router.get("/", response_model=list[EmergencyContactResponse])
def get_all_emergency_contacts():
    db = SessionLocal()
    contacts = db.query(EmergencyContact).all()
    db.close()
    return contacts


# =========================================================
# CREATE EMERGENCY CONTACT
# =========================================================
@router.post("/", response_model=EmergencyContactResponse)
def create_emergency_contact(contact: EmergencyContactCreate):
    db = SessionLocal()

    # Check resident user exists
    resident = db.query(User).filter(User.id == contact.resident_user_id).first()
    if not resident:
        db.close()
        raise HTTPException(status_code=404, detail="Resident user not found")

    new_contact = EmergencyContact(
        resident_user_id=contact.resident_user_id,
        contact_name=contact.contact_name,
        relationship=contact.relationship,
        phone=contact.phone,
        email=contact.email,
        priority_order=contact.priority_order
    )

    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    db.close()
    return new_contact


# =========================================================
# GET ONE EMERGENCY CONTACT BY ID
# =========================================================
@router.get("/{contact_id}", response_model=EmergencyContactResponse)
def get_emergency_contact_by_id(contact_id: int):
    db = SessionLocal()
    contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id).first()

    if not contact:
        db.close()
        raise HTTPException(status_code=404, detail="Emergency contact not found")

    db.close()
    return contact


# =========================================================
# GET CONTACTS BY RESIDENT
# =========================================================
@router.get("/by-resident/{resident_id}", response_model=list[EmergencyContactResponse])
def get_emergency_contacts_by_resident(resident_id: int):
    db = SessionLocal()

    contacts = db.query(EmergencyContact).filter(
        EmergencyContact.resident_user_id == resident_id
    ).order_by(EmergencyContact.priority_order.asc()).all()

    db.close()
    return contacts


# =========================================================
# UPDATE EMERGENCY CONTACT
# =========================================================
@router.put("/{contact_id}", response_model=EmergencyContactResponse)
def update_emergency_contact(contact_id: int, contact_data: EmergencyContactUpdate):
    db = SessionLocal()

    contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id).first()
    if not contact:
        db.close()
        raise HTTPException(status_code=404, detail="Emergency contact not found")

    contact.contact_name = contact_data.contact_name
    contact.relationship = contact_data.relationship
    contact.phone = contact_data.phone
    contact.email = contact_data.email
    contact.priority_order = contact_data.priority_order

    db.commit()
    db.refresh(contact)
    db.close()
    return contact


# =========================================================
# DELETE EMERGENCY CONTACT
# =========================================================
@router.delete("/{contact_id}")
def delete_emergency_contact(contact_id: int):
    db = SessionLocal()

    contact = db.query(EmergencyContact).filter(EmergencyContact.id == contact_id).first()
    if not contact:
        db.close()
        raise HTTPException(status_code=404, detail="Emergency contact not found")

    db.delete(contact)
    db.commit()
    db.close()

    return {"message": "Emergency contact deleted successfully"}

