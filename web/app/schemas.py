from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# =========================================================
# USER SCHEMAS
# =========================================================

class UserRegister(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    password: str
    role_id: int
    society_id: Optional[int] = None
    block_id: Optional[int] = None
    flat_id: Optional[int] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserProfileResponse(BaseModel):
    user_id: int
    first_name: str
    last_name: str
    email: str
    phone: str
    role_id: Optional[int] = None
    role_name: Optional[str] = None
    society_name: Optional[str] = None
    block_name: Optional[str] = None
    flat_number: Optional[str] = None
    employee_id: Optional[str] = None
    shift_details: Optional[str] = None


class UserProfileUpdate(BaseModel):
    first_name: str
    last_name: str
    phone: str


# =========================================================
# SOCIETY SCHEMAS
# =========================================================

class SocietyCreate(BaseModel):
    society_name: str
    address: str
    city: str
    state: str
    pincode: str
    status: str


class SocietyResponse(BaseModel):
    id: int
    society_name: str
    address: str
    city: str
    state: str
    pincode: str
    status: str

    class Config:
        from_attributes = True


# =========================================================
# BLOCK SCHEMAS
# =========================================================

class BlockCreate(BaseModel):
    society_id: int
    block_name: str
    description: Optional[str] = None


class BlockResponse(BaseModel):
    id: int
    society_id: int
    block_name: str
    description: Optional[str] = None

    class Config:
        from_attributes = True


# =========================================================
# FLAT SCHEMAS
# =========================================================

class FlatCreate(BaseModel):
    block_id: int
    flat_number: str
    floor_number: int


class FlatResponse(BaseModel):
    id: int
    block_id: int
    flat_number: str
    floor_number: int

    class Config:
        from_attributes = True


# =========================================================
# SECURITY PROFILE SCHEMAS
# =========================================================

class SecurityProfileCreate(BaseModel):
    user_id: int
    society_id: int
    employee_id: str
    shift_details: Optional[str] = None


class SecurityProfileResponse(BaseModel):
    id: int
    user_id: int
    society_id: int
    employee_id: str
    shift_details: Optional[str] = None

    class Config:
        from_attributes = True


# =========================================================
# RESIDENT FLAT MAPPING SCHEMAS
# =========================================================

class ResidentFlatCreate(BaseModel):
    user_id: int
    society_id: int
    block_id: int
    flat_id: int


class ResidentFlatResponse(BaseModel):
    id: int
    user_id: int
    resident_name: str
    resident_email: str
    society_id: int
    society_name: str
    block_id: int
    block_name: str
    flat_id: int
    flat_number: str

    class Config:
        from_attributes = True


# =========================================================
# EMERGENCY CONTACT SCHEMAS
# =========================================================

class EmergencyContactCreate(BaseModel):
    resident_user_id: int
    contact_name: str
    relationship: str
    phone: str
    email: Optional[str] = None
    priority_order: int


class EmergencyContactUpdate(BaseModel):
    contact_name: str
    relationship: str
    phone: str
    email: Optional[str] = None
    priority_order: int


class EmergencyContactResponse(BaseModel):
    id: int
    resident_user_id: int
    contact_name: str
    relationship: str
    phone: str
    email: Optional[str] = None
    priority_order: int
    is_verified: bool

    class Config:
        from_attributes = True


# =========================================================
# CONTACT VERIFICATION / OTP
# =========================================================

class OTPGenerateRequest(BaseModel):
    emergency_contact_id: int


class OTPGenerateResponse(BaseModel):
    message: str
    emergency_contact_id: int
    otp: str


class OTPVerifyRequest(BaseModel):
    emergency_contact_id: int
    otp: str


class OTPVerifyResponse(BaseModel):
    message: str
    emergency_contact_id: int
    verified: bool


# =========================================================
# EMERGENCY ALERT
# =========================================================

class EmergencyAlertCreate(BaseModel):
    user_id: int
    alert_type: str
    message: str


class EmergencyAlertResponse(BaseModel):
    id: int
    user_id: int
    alert_type: str
    message: str
    status: str

    class Config:
        from_attributes = True


# =========================================================
# ROLE & ACCESS
# =========================================================

class UserRoleAssign(BaseModel):
    user_id: int
    role_id: int


class UserRoleResponse(BaseModel):
    user_id: int
    full_name: str
    email: str
    role_id: Optional[int] = None
    role_name: Optional[str] = None

    class Config:
        from_attributes = True


# =========================================================
# DASHBOARD
# =========================================================

class DashboardSummaryResponse(BaseModel):
    total_users: int
    total_societies: int
    total_blocks: int
    total_flats: int
    total_resident_mappings: int
    total_emergency_contacts: int
    total_emergency_alerts: int
    verified_contacts: int


# =========================================================
# SOS / INCIDENT
# =========================================================

class SOSAlertCreate(BaseModel):
    resident_id: int
    emergency_type: str
    emergency_message: Optional[str] = None


class SOSAlertStatusUpdate(BaseModel):
    status: str


class SOSAlertResponse(BaseModel):
    id: int
    resident_id: int
    society_id: int
    block_id: int
    flat_id: int
    emergency_type: str
    emergency_message: Optional[str] = None
    status: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# VOLUNTEER AVAILABILITY
# =========================================================

class VolunteerAvailabilityUpdate(BaseModel):
    volunteer_id: int
    is_available: bool


class VolunteerAvailabilityResponse(BaseModel):
    volunteer_id: int
    is_available: bool
    updated_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# ESCALATION LOG
# =========================================================

class EscalationLogCreate(BaseModel):
    sos_alert_id: int
    escalated_to: int
    escalation_level: int


class EscalationLogResponse(BaseModel):
    id: int
    sos_alert_id: int
    escalated_to: int
    escalation_level: int
    escalated_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# ESCALATION STATUS
# Used by Mobile + Web
# =========================================================

class EscalationStatusResponse(BaseModel):
    incident_id: int
    incident_status: str
    current_level: int
    current_stage: str
    escalation_count: int
    responder_id: Optional[int] = None
    responder_name: Optional[str] = None
    responder_role: Optional[str] = None


# =========================================================
# INCIDENT ASSIGNMENT
# =========================================================

class IncidentAssignmentCreate(BaseModel):
    sos_alert_id: int
    responder_id: int
    responder_role: str


class IncidentAssignmentResponse(BaseModel):
    id: int
    sos_alert_id: int
    responder_id: int
    responder_role: str
    status: str
    assigned_at: datetime

    class Config:
        from_attributes = True


# =========================================================
# M3 TASK 2 - INCIDENT LIFECYCLE
# =========================================================

class IncidentStatusUpdate(BaseModel):
    status: str
    performed_by: Optional[int] = None


# =========================================================
# RESPONDER STATUS ACTION
#
# Used for:
# Reached Location
# Assistance Started
# Resolved
# =========================================================

class IncidentActionRequest(BaseModel):
    performed_by: int
    action: str


# =========================================================
# INCIDENT TIMELINE
# =========================================================

class IncidentTimelineCreate(BaseModel):
    incident_id: int
    action: str
    performed_by: Optional[int] = None


class IncidentTimelineResponse(BaseModel):
    id: int
    incident_id: int
    action: str
    performed_by: Optional[int] = None
    timestamp: datetime

    class Config:
        from_attributes = True


# =========================================================
# INCIDENT CLOSURE
# =========================================================

class IncidentCloseRequest(BaseModel):
    resolution_summary: str
    closed_by: int
    remarks: Optional[str] = None


class IncidentClosureResponse(BaseModel):
    id: int
    incident_id: int
    resolution_summary: str
    closed_by: int
    closed_at: datetime
    remarks: Optional[str] = None

    class Config:
        from_attributes = True


# =========================================================
# COMPLETE INCIDENT DETAILS
#
# Shared by Mobile + Web
# =========================================================

class IncidentDetailsResponse(BaseModel):
    id: int

    resident_id: int
    resident_name: Optional[str] = None

    society_id: int
    society_name: Optional[str] = None

    block_id: int
    block_name: Optional[str] = None

    flat_id: int
    flat_number: Optional[str] = None

    emergency_type: str
    emergency_message: Optional[str] = None

    status: str

    created_at: datetime
    updated_at: datetime

    responder_id: Optional[int] = None
    responder_name: Optional[str] = None
    responder_role: Optional[str] = None
    assignment_status: Optional[str] = None

    current_escalation_level: Optional[int] = None
    current_escalation_stage: Optional[str] = None


# =========================================================
# COMPLETE INCIDENT HISTORY
# =========================================================

class IncidentHistoryResponse(BaseModel):
    incident_id: int
    current_status: str
    timeline: List[IncidentTimelineResponse]


# =========================================================
# INCIDENT CLOSURE DETAILS
# =========================================================

class IncidentClosureDetailsResponse(BaseModel):
    incident_id: int
    status: str

    resolution_summary: Optional[str] = None

    closed_by: Optional[int] = None
    closed_by_name: Optional[str] = None

    closed_at: Optional[datetime] = None

    remarks: Optional[str] = None


# =========================================================
# AVAILABLE VOLUNTEER RESPONSE
#
# Useful for Mobile/Web monitoring
# =========================================================

class AvailableVolunteerResponse(BaseModel):
    volunteer_id: int
    volunteer_name: str
    society_id: int
    is_available: bool
    skills: Optional[str] = None
    experience: Optional[str] = None


# =========================================================
# EMAIL / NOTIFICATION RESULT
#
# Backend service can return this when required.
# =========================================================

class NotificationResultResponse(BaseModel):
    success: bool
    recipient: Optional[str] = None
    notification_type: str
    message: str