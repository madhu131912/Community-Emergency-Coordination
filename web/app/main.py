
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine
from app.models import Base
from app.routers import (
    users,
    societies,
    blocks,
    flats,
    resident_flats,
    emergency_contacts,
    contact_verifications,
    emergency_alerts,
    role_access,
    dashboard ,
    sos

)
from app.routers import (
    volunteer,
    escalation,
    incident_assignment
)

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:5500",
    "null"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(societies.router, prefix="/societies", tags=["Societies"])
app.include_router(blocks.router, prefix="/blocks", tags=["Blocks"])
app.include_router(flats.router, prefix="/flats", tags=["Flats"])
app.include_router(resident_flats.router)
app.include_router(emergency_contacts.router)
app.include_router(contact_verifications.router)
app.include_router(emergency_alerts.router)
app.include_router(role_access.router)
app.include_router(dashboard.router)
app.include_router(sos.router)
app.include_router(volunteer.router)
app.include_router(escalation.router)
app.include_router(incident_assignment.router)