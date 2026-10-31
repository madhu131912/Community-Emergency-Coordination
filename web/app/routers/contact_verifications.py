from fastapi import APIRouter, HTTPException
from datetime import datetime
import random

from app.database import SessionLocal
from app.models import EmergencyContact, ContactVerification
from app.schemas import (
    OTPGenerateRequest,
    OTPGenerateResponse,
    OTPVerifyRequest,
    OTPVerifyResponse
)

router = APIRouter(prefix="/contact-verifications", tags=["Contact Verifications"])


# =========================================================
# GENERATE OTP
# =========================================================
@router.post("/generate-otp", response_model=OTPGenerateResponse)
def generate_otp(payload: OTPGenerateRequest):
    db = SessionLocal()

    # 1. Check emergency contact exists
    contact = db.query(EmergencyContact).filter(
        EmergencyContact.id == payload.emergency_contact_id
    ).first()

    if not contact:
        db.close()
        raise HTTPException(status_code=404, detail="Emergency contact not found")

    # 2. Generate random 6 digit OTP
    otp = str(random.randint(100000, 999999))

    # 3. Check if verification row already exists for this contact
    verification = db.query(ContactVerification).filter(
        ContactVerification.emergency_contact_id == payload.emergency_contact_id
    ).first()

    if verification:
        # Update old OTP
        verification.otp = otp
        verification.verified = False
        verification.created_at = datetime.utcnow()
        verification.verified_at = None
    else:
        # Create new verification row
        verification = ContactVerification(
            emergency_contact_id=payload.emergency_contact_id,
            otp=otp,
            verified=False,
            created_at=datetime.utcnow(),
            verified_at=None
        )
        db.add(verification)

    # Also reset contact verified status until OTP is re-verified
    contact.is_verified = False

    db.commit()
    db.refresh(verification)
    db.close()

    return {
        "message": "OTP generated successfully",
        "emergency_contact_id": payload.emergency_contact_id,
        "otp": otp   # mock OTP returned in response for testing
    }


# =========================================================
# VERIFY OTP
# =========================================================
@router.post("/verify-otp", response_model=OTPVerifyResponse)
def verify_otp(payload: OTPVerifyRequest):
    db = SessionLocal()

    # 1. Find emergency contact
    contact = db.query(EmergencyContact).filter(
        EmergencyContact.id == payload.emergency_contact_id
    ).first()

    if not contact:
        db.close()
        raise HTTPException(status_code=404, detail="Emergency contact not found")

    # 2. Find verification record
    verification = db.query(ContactVerification).filter(
        ContactVerification.emergency_contact_id == payload.emergency_contact_id
    ).first()

    if not verification:
        db.close()
        raise HTTPException(status_code=404, detail="OTP not generated for this contact")

    # 3. Check OTP
    if verification.otp != payload.otp:
        db.close()
        raise HTTPException(status_code=400, detail="Invalid OTP")

    # 4. Mark verified
    verification.verified = True
    verification.verified_at = datetime.utcnow()
    contact.is_verified = True

    db.commit()
    db.refresh(verification)
    db.refresh(contact)
    db.close()

    return {
        "message": "OTP verified successfully",
        "emergency_contact_id": payload.emergency_contact_id,
        "verified": True
    }