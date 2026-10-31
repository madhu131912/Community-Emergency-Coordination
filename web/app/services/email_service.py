import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


# =========================================================
# EMAIL CONFIGURATION
# =========================================================

SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 587

# Replace with YOUR Gmail
SENDER_EMAIL = "madhyusha.p@gmail.com"

# IMPORTANT:
# Use a Gmail App Password, NOT your normal Gmail password.
SENDER_PASSWORD = "frrz henv cupn zehj"


# =========================================================
# SEND EMAIL
# =========================================================

def send_email(
    receiver_email: str,
    subject: str,
    message: str
):

    if not receiver_email:
        print("Email skipped: receiver email missing")
        return False

    try:

        email_message = MIMEMultipart()

        email_message["From"] = SENDER_EMAIL
        email_message["To"] = receiver_email
        email_message["Subject"] = subject

        email_message.attach(
            MIMEText(message, "plain")
        )

        server = smtplib.SMTP(
            SMTP_SERVER,
            SMTP_PORT
        )

        server.starttls()

        server.login(
            SENDER_EMAIL,
            SENDER_PASSWORD
        )

        server.send_message(email_message)

        server.quit()

        print(
            f"Emergency email sent to "
            f"{receiver_email}"
        )

        return True

    except Exception as error:

        print(
            f"Email sending failed: {error}"
        )

        return False


# =========================================================
# SEND SOS EMAIL
# =========================================================

def send_sos_email(
    receiver_email: str,
    receiver_name: str,
    incident_id: int,
    emergency_type: str,
    resident_name: str,
    block_name: str,
    flat_number: str,
    escalation_stage: str
):

    subject = (
        f"URGENT SOS ALERT - {emergency_type} "
        f"- Incident #{incident_id}"
    )

    message = f"""
COMMUNITY EMERGENCY PLATFORM

Emergency assistance is required.

Incident ID: {incident_id}

Emergency Type:
{emergency_type}

Resident:
{resident_name}

Location:
{block_name} - Flat {flat_number}

Current Escalation Stage:
{escalation_stage}

Hello {receiver_name},

You are receiving this alert because you are part of
the emergency response workflow.

Please open the Community Emergency Platform and
respond to this incident immediately.

If the incident is not accepted within the configured
response time, it will automatically escalate to the
next responder level.

Community Emergency Platform
"""

    return send_email(
        receiver_email=receiver_email,
        subject=subject,
        message=message
    )