from sqlalchemy import (
    Column,
    Integer,
    String,
    Boolean,
    DateTime,
    ForeignKey,
    Text
)
from sqlalchemy.sql import func
from datetime import datetime

from app.database import Base


# =========================================================
# USER
# =========================================================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    phone = Column(String(15), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# =========================================================
# ROLE
# =========================================================

class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    role_name = Column(String(50), unique=True, nullable=False)


# =========================================================
# SOCIETY
# =========================================================

class Society(Base):
    __tablename__ = "societies"

    id = Column(Integer, primary_key=True, index=True)
    society_name = Column(String(150), nullable=False)
    address = Column(String(255), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    pincode = Column(String(10), nullable=False)
    status = Column(String(20), default="active")


# =========================================================
# USER ROLE
# =========================================================

class UserRole(Base):
    __tablename__ = "user_roles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    role_id = Column(
        Integer,
        ForeignKey("roles.id"),
        nullable=False
    )


# =========================================================
# BLOCK
# =========================================================

class Block(Base):
    __tablename__ = "blocks"

    id = Column(Integer, primary_key=True, index=True)

    society_id = Column(
        Integer,
        ForeignKey("societies.id"),
        nullable=False
    )

    block_name = Column(String(100), nullable=False)
    description = Column(String(255), nullable=True)


# =========================================================
# FLAT
# =========================================================

class Flat(Base):
    __tablename__ = "flats"

    id = Column(Integer, primary_key=True, index=True)

    block_id = Column(
        Integer,
        ForeignKey("blocks.id"),
        nullable=False
    )

    flat_number = Column(String(20), nullable=False)
    floor_number = Column(Integer, nullable=False)


# =========================================================
# SECURITY PROFILE
# =========================================================

class SecurityProfile(Base):
    __tablename__ = "security_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    society_id = Column(
        Integer,
        ForeignKey("societies.id"),
        nullable=False
    )

    employee_id = Column(
        String(50),
        unique=True,
        nullable=False
    )

    shift_details = Column(String(100), nullable=True)


# =========================================================
# RESIDENT FLAT
# =========================================================

class ResidentFlat(Base):
    __tablename__ = "resident_flats"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    society_id = Column(
        Integer,
        ForeignKey("societies.id"),
        nullable=False
    )

    block_id = Column(
        Integer,
        ForeignKey("blocks.id"),
        nullable=False
    )

    flat_id = Column(
        Integer,
        ForeignKey("flats.id"),
        nullable=False
    )


# =========================================================
# EMERGENCY CONTACT
# =========================================================

class EmergencyContact(Base):
    __tablename__ = "emergency_contacts"

    id = Column(Integer, primary_key=True, index=True)

    resident_user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    contact_name = Column(String(100), nullable=False)
    relationship = Column(String(50), nullable=False)
    phone = Column(String(15), nullable=False)
    email = Column(String(150), nullable=True)

    priority_order = Column(
        Integer,
        nullable=False,
        default=1
    )

    is_verified = Column(Boolean, default=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


# =========================================================
# CONTACT VERIFICATION
# =========================================================

class ContactVerification(Base):
    __tablename__ = "contact_verifications"

    id = Column(Integer, primary_key=True, index=True)

    emergency_contact_id = Column(
        Integer,
        ForeignKey("emergency_contacts.id"),
        nullable=False
    )

    otp = Column(String(10), nullable=False)
    verified = Column(Boolean, default=False)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    verified_at = Column(
        DateTime,
        nullable=True
    )


# =========================================================
# EMERGENCY ALERT
# =========================================================

class EmergencyAlert(Base):
    __tablename__ = "emergency_alerts"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    alert_type = Column(String(100), nullable=False)

    message = Column(
        String(500),
        nullable=False
    )

    status = Column(
        String(20),
        default="active"
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


# =========================================================
# SOS ALERT / INCIDENT
# =========================================================

class SOSAlert(Base):
    __tablename__ = "sos_alerts"

    id = Column(Integer, primary_key=True, index=True)

    resident_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    society_id = Column(
        Integer,
        ForeignKey("societies.id"),
        nullable=False
    )

    block_id = Column(
        Integer,
        ForeignKey("blocks.id"),
        nullable=False
    )

    flat_id = Column(
        Integer,
        ForeignKey("flats.id"),
        nullable=False
    )

    emergency_type = Column(
        String,
        nullable=False
    )

    emergency_message = Column(
        Text,
        nullable=True
    )

    # Lifecycle:
    # Open -> Assigned -> In Progress -> Resolved -> Closed
    status = Column(
        String,
        default="Open"
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )


# =========================================================
# VOLUNTEER AVAILABILITY
# =========================================================

class VolunteerAvailability(Base):
    __tablename__ = "volunteer_availability"

    id = Column(Integer, primary_key=True, index=True)

    volunteer_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        unique=True
    )

    is_available = Column(
        Boolean,
        default=False
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )


# =========================================================
# VOLUNTEER PROFILE
# =========================================================

class VolunteerProfile(Base):
    __tablename__ = "volunteer_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    society_id = Column(
        Integer,
        ForeignKey("societies.id")
    )

    skills = Column(String(255))

    experience = Column(String(255))


# =========================================================
# ESCALATION LOG
# =========================================================

class EscalationLog(Base):
    __tablename__ = "escalation_logs"

    id = Column(Integer, primary_key=True, index=True)

    sos_alert_id = Column(
        Integer,
        ForeignKey("sos_alerts.id"),
        nullable=False
    )

    escalated_to = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    escalation_level = Column(
        Integer,
        nullable=False
    )

    escalated_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# =========================================================
# INCIDENT ASSIGNMENT
# =========================================================

class IncidentAssignment(Base):
    __tablename__ = "incident_assignments"

    id = Column(Integer, primary_key=True, index=True)

    sos_alert_id = Column(
        Integer,
        ForeignKey("sos_alerts.id"),
        nullable=False
    )

    responder_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    responder_role = Column(
        String(50),
        nullable=False
    )

    assigned_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    status = Column(
        String(30),
        default="Assigned"
    )


# =========================================================
# INCIDENT TIMELINE
# M3 TASK 2
# =========================================================

class IncidentTimeline(Base):
    __tablename__ = "incident_timelines"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    incident_id = Column(
        Integer,
        ForeignKey("sos_alerts.id"),
        nullable=False
    )

    # Examples:
    # SOS Created
    # Guardian Notified
    # Volunteer Assigned
    # Volunteer Accepted
    # Reached Location
    # Assistance Started
    # Incident Resolved
    # Incident Closed
    action = Column(
        String(255),
        nullable=False
    )

    performed_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=True
    )

    timestamp = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )


# =========================================================
# INCIDENT CLOSURE
# M3 TASK 2
# =========================================================

class IncidentClosure(Base):
    __tablename__ = "incident_closures"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    incident_id = Column(
        Integer,
        ForeignKey("sos_alerts.id"),
        nullable=False,
        unique=True
    )

    resolution_summary = Column(
        Text,
        nullable=False
    )

    closed_by = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False
    )

    closed_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    remarks = Column(
        Text,
        nullable=True
    )