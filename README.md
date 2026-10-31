# 🚨 CEPi — Community Emergency Platform

> A full-stack community emergency management platform designed to improve emergency communication, incident coordination, and response management within residential communities.

## 📌 Project Overview

**CEPi (Community Emergency Platform)** is a full-stack application that helps residential communities manage emergency situations efficiently.

The platform connects residents, guardians, volunteers, security personnel, and administrators through a centralized emergency management system. It provides SOS dispatch, incident tracking, emergency contact management, role-based access, and an escalation workflow to help ensure emergencies receive timely attention.

The project consists of three major layers:

- 🌐 **Web Administration Portal**
- 📱 **Mobile Companion Application**
- ⚙️ **Backend API and Database**

---

## ✨ Key Features

### 🚨 SOS Dispatch

Residents can raise an SOS alert during an emergency. The system captures relevant emergency information, including the selected emergency category and available location details.

Supported emergency categories include:

- 🏥 Medical
- 🛡️ Security
- 🔥 Fire
- ⚠️ Fall
- 📌 Other

### 🔄 Incident Lifecycle Management

The platform supports an incident workflow that allows incidents to be:

- Created
- Accepted
- Assigned
- Escalated
- Monitored
- Resolved
- Closed

### 📢 Emergency Escalation Workflow

CEPi follows a multi-level emergency response approach:

```text
Resident raises SOS
        ↓
Guardian is notified
        ↓
Volunteer response
        ↓
Admin / Security escalation
        ↓
Incident resolution
```

This workflow is designed to ensure that emergency incidents receive attention from appropriate responders.

### 👥 Role-Based Access

Different users have different responsibilities and access levels.

Key roles include:

- **Resident** — Raises SOS alerts and manages emergency information.
- **Guardian** — Receives and responds to emergency alerts.
- **Volunteer** — Provides assistance during emergency situations.
- **Security** — Supports emergency response and incident handling.
- **Admin** — Manages the platform, users, community data, and incidents.

### 🏘️ Community Management

The web portal supports management of residential community information, including:

- Societies
- Blocks
- Flats
- Residents
- Resident-flat mapping

### 📞 Emergency Contact Management

Users can manage emergency contacts with information such as:

- Contact name
- Relationship
- Phone number
- Email address
- Priority
- Verification status

### 🔔 Notification System

The system is designed to support emergency notifications and incident updates to help responders stay informed about ongoing situations.

### 📊 Dashboard and Analytics

The administration portal provides a centralized dashboard for viewing community and emergency-related information, including:

- Total users
- Societies
- Blocks
- Flats
- Resident mappings
- Emergency contacts
- Emergency alerts
- Verified contacts

### 🌐 Multilingual Support

The web dashboard includes multilingual support to improve accessibility for users.

Supported languages include:

- English
- Hindi
- Telugu
- Urdu
- Tamil

### 📱 Mobile Companion Application

The mobile application provides emergency-focused features such as:

- SOS dispatch
- Guardian responder feed
- Notification center
- Incident history and search
- Mobile dashboard

---

# 🏗️ System Architecture

CEPi follows a full-stack architecture:

```text
                    ┌─────────────────────┐
                    │    React Web App    │
                    │ Administration Portal│
                    └──────────┬──────────┘
                               │
                               │ REST API
                               │
                    ┌──────────▼──────────┐
                    │   FastAPI Backend   │
                    │ Authentication      │
                    │ Incident Management │
                    │ Role-Based Access   │
                    └──────────┬──────────┘
                               │
                               │
                    ┌──────────▼──────────┐
                    │    PostgreSQL       │
                    │      Database       │
                    └─────────────────────┘

                    ┌─────────────────────┐
                    │ React Native / Expo │
                    │   Mobile Application │
                    └──────────┬──────────┘
                               │
                               └────── REST API ──────► Backend
```

---

# 🛠️ Technology Stack

## ⚙️ Backend

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy ORM
- Alembic
- JWT Authentication
- Uvicorn

## 🌐 Frontend

- React
- Vite
- React Router
- Axios
- Context API
- CSS

## 📱 Mobile

- React Native
- Expo
- Expo Router
- AsyncStorage
- Expo Notifications

---

# 🔐 Authentication and Security

CEPi implements authentication and access control features to protect the application.

Key security features include:

- User registration and login
- JWT-based authentication
- Password security
- Role-based access control
- Protected API access
- Input validation
- CORS configuration
- Environment-based secret management

---

# 🔄 CRUD Operations

The platform supports CRUD operations across multiple modules.

### Create

Users can create:

- Societies
- Blocks
- Flats
- Emergency contacts
- Incidents
- Community-related records

### Read

Users can view:

- Profile information
- Community data
- Emergency contacts
- Incidents
- Dashboard information

### Update

Authorized users can update:

- User profiles
- Community records
- Emergency contact information
- Incident details

### Delete

Authorized users can remove selected community and emergency-related records where applicable.

---

# 📁 Main Project Modules

```text
CEPi
│
├── 🌐 Frontend
│   ├── Dashboard
│   ├── Profile Management
│   ├── Society Management
│   ├── Block Management
│   ├── Flat Management
│   ├── Resident Mapping
│   ├── Emergency Contacts
│   ├── Contact Verification
│   ├── Alerts / SOS
│   ├── Incident Management
│   ├── Escalation Status
│   ├── Volunteer Response
│   └── Role & Access
│
├── ⚙️ Backend
│   ├── Authentication
│   ├── User Management
│   ├── Community Management
│   ├── Incident Management
│   ├── Emergency Services
│   └── API Endpoints
│
├── 🗄️ Database
│   ├── Users
│   ├── Societies
│   ├── Blocks
│   ├── Flats
│   ├── Emergency Contacts
│   ├── Incidents
│   └── Related Records
│
└── 📱 Mobile Application
    ├── SOS Dispatch
    ├── Guardian Response
    ├── Notifications
    └── Incident History
```

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

- Python
- Node.js
- PostgreSQL
- npm
- Expo Go (for mobile testing)

---

## ⚙️ Backend Setup

1. Navigate to the backend folder.

2. Create and activate a Python virtual environment.

3. Install the required dependencies.

```bash
pip install -r requirements.txt
```

4. Configure the database connection and environment variables.

5. Run database migrations if required.

6. Start the FastAPI server.

```bash
uvicorn main:app --reload
```

The API will then be available locally through the configured server address.

---

## 🌐 Frontend Setup

1. Navigate to the frontend folder.

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The web application will be available on the local development URL provided by Vite.

---

## 📱 Mobile Application Setup

1. Navigate to the mobile application folder.

2. Install dependencies:

```bash
npm install
```

3. Start the Expo application:

```bash
npx expo start
```

Scan the QR code using Expo Go or run the application on an emulator.

---

# 📊 Core Workflow

The main emergency workflow follows this sequence:

```text
1. Resident identifies an emergency
          ↓
2. Resident raises an SOS
          ↓
3. An incident is created
          ↓
4. Appropriate responders are notified
          ↓
5. Guardian / Volunteer responds
          ↓
6. Incident may be escalated when necessary
          ↓
7. Admin or Security monitors the situation
          ↓
8. Incident is resolved and closed
```

---

# 🧪 Quality Assurance

Important modules and workflows were tested during development, including:

- SOS dispatch
- Incident management
- Escalation workflow
- Volunteer response
- Incident history
- Society management
- Role-based access
- Authentication
- Dashboard functionality

---

# 🌍 Real-World Impact

CEPi addresses a real-world challenge in residential communities: **coordinating emergency responses quickly and efficiently**.

The platform aims to provide:

- Faster emergency communication
- Centralized incident tracking
- Better coordination between residents and responders
- Structured escalation workflows
- Improved community safety management

---

# 🔮 Future Enhancements

Future improvements may include:

- Real-time GPS tracking
- SMS integration
- Email notification integration
- Push notifications
- Automated background escalation timers
- AI-based emergency prioritization
- Emergency response analytics
- Multi-community scaling
- Production cloud deployment

---

# 👩‍💻 Project Learning Outcomes

Through the development of CEPi, the project provided practical experience in:

- Full-stack application development
- REST API development
- Database design and management
- Authentication and authorization
- Role-based access control
- React web development
- React Native mobile development
- FastAPI backend development
- PostgreSQL integration
- CRUD operations
- API integration
- Emergency workflow design

---

# 📸 Screenshots

Add screenshots of the following sections here:

- Web dashboard
- User profile
- Society management
- Emergency contacts
- SOS monitoring
- Incident management
- Escalation workflow
- Volunteer response
- Mobile SOS screen

---

# 🤝 Acknowledgements

This project was developed as part of a learning and internship experience focused on applying full-stack technologies to solve a real-world community emergency management problem.

Special thanks to the mentors, team members, and learning platforms that supported the development journey.

---

# 📌 Project Status

🟢 **Core System Completed**

The project includes a full-stack web application, backend API, database integration, role-based functionality, emergency management modules, and a mobile companion application.

---

## ⭐ CEPi

**Community Emergency Platform — Connecting communities for faster and more coordinated emergency response.**

> *Technology can help communities respond better when every second matters.*
