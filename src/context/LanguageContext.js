import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    language: "Language",
    english: "English",
    telugu: "Telugu",
    hindi: "Hindi",

    volunteerDashboard: "Volunteer Dashboard",
    volunteerAvailability: "Volunteer Availability",
    currentStatus: "Current Status",
    online: "ONLINE",
    offline: "OFFLINE",

    assignedIncident: "Assigned Incident",
    incidentId: "Incident ID",
    volunteerId: "Volunteer ID",
    role: "Role",
    status: "Status",
    assignedAt: "Assigned At",

    accept: "Accept",
    reject: "Reject",
    completeIncident: "Complete Incident",
    noIncident: "No Incident Assigned",

    sos: "SOS",
    emergency: "Emergency",
    sendSOS: "Send SOS",
    emergencyType: "Emergency Type",
    emergencyMessage: "Emergency Message",

    guardian: "Guardian",
    security: "Security",
    incidentDetails: "Incident Details",
    history: "History",
    notifications: "Notifications",
    profile: "Profile",
    settings: "Settings",

    success: "Success",
    error: "Error",
  },

  te: {
    language: "భాష",
    english: "ఇంగ్లీష్",
    telugu: "తెలుగు",
    hindi: "హిందీ",

    volunteerDashboard: "వాలంటీర్ డ్యాష్‌బోర్డ్",
    volunteerAvailability: "వాలంటీర్ అందుబాటు",
    currentStatus: "ప్రస్తుత స్థితి",
    online: "ఆన్‌లైన్",
    offline: "ఆఫ్‌లైన్",

    assignedIncident: "కేటాయించిన ఘటన",
    incidentId: "ఘటన ID",
    volunteerId: "వాలంటీర్ ID",
    role: "పాత్ర",
    status: "స్థితి",
    assignedAt: "కేటాయించిన సమయం",

    accept: "అంగీకరించు",
    reject: "తిరస్కరించు",
    completeIncident: "ఘటనను పూర్తి చేయండి",
    noIncident: "కేటాయించిన ఘటన లేదు",

    sos: "SOS",
    emergency: "అత్యవసర పరిస్థితి",
    sendSOS: "SOS పంపండి",
    emergencyType: "అత్యవసర రకం",
    emergencyMessage: "అత్యవసర సందేశం",

    guardian: "గార్డియన్",
    security: "భద్రత",
    incidentDetails: "ఘటన వివరాలు",
    history: "చరిత్ర",
    notifications: "నోటిఫికేషన్లు",
    profile: "ప్రొఫైల్",
    settings: "సెట్టింగ్స్",

    success: "విజయవంతం",
    error: "లోపం",
  },

  hi: {
    language: "भाषा",
    english: "अंग्रेज़ी",
    telugu: "तेलुगु",
    hindi: "हिंदी",

    volunteerDashboard: "स्वयंसेवक डैशबोर्ड",
    volunteerAvailability: "स्वयंसेवक उपलब्धता",
    currentStatus: "वर्तमान स्थिति",
    online: "ऑनलाइन",
    offline: "ऑफलाइन",

    assignedIncident: "सौंपा गया मामला",
    incidentId: "घटना ID",
    volunteerId: "स्वयंसेवक ID",
    role: "भूमिका",
    status: "स्थिति",
    assignedAt: "सौंपे जाने का समय",

    accept: "स्वीकार करें",
    reject: "अस्वीकार करें",
    completeIncident: "घटना पूर्ण करें",
    noIncident: "कोई घटना नहीं सौंपी गई",

    sos: "SOS",
    emergency: "आपातकाल",
    sendSOS: "SOS भेजें",
    emergencyType: "आपातकाल का प्रकार",
    emergencyMessage: "आपातकालीन संदेश",

    guardian: "अभिभावक",
    security: "सुरक्षा",
    incidentDetails: "घटना विवरण",
    history: "इतिहास",
    notifications: "सूचनाएं",
    profile: "प्रोफ़ाइल",
    settings: "सेटिंग्स",

    success: "सफल",
    error: "त्रुटि",
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}