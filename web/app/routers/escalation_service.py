import threading
import time

from app.database import SessionLocal
from app.models import (
    SOSAlert,
    IncidentAssignment,
    EscalationLog,
    User,
    VolunteerAvailability,
    VolunteerProfile,
    EmergencyContact,
    ResidentFlat,
    Block,
    Flat,
)

from app.services.email_service import send_sos_email


# =========================================================
# TEST TIMER
# =========================================================
# Keep this at 30 seconds while developing.
# Later:
# 120 = 2 minutes
# 300 = 5 minutes
# =========================================================

ESCALATION_WAIT_SECONDS = 30


ESCALATION_LEVELS = {
    1: "Guardian",
    2: "Security",
    3: "Volunteer",
    4: "Emergency Contact",
}


# =========================================================
# CHECK WHETHER ESCALATION SHOULD STOP
# =========================================================

def should_stop_escalation(db, incident_id: int):

    incident = (
        db.query(SOSAlert)
        .filter(SOSAlert.id == incident_id)
        .first()
    )

    if not incident:
        return True

    # Once the incident is being handled,
    # resolved, closed or cancelled,
    # escalation must stop.
    if incident.status in [
        "In Progress",
        "Resolved",
        "Closed",
        "Cancelled",
    ]:
        return True

    assignment = (
        db.query(IncidentAssignment)
        .filter(
            IncidentAssignment.sos_alert_id == incident_id
        )
        .first()
    )

    if assignment and assignment.status == "Accepted":
        return True

    return False


# =========================================================
# GET INCIDENT INFORMATION FOR EMAIL
# =========================================================

def get_incident_email_details(db, incident):

    resident = (
        db.query(User)
        .filter(User.id == incident.resident_id)
        .first()
    )

    block = (
        db.query(Block)
        .filter(Block.id == incident.block_id)
        .first()
    )

    flat = (
        db.query(Flat)
        .filter(Flat.id == incident.flat_id)
        .first()
    )

    resident_name = (
        f"{resident.first_name} {resident.last_name}"
        if resident
        else f"Resident #{incident.resident_id}"
    )

    block_name = (
        block.block_name
        if block
        else f"Block #{incident.block_id}"
    )

    flat_number = (
        flat.flat_number
        if flat
        else str(incident.flat_id)
    )

    return resident_name, block_name, flat_number


# =========================================================
# EMAIL EMERGENCY CONTACTS
# =========================================================

def notify_emergency_contacts(db, incident):

    contacts = (
        db.query(EmergencyContact)
        .filter(
            EmergencyContact.resident_user_id
            == incident.resident_id,
            EmergencyContact.is_verified == True,
        )
        .order_by(EmergencyContact.priority_order.asc())
        .all()
    )

    resident_name, block_name, flat_number = (
        get_incident_email_details(db, incident)
    )

    for contact in contacts:

        if not contact.email:
            continue

        send_sos_email(
            receiver_email=contact.email,
            receiver_name=contact.contact_name,
            incident_id=incident.id,
            emergency_type=incident.emergency_type,
            resident_name=resident_name,
            block_name=block_name,
            flat_number=flat_number,
            escalation_stage="Emergency Contact",
        )


# =========================================================
# FIND + ASSIGN AVAILABLE VOLUNTEER
# =========================================================

def assign_available_volunteer(db, incident):

    # Don't create another active assignment.
    existing = (
        db.query(IncidentAssignment)
        .filter(
            IncidentAssignment.sos_alert_id == incident.id
        )
        .first()
    )

    if existing:

        if existing.status != "Rejected":
            return existing

        db.delete(existing)
        db.flush()

    volunteer = (
        db.query(User)
        .join(
            VolunteerAvailability,
            VolunteerAvailability.volunteer_id == User.id,
        )
        .join(
            VolunteerProfile,
            VolunteerProfile.user_id == User.id,
        )
        .filter(
            VolunteerAvailability.is_available == True,
            VolunteerProfile.society_id == incident.society_id,
            User.is_active == True,
        )
        .order_by(User.id.asc())
        .first()
    )

    if not volunteer:
        print(
            f"No available volunteer for incident "
            f"#{incident.id}"
        )
        return None

    assignment = IncidentAssignment(
        sos_alert_id=incident.id,
        responder_id=volunteer.id,
        responder_role="Volunteer",
        status="Assigned",
    )

    db.add(assignment)

    incident.status = "Assigned"

    db.commit()
    db.refresh(assignment)

    # Send email to volunteer.
    if volunteer.email:

        resident_name, block_name, flat_number = (
            get_incident_email_details(db, incident)
        )

        send_sos_email(
            receiver_email=volunteer.email,
            receiver_name=(
                f"{volunteer.first_name} "
                f"{volunteer.last_name}"
            ),
            incident_id=incident.id,
            emergency_type=incident.emergency_type,
            resident_name=resident_name,
            block_name=block_name,
            flat_number=flat_number,
            escalation_stage="Volunteer",
        )

    return assignment


# =========================================================
# CREATE ESCALATION LOG
# =========================================================

def create_escalation_log(
    db,
    incident,
    level: int,
    escalated_to: int,
):

    log = EscalationLog(
        sos_alert_id=incident.id,
        escalated_to=escalated_to,
        escalation_level=level,
    )

    db.add(log)
    db.commit()


# =========================================================
# AUTOMATIC ESCALATION WORKFLOW
# =========================================================

def run_escalation(incident_id: int):

    print(
        f"Automatic escalation started for "
        f"incident #{incident_id}"
    )

    # -----------------------------------------------------
    # LEVEL 1
    # Guardian
    # -----------------------------------------------------

    db = SessionLocal()

    try:

        incident = (
            db.query(SOSAlert)
            .filter(SOSAlert.id == incident_id)
            .first()
        )

        if not incident:
            return

        if should_stop_escalation(db, incident_id):
            return

        create_escalation_log(
            db,
            incident,
            1,
            incident.resident_id,
        )

        print(
            f"Incident #{incident_id}: "
            f"Guardian stage started"
        )

    finally:
        db.close()

    # Wait for Guardian/Security response.
    time.sleep(ESCALATION_WAIT_SECONDS)

    # -----------------------------------------------------
    # LEVEL 2
    # Security
    # -----------------------------------------------------

    db = SessionLocal()

    try:

        if should_stop_escalation(db, incident_id):

            print(
                f"Incident #{incident_id}: "
                f"escalation stopped after response"
            )

            return

        incident = (
            db.query(SOSAlert)
            .filter(SOSAlert.id == incident_id)
            .first()
        )

        if not incident:
            return

        create_escalation_log(
            db,
            incident,
            2,
            incident.resident_id,
        )

        print(
            f"Incident #{incident_id}: "
            f"escalated to Security"
        )

    finally:
        db.close()

    time.sleep(ESCALATION_WAIT_SECONDS)

    # -----------------------------------------------------
    # LEVEL 3
    # AVAILABLE VOLUNTEER
    # -----------------------------------------------------

    db = SessionLocal()

    try:

        if should_stop_escalation(db, incident_id):
            return

        incident = (
            db.query(SOSAlert)
            .filter(SOSAlert.id == incident_id)
            .first()
        )

        if not incident:
            return

        assignment = assign_available_volunteer(
            db,
            incident,
        )

        escalated_to = (
            assignment.responder_id
            if assignment
            else incident.resident_id
        )

        create_escalation_log(
            db,
            incident,
            3,
            escalated_to,
        )

        print(
            f"Incident #{incident_id}: "
            f"escalated to Volunteer"
        )

    finally:
        db.close()

    time.sleep(ESCALATION_WAIT_SECONDS)

    # -----------------------------------------------------
    # LEVEL 4
    # EMERGENCY CONTACTS
    # -----------------------------------------------------

    db = SessionLocal()

    try:

        if should_stop_escalation(db, incident_id):

            print(
                f"Incident #{incident_id}: "
                f"accepted - escalation stopped"
            )

            return

        incident = (
            db.query(SOSAlert)
            .filter(SOSAlert.id == incident_id)
            .first()
        )

        if not incident:
            return

        create_escalation_log(
            db,
            incident,
            4,
            incident.resident_id,
        )

        notify_emergency_contacts(
            db,
            incident,
        )

        print(
            f"Incident #{incident_id}: "
            f"Emergency Contacts notified"
        )

    finally:
        db.close()

    print(
        f"Automatic escalation completed for "
        f"incident #{incident_id}"
    )


# =========================================================
# START ESCALATION IN BACKGROUND
# =========================================================

def start_escalation_timer(incident_id: int):

    thread = threading.Thread(
        target=run_escalation,
        args=(incident_id,),
        daemon=True,
    )

    thread.start()

    return True