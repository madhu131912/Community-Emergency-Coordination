const API_BASE_URL = "http://127.0.0.1:8000";

const token = localStorage.getItem("access_token");
const userEmail = localStorage.getItem("user_email");
const userId = localStorage.getItem("user_id");

if (!token || !userEmail || !userId) {
  window.location.href = "login.html";
}

/* =========================================================
   SIDEBAR BUTTONS
========================================================= */
const dashboardBtn = document.getElementById("dashboardBtn");
const profileBtn = document.getElementById("profileBtn");
const societiesBtn = document.getElementById("societiesBtn");
const blocksBtn = document.getElementById("blocksBtn");
const flatsBtn = document.getElementById("flatsBtn");
const residentMappingBtn = document.getElementById("residentMappingBtn");
const emergencyContactsBtn = document.getElementById("emergencyContactsBtn");
const contactVerificationBtn = document.getElementById("contactVerificationBtn");
const alertsBtn = document.getElementById("alertsBtn");
const roleAccessBtn = document.getElementById("roleAccessBtn");
const logoutBtn = document.getElementById("logoutBtn");

/* =========================================================
   PAGE SECTIONS
========================================================= */
const dashboardSection = document.getElementById("dashboardSection");
const profileSection = document.getElementById("profileSection");
const societiesSection = document.getElementById("societiesSection");
const blocksSection = document.getElementById("blocksSection");
const flatsSection = document.getElementById("flatsSection");
const residentMappingSection = document.getElementById("residentMappingSection");
const emergencyContactsSection = document.getElementById("emergencyContactsSection");
const contactVerificationSection = document.getElementById("contactVerificationSection");
const alertsSection = document.getElementById("alertsSection");
const roleAccessSection = document.getElementById("roleAccessSection");

const pageTitle = document.getElementById("pageTitle");

/* =========================================================
   DASHBOARD / SIDEBAR INFO
========================================================= */
const sidebarUserName = document.getElementById("sidebarUserName");
const sidebarUserEmail = document.getElementById("sidebarUserEmail");
const miniAvatar = document.getElementById("miniAvatar");

const cardUserEmail = document.getElementById("cardUserEmail");
const cardUserId = document.getElementById("cardUserId");
const dashboardUserEmail = document.getElementById("dashboardUserEmail");
const dashboardUserId = document.getElementById("dashboardUserId");

const heroWelcome = document.getElementById("heroWelcome");
const heroText = document.getElementById("heroText");

/* =========================================================
   PROFILE ELEMENTS
========================================================= */
const profileMessage = document.getElementById("profileMessage");
const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileCard = document.getElementById("editProfileCard");
const editProfileForm = document.getElementById("editProfileForm");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const editProfileMessage = document.getElementById("editProfileMessage");

/* =========================================================
   SOCIETY ELEMENTS
========================================================= */
const societyActions = document.getElementById("societyActions");
const showCreateSocietyBtn = document.getElementById("showCreateSocietyBtn");
const societyFormCard = document.getElementById("societyFormCard");
const societyForm = document.getElementById("societyForm");
const societyFormTitle = document.getElementById("societyFormTitle");
const cancelSocietyBtn = document.getElementById("cancelSocietyBtn");
const societyFormMessage = document.getElementById("societyFormMessage");
const societyAccessMessage = document.getElementById("societyAccessMessage");
const societyList = document.getElementById("societyList");

/* =========================================================
   BLOCK ELEMENTS
========================================================= */
const blockActions = document.getElementById("blockActions");
const showCreateBlockBtn = document.getElementById("showCreateBlockBtn");
const blockFormCard = document.getElementById("blockFormCard");
const blockForm = document.getElementById("blockForm");
const blockFormTitle = document.getElementById("blockFormTitle");
const cancelBlockBtn = document.getElementById("cancelBlockBtn");
const blockFormMessage = document.getElementById("blockFormMessage");
const blockAccessMessage = document.getElementById("blockAccessMessage");
const blockList = document.getElementById("blockList");

/* =========================================================
   FLAT ELEMENTS
========================================================= */
const flatActions = document.getElementById("flatActions");
const showCreateFlatBtn = document.getElementById("showCreateFlatBtn");
const flatFormCard = document.getElementById("flatFormCard");
const flatForm = document.getElementById("flatForm");
const flatFormTitle = document.getElementById("flatFormTitle");
const cancelFlatBtn = document.getElementById("cancelFlatBtn");
const flatFormMessage = document.getElementById("flatFormMessage");
const flatAccessMessage = document.getElementById("flatAccessMessage");
const flatList = document.getElementById("flatList");

/* =========================================================
   RESIDENT MAPPING ELEMENTS
========================================================= */
const residentMappingActions = document.getElementById("residentMappingActions");
const showCreateResidentMappingBtn = document.getElementById("showCreateResidentMappingBtn");
const residentMappingFormCard = document.getElementById("residentMappingFormCard");
const residentMappingForm = document.getElementById("residentMappingForm");
const cancelResidentMappingBtn = document.getElementById("cancelResidentMappingBtn");
const residentMappingFormMessage = document.getElementById("residentMappingFormMessage");
const residentMappingAccessMessage = document.getElementById("residentMappingAccessMessage");
const residentMappingList = document.getElementById("residentMappingList");

/* =========================================================
   EMERGENCY CONTACT ELEMENTS
========================================================= */
const emergencyContactActions = document.getElementById("emergencyContactActions");
const showCreateEmergencyContactBtn = document.getElementById("showCreateEmergencyContactBtn");
const emergencyContactFormCard = document.getElementById("emergencyContactFormCard");
const emergencyContactForm = document.getElementById("emergencyContactForm");
const cancelEmergencyContactBtn = document.getElementById("cancelEmergencyContactBtn");
const emergencyContactFormMessage = document.getElementById("emergencyContactFormMessage");
const emergencyContactAccessMessage = document.getElementById("emergencyContactAccessMessage");
const emergencyContactList = document.getElementById("emergencyContactList");

/* =========================================================
   CONTACT VERIFICATION ELEMENTS
========================================================= */
const generateOtpForm = document.getElementById("generateOtpForm");
const generateOtpContactId = document.getElementById("generateOtpContactId");
const generateOtpMessage = document.getElementById("generateOtpMessage");

const verifyOtpForm = document.getElementById("verifyOtpForm");
const verifyOtpContactId = document.getElementById("verifyOtpContactId");
const verifyOtpValue = document.getElementById("verifyOtpValue");
const verifyOtpMessage = document.getElementById("verifyOtpMessage");

/* =========================================================
   ALERTS ELEMENTS
========================================================= */
const alertForm = document.getElementById("alertForm");
const alertUserId = document.getElementById("alertUserId");
const alertType = document.getElementById("alertType");
const alertMessage = document.getElementById("alertMessage");
const alertFormMessage = document.getElementById("alertFormMessage");
const alertsList = document.getElementById("alertsList");
const refreshAlertsBtn = document.getElementById("refreshAlertsBtn");

/* =========================================================
   ROLE ACCESS ELEMENTS
========================================================= */
const roleAssignForm = document.getElementById("roleAssignForm");
const roleUserId = document.getElementById("roleUserId");
const roleIdInput = document.getElementById("roleIdInput");
const roleAssignMessage = document.getElementById("roleAssignMessage");
const roleAccessList = document.getElementById("roleAccessList");
const refreshRolesBtn = document.getElementById("refreshRolesBtn");




const totalUsersCard = document.getElementById("totalUsersCard");
const totalSocietiesCard = document.getElementById("totalSocietiesCard");
const totalBlocksCard = document.getElementById("totalBlocksCard");
const totalFlatsCard = document.getElementById("totalFlatsCard");
const totalResidentMappingsCard = document.getElementById("totalResidentMappingsCard");
const totalEmergencyContactsCard = document.getElementById("totalEmergencyContactsCard");
const totalEmergencyAlertsCard = document.getElementById("totalEmergencyAlertsCard");
const verifiedContactsCard = document.getElementById("verifiedContactsCard");


// =========================================================
// MILESTONE 3 - WEB MODULES
// =========================================================

const incidentBtn = document.getElementById("incidentBtn");
const escalationBtn = document.getElementById("escalationBtn");
const volunteerBtn = document.getElementById("volunteerBtn");

const incidentSection = document.getElementById("incidentSection");
const escalationSection = document.getElementById("escalationSection");
const volunteerSection = document.getElementById("volunteerSection");

// =========================================================
// SOS MODULE
// =========================================================

const sosBtn = document.getElementById("sosBtn");
const sosSection = document.getElementById("sosSection");

const sosForm = document.getElementById("sosForm");
const sosResidentId = document.getElementById("sosResidentId");
const sosEmergencyType = document.getElementById("sosEmergencyType");
const sosMessage = document.getElementById("sosMessage");

const sosList = document.getElementById("sosList");
const refreshSOSBtn = document.getElementById("refreshSOSBtn");
const sosMessageBox = document.getElementById("sosMessageBox");

/* =========================================================
   STATE
========================================================= */
let currentUserRole = null;


const languageSelect = document.getElementById("languageSelect");

let activeLanguage = "en";

function getTranslation(key, fallback = "") {
  const selectedTranslations = translations[activeLanguage] || {};
  return selectedTranslations[key] || translations.en[key] || fallback;
}

const translations = {

  en: {
    dashboard: "Dashboard",
    profile: "Profile",
    societies: "Societies",
    blocks: "Blocks",
    flats: "Flats",
    residentMapping: "Resident Mapping",
    emergencyContacts: "Emergency Contacts",
    contactVerification: "Contact Verification",
    alerts: "Alerts / SOS",
    roleAccess: "Role & Access",
    sosMonitoring: "🚨 SOS Monitoring",
    incident: "🚑 Incident Management",
    escalation: "📢 Escalation Status",
    volunteer: "🟢 Volunteer Response",
    logout: "Logout",
    languageLabel: "Language",
    sidebarFooterText: "Safe community management",
    sidebarTitle: "CEPi",
    sidebarSubtitle: "Community Emergency Platform",
    societiesTitle: "Total Societies",
    blocksTitle: "Total Blocks",
    flatsTitle: "Total Flats",
    loggedInUserLabel: "Logged-in User",
    residentMappingsTitle: "Resident Mappings",
    emergencyContactsTitle: "Emergency Contacts",
    emergencyAlertsTitle: "Emergency Alerts",
    verifiedContactsTitle: "Verified Contacts",
    communityAccessLabel: "Community Access",
    pageTitle: "Dashboard",
    pageSubtitle: "Welcome to your community emergency dashboard",
    communityAccessValue:
      "View your role-based profile, societies, blocks, flats and emergency-related modules from one place.",
    modulesProgressLabel: "Modules in Progress",
    modulesProgressValue:
      "Resident-flat mapping, emergency contacts, OTP verification, alerts and role-based permissions.",
    editProfile: "Edit Profile",
    firstNameLabel: "First Name",
    lastNameLabel: "Last Name",
    emailLabel: "Email",
    phoneLabel: "Phone",
    roleLabel: "Role",
    societyLabel: "Society",
    blockLabel: "Block",
    flatLabel: "Flat",
    employeeIdLabel: "Employee ID",
    shiftDetailsLabel: "Shift Details",
    editProfileHeading: "Edit Profile",
    editFirstNameLabel: "First Name",
    editLastNameLabel: "Last Name",
    editPhoneLabel: "Phone",
    saveChangesBtn: "Save Changes",
    cancelBtn: "Cancel",
    societyManagementTitle: "Society Management",
    societyNameLabel: "Society Name",
    societyAddressLabel: "Address",
    societyCityLabel: "City",
    societyStateLabel: "State",
    societyPincodeLabel: "Pincode",
    societyStatusLabel: "Status",
    saveSocietyBtn: "Save Society",
    blockManagementTitle: "Block Management",
    blockNameLabel: "Block Name",
    blockSocietyIdLabel: "Society ID",
    saveBlockBtn: "Save Block",
    flatManagementTitle: "Flat Management",
    flatNumberLabel: "Flat Number",
    flatFloorNumberLabel: "Floor Number",
    flatBlockIdLabel: "Block ID",
    saveFlatBtn: "Save Flat",
    residentMappingTitle: "Resident to Flat Mapping",
    residentMappingFormTitle: "Create Resident Mapping",
    residentMappingSaveBtn: "Save Mapping",
    emergencyContactsSectionTitle: "Emergency Contacts",
    emergencyContactFormTitle: "Add Emergency Contact",
    contactResidentUserIdLabel: "Resident User ID",
    contactNameLabel: "Contact Name",
    contactRelationshipLabel: "Relationship",
    contactPhoneLabel: "Phone",
    contactEmailLabel: "Email",
    contactPriorityLabel: "Priority Order",
    saveContactBtn: "Save Contact",
    otpVerifyTitle: "Verify Contact OTP",
    otpValueLabel: "Enter OTP",
    verifyOtpBtn: "Verify OTP",
    contactVerificationTitle: "Contact Verification (Mock OTP)",
    contactVerificationSubtitle: "Generate OTP for an emergency contact and verify it to mark the contact as verified.",
    generateOtpTitle: "Generate OTP",
    generateOtpContactIdLabel: "Emergency Contact ID",
    generateOtpBtn: "Generate OTP",
    verifyOtpTitle: "Verify OTP",
    verifyOtpContactIdLabel: "Emergency Contact ID",
    verifyOtpValueLabel: "OTP",
    alertsSectionTitle: "Alerts / SOS",
    alertsSectionSubtitle: "Raise emergency alerts and view all alert records.",
    createAlertTitle: "Create Emergency Alert",
    alertUserIdLabel: "User ID",
    alertTypeLabel: "Alert Type",
    alertMessageLabel: "Message",
    createAlertBtn: "Create Alert",
    refreshAlertsBtnText: "Refresh Alerts",
    emergencyAlertsSectionTitle: "Emergency Alerts",
    roleAccessSectionTitle: "Role & Access",
    roleAccessSectionSubtitle: "View users with roles and assign/update user roles.",
    assignRoleTitle: "Assign / Update Role",
    roleUserIdLabel: "User ID",
    roleIdInputLabel: "Role ID",
    assignRoleBtn: "Assign Role",
    refreshRolesBtnText: "Refresh",
    roleReferenceTitle: "Role ID Reference",
    roleListTitle: "Users & Assigned Roles",
    sosSectionTitle: "SOS Alert System",
    sosSectionSubtitle: "Raise emergency SOS and monitor alerts.",
    createSosTitle: "Create SOS Alert",
    sosResidentIdLabel: "Resident ID",
    sosEmergencyTypeLabel: "Emergency Type",
    sosMessageLabel: "Additional Information",
    peopleCountLabel: "People Involved",
    needAmbulanceLabel: "Need Ambulance?",
    sendSosBtn: "🚨 SEND SOS",
    allSosAlertsTitle: "All SOS Alerts",
    refreshSosBtnText: "Refresh",
    incidentManagementTitle: "Incident Management",
    incidentManagementSubtitle: "Monitor and manage the complete emergency lifecycle.",
    refreshIncidentsBtnText: "Refresh",
    incidentDetailsTitle: "Incident Details",
    incidentDetailsPlaceholder: "Select an incident to view details.",
    assistanceStartedBtn: "Assistance Started",
    resolveIncidentBtnText: "Resolve",
    closeIncidentBtnText: "Close Incident",
    incidentTimelineTitle: "Incident Timeline",
    incidentTimelinePlaceholder: "No timeline available.",
    escalationSectionTitle: "Guardian Escalation Status",
    escalationSectionSubtitle: "Monitor automatic escalation from Guardian/Security to Volunteers and Emergency Contacts.",
    escalationIncidentIdLabel: "Incident ID",
    checkEscalationBtnText: "Check Status",
    startEscalationBtnText: "Start Escalation",
    nextEscalationBtnText: "Next Level",
    currentEscalationTitle: "Current Escalation",
    noEscalationSelectedText: "No escalation selected.",
    escalationLogsTitle: "Escalation Logs",
    noEscalationLogsText: "No escalation logs.",
    volunteerAvailabilityTitle: "Volunteer Availability",
    volunteerAvailabilitySubtitle: "Set volunteer availability for emergency requests.",
    volunteerIdLabel: "Volunteer ID",
    volunteerOnlineBtnText: "🟢 ONLINE",
    volunteerOfflineBtnText: "⚫ OFFLINE",
    emergencyRequestTitle: "Emergency Request",
    incidentIdLabel: "Incident ID",
    loadAssignmentBtnText: "Load Assignment",
    autoAssignBtnText: "Auto Assign",
    volunteerAssignmentPlaceholder: "No assigned incident loaded.",
    acceptIncidentBtnText: "ACCEPT REQUEST",
    rejectIncidentBtnText: "DECLINE"
  },

  hi: {
    dashboard: "डैशबोर्ड",
    profile: "प्रोफ़ाइल",
    societies: "सोसाइटी",
    blocks: "ब्लॉक",
    flats: "फ्लैट",
    residentMapping: "रेज़िडेंट मैपिंग",
    emergencyContacts: "आपातकालीन संपर्क",
    contactVerification: "संपर्क सत्यापन",
    alerts: "अलर्ट / एसओएस",
    roleAccess: "भूमिका एवं अनुमति",
    sosMonitoring: "🚨 एसओएस मॉनिटरिंग",
    incident: "🚑 घटना प्रबंधन",
    escalation: "📢 एस्केलेशन स्थिति",
    volunteer: "🟢 स्वयंसेवक प्रतिक्रिया",
    loggedInUserLabel: "लॉग-इन उपयोगकर्ता",
    logout: "लॉगआउट",
    languageLabel: "भाषा",
    sidebarFooterText: "सुरक्षित सामुदायिक प्रबंधन",
    sidebarTitle: "सीईपीआई",
    sidebarSubtitle: "सामुदायिक आपातकालीन प्लेटफ़ॉर्म",
    pageTitle: "डैशबोर्ड",
    pageSubtitle: "अपने सामुदायिक आपातकालीन डैशबोर्ड में आपका स्वागत है",
    communityAccessLabel: "समुदाय पहुँच",
    societiesTitle: "कुल सोसायटी",
    blocksTitle: "कुल ब्लॉक",
    flatsTitle: "कुल फ्लैट",
    residentMappingsTitle: "रेज़िडेंट मैपिंग",
    emergencyContactsTitle: "आपातकालीन संपर्क",
    emergencyAlertsTitle: "आपातकालीन अलर्ट",
    verifiedContactsTitle: "सत्यापित संपर्क",
    communityAccessValue:
      "अपनी भूमिका आधारित प्रोफ़ाइल, सोसायटी, ब्लॉक, फ्लैट और आपातकालीन मॉड्यूल एक ही स्थान पर देखें।",
    modulesProgressLabel: "प्रगति में मॉड्यूल",
    modulesProgressValue: "रेज़िडेंट मैपिंग, आपातकालीन संपर्क, ओटीपी सत्यापन, अलर्ट और भूमिका आधारित अनुमतियाँ।",
    profileDetailsHeading: "प्रोफ़ाइल विवरण",
    editProfile: "प्रोफ़ाइल संपादित करें",

    firstNameLabel: "पहला नाम",
    lastNameLabel: "अंतिम नाम",
    emailLabel: "ईमेल",
    phoneLabel: "फ़ोन",
    roleLabel: "भूमिका",
    societyLabel: "सोसायटी",
    blockLabel: "ब्लॉक",
    flatLabel: "फ्लैट",
    employeeIdLabel: "कर्मचारी आईडी",
    shiftDetailsLabel: "शिफ्ट विवरण",

    editProfileHeading: "प्रोफ़ाइल संपादित करें",

    editFirstNameLabel: "पहला नाम",
    editLastNameLabel: "अंतिम नाम",
    editPhoneLabel: "फ़ोन",

    saveChangesBtn: "परिवर्तन सहेजें",
    cancelBtn: "रद्द करें",
    welcomeBack: "वापस स्वागत है",
    loggedInAs: "आप लॉग इन हैं",
    accessDashboardText: "अपने डैशबोर्ड और मॉड्यूल तक बाईं मेनू से पहुँचें।",
    userIdLabel: "उपयोगकर्ता आईडी",
    emailLabel: "ईमेल",
    loadingProfileMessage: "प्रोफ़ाइल लोड हो रही है...",
    failedToLoadProfile: "प्रोफ़ाइल लोड करने में विफल।",
    profileLoadedSuccessfully: "प्रोफ़ाइल सफलतापूर्वक लोड हुई।",
    serverErrorLoadingProfile: "प्रोफ़ाइल लोड करते समय सर्वर त्रुटि।",
    savingChanges: "परिवर्तन सहेजे जा रहे हैं...",
    failedToUpdateProfile: "प्रोफ़ाइल अपडेट करने में विफल।",
    profileUpdatedSuccessfully: "प्रोफ़ाइल सफलतापूर्वक अपडेट हुई।",
    serverErrorUpdatingProfile: "प्रोफ़ाइल अपडेट करते समय सर्वर त्रुटि।",
    createSociety: "सोसायटी बनाएं",
    editSociety: "सोसायटी संपादित करें",
    createBlock: "ब्लॉक बनाएं",
    editBlock: "ब्लॉक संपादित करें",
    createFlat: "फ्लैट बनाएं",
    editFlat: "फ्लैट संपादित करें"
  },

  te: {
    dashboard: "డాష్‌బోర్డ్",
    profile: "ప్రొఫైల్",
    societies: "సొసైటీలు",
    blocks: "బ్లాక్స్",
    flats: "ఫ్లాట్లు",
    residentMapping: "రెసిడెంట్ మ్యాపింగ్",
    emergencyContacts: "అత్యవసర సంప్రదింపులు",
    contactVerification: "సంప్రదింపు ధృవీకరణ",
    alerts: "అలర్ట్స్ / SOS",
    roleAccess: "పాత్రలు & అనుమతులు",
    sosMonitoring: "🚨 SOS పర్యవేక్షణ",
    loggedInUserLabel: "లాగిన్ అయిన వినియోగదారు",
    incident: "🚑 ఘటన నిర్వహణ",
    escalation: "📢 ఎస్కలేషన్ స్థితి",
    volunteer: "🟢 వాలంటీర్ స్పందన",
    logout: "లాగ్ అవుట్",
    languageLabel: "భాష",
    sidebarFooterText: "సురక్షిత కమ్యూనిటీ మేనేజ్మెంట్",
    sidebarTitle: "CEPi",
    sidebarSubtitle: "కమ్యూనిటీ ఎమర్జెన్సీ ప్లాట్ఫాం",
    societiesTitle: "మొత్తం సొసైటీలు",
    blocksTitle: "మొత్తం బ్లాక్స్",
    flatsTitle: "మొత్తం ఫ్లాట్లు",
    profileDetailsHeading: "ప్రొఫైల్ వివరాలు",
    editProfile: "ప్రొఫైల్ సవరించండి",

    firstNameLabel: "మొదటి పేరు",
    lastNameLabel: "చివరి పేరు",
    emailLabel: "ఇమెయిల్",
    phoneLabel: "ఫోన్",
    roleLabel: "పాత్ర",
    societyLabel: "సొసైటీ",
    blockLabel: "బ్లాక్",
    flatLabel: "ఫ్లాట్",
    employeeIdLabel: "ఉద్యోగి ఐడి",
    shiftDetailsLabel: "షిఫ్ట్ వివరాలు",

    editProfileHeading: "ప్రొఫైల్ సవరించండి",

    editFirstNameLabel: "మొదటి పేరు",
    editLastNameLabel: "చివరి పేరు",
    editPhoneLabel: "ఫోన్",

    saveChangesBtn: "మార్పులు సేవ్ చేయండి",
    cancelBtn: "రద్దు",
    welcomeBack: "మళ్లీ స్వాగతం",
    loggedInAs: "మీరు లాగిన్ అయ్యి ఉన్నారు",
    accessDashboardText: "డాష్‌బోర్డ్ మరియు మాడ్యూల్స్‌కి ఎడమ మెనూ నుండి యాక్సెస్ చేయండి.",
    userIdLabel: "వినియోగదారు ఐడి",
    loadingProfileMessage: "ప్రొఫైల్ లోడ్ అవుతోంది...",
    failedToLoadProfile: "ప్రొఫైల్ లోడ్ చేయడంలో విఫలం.",
    profileLoadedSuccessfully: "ప్రొఫైల్ విజయవంతంగా లోడ్ అయింది.",
    serverErrorLoadingProfile: "ప్రొఫైల్ లోడ్ చేస్తున్నప్పుడు సర్వర్ లోపం.",
    savingChanges: "మార్పులు సేవ్ అవుతున్నాయి...",
    failedToUpdateProfile: "ప్రొఫైల్ నవీకరించడంలో విఫలం.",
    profileUpdatedSuccessfully: "ప్రొఫైల్ విజయవంతంగా నవీకరించబడింది.",
    serverErrorUpdatingProfile: "ప్రొఫైల్ నవీకరిస్తున్నప్పుడు సర్వర్ లోపం.",
    residentMappingsTitle: "రెసిడెంట్ మ్యాపింగ్స్",
    emergencyContactsTitle: "అత్యవసర సంప్రదింపులు",
    emergencyAlertsTitle: "అత్యవసర అలర్ట్స్",
    verifiedContactsTitle: "ధృవీకరించిన సంప్రదింపులు",
        communityAccessLabel: "కమ్యూనిటీ యాక్సెస్",
      pageTitle: "డాష్‌బోర్డ్",
  pageSubtitle: "మీ కమ్యూనిటీ అత్యవసర డాష్‌బోర్డ్‌కు స్వాగతం",

    communityAccessValue:
      "మీ పాత్ర ఆధారిత ప్రొఫైల్, సొసైటీలు, బ్లాక్స్, ఫ్లాట్లు మరియు అత్యవసర మాడ్యూల్‌లను ఒకే చోట చూడండి.",

    modulesProgressLabel: "పురోగతిలో ఉన్న మాడ్యూల్స్",

    modulesProgressValue:
      "రెసిడెంట్ మ్యాపింగ్, అత్యవసర సంప్రదింపులు, OTP ధృవీకరణ, అలర్ట్స్ మరియు పాత్ర ఆధారిత అనుమతులు."
  },

  ur: {
    dashboard: "ڈیش بورڈ",
    profile: "پروفائل",
    societies: "سوسائٹیز",
    blocks: "بلاکس",
    flats: "فلیٹس",
    residentMapping: "ریذیڈنٹ میپنگ",
    emergencyContacts: "ہنگامی رابطے",
    contactVerification: "رابطہ تصدیق",
    alerts: "الرٹس / SOS",
    roleAccess: "کردار اور رسائی",
    sosMonitoring: "🚨 ایس او ایس نگرانی",
    incident: "🚑 واقعہ مینجمنٹ",
    escalation: "📢 ایسکلیشن",
    volunteer: "🟢 رضاکار",
    loggedInUserLabel: "لاگ اِن صارف",
    languageLabel: "زبان",
    sidebarFooterText: "محفوظ کمیونٹی مینجمنٹ",
    sidebarTitle: "CEPi",
    sidebarSubtitle: "کمیونٹی ایمرجنسی پلےٹ فارم",
    profileDetailsHeading: "پروفائل کی تفصیلات",
    editProfile: "پروفائل میں ترمیم",

    firstNameLabel: "پہلا نام",
    lastNameLabel: "آخری نام",
    emailLabel: "ای میل",
    phoneLabel: "فون",
    roleLabel: "کردار",
    societyLabel: "سوسائٹی",
    blockLabel: "بلاک",
    flatLabel: "فلیٹ",
    employeeIdLabel: "ملازم آئی ڈی",
    shiftDetailsLabel: "شفٹ کی تفصیلات",

    editProfileHeading: "پروفائل میں ترمیم",

    editFirstNameLabel: "پہلا نام",
    editLastNameLabel: "آخری نام",
    editPhoneLabel: "فون",

    saveChangesBtn: "تبدیلیاں محفوظ کریں",
    cancelBtn: "منسوخ کریں",
    logout: "لاگ آؤٹ",
    welcomeBack: "خوش آمدید",
    loggedInAs: "آپ لاگ ان ہیں",
    accessDashboardText: "اپنے ڈیش بورڈ اور ماڈیولز تک بائیں مینو سے رسائی حاصل کریں۔",
    userIdLabel: "صارف آئی ڈی",
    loadingProfileMessage: "پروفائل لوڈ ہو رہی ہے...",
    failedToLoadProfile: "پروفائل لوڈ کرنے میں ناکامی۔",
    profileLoadedSuccessfully: "پروفائل کامیابی سے لوڈ ہو گئی۔",
    serverErrorLoadingProfile: "پروفائل لوڈ کرتے وقت سرور کی خرابی۔",
    savingChanges: "تبدیلیاں محفوظ کی جا رہی ہیں...",
    failedToUpdateProfile: "پروفائل کو اپ ڈیٹ کرنے میں ناکامی۔",
    profileUpdatedSuccessfully: "پروفائل کامیابی سے اپ ڈیٹ ہو گئی۔",
    serverErrorUpdatingProfile: "پروفائل اپ ڈیٹ کرتے وقت سرور کی خرابی۔",
    societiesTitle: "کل سوسائٹیز",
    blocksTitle: "کل بلاکس",
    flatsTitle: "کل فلیٹس",
    residentMappingsTitle: "ریذیڈنٹ میپنگ",
    emergencyContactsTitle: "ہنگامی رابطے",
    emergencyAlertsTitle: "ہنگامی الرٹس",
    verifiedContactsTitle: "تصدیق شدہ رابطے",
        communityAccessLabel: "کمیونٹی رسائی",
     pageTitle: "ڈیش بورڈ",
  pageSubtitle: "آپ کے کمیونٹی ایمرجنسی ڈیش بورڈ میں خوش آمدید",

    communityAccessValue:
      "اپنی کردار پر مبنی پروفائل، سوسائٹیز، بلاکس، فلیٹس اور ہنگامی ماڈیولز ایک ہی جگہ دیکھیں۔",

    modulesProgressLabel: "زیرِ تکمیل ماڈیولز",

    modulesProgressValue:
      "ریذیڈنٹ میپنگ، ہنگامی رابطے، او ٹی پی تصدیق، الرٹس اور کردار پر مبنی اجازتیں۔"
  },

  ta: {
    dashboard: "டாஷ்போர்டு",
    profile: "சுயவிவரம்",
    societies: "சமூகங்கள்",
    blocks: "பிளாக்குகள்",
    flats: "அபார்ட்மெண்ட்கள்",
    residentMapping: "குடியிருப்பாளர் இணைப்பு",
    emergencyContacts: "அவசர தொடர்புகள்",
    contactVerification: "தொடர்பு சரிபார்ப்பு",
    alerts: "எச்சரிக்கைகள் / SOS",
    roleAccess: "பங்கு & அணுகல்",
    sosMonitoring: "🚨 SOS கண்காணிப்பு",
    loggedInUserLabel: "உள்நுழைந்த பயனர்",
    languageLabel: "மொழி",
    sidebarFooterText: "பாதுகாப்பான சமூகவியல் மேலாண்மை",
    sidebarTitle: "CEPi",
    sidebarSubtitle: "சமூக அவசரநிலை தளம்",
    incident: "🚑 சம்பவ மேலாண்மை",
    escalation: "📢 உயர்த்தல் நிலை",
    volunteer: "🟢 தன்னார்வலர்",
    profileDetailsHeading: "சுயவிவர விவரங்கள்",
    editProfile: "சுயவிவரத்தை திருத்து",

    firstNameLabel: "முதல் பெயர்",
    lastNameLabel: "கடைசி பெயர்",
    emailLabel: "மின்னஞ்சல்",
    phoneLabel: "தொலைபேசி",
    roleLabel: "பங்கு",
    societyLabel: "சமூகம்",
    blockLabel: "பிளாக்",
    flatLabel: "குடியிருப்பு",
    employeeIdLabel: "பணியாளர் ஐடி",
    shiftDetailsLabel: "ஷிப்ட் விவரங்கள்",

    editProfileHeading: "சுயவிவரத்தை திருத்து",

    editFirstNameLabel: "முதல் பெயர்",
    editLastNameLabel: "கடைசி பெயர்",
    editPhoneLabel: "தொலைபேசி",

    saveChangesBtn: "மாற்றங்களை சேமி",
    cancelBtn: "ரத்து செய்",
    logout: "வெளியேறு",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    loggedInAs: "நீங்கள் உள்நுழைந்துள்ளீர்கள்",
    accessDashboardText: "உங்கள் டாஷ்போர்டு மற்றும் தொகுதிகளை இடது மெனுவிலிருந்து அணுகவும்.",
    userIdLabel: "பயனர் ஐடி",
    loadingProfileMessage: "சுயவிவரம் ஏற்றப்படுகிறது...",
    failedToLoadProfile: "சுயவிவரத்தை ஏற்ற முடியவில்லை.",
    profileLoadedSuccessfully: "சுயவிவரம் வெற்றிகரமாக ஏற்றப்பட்டது.",
    serverErrorLoadingProfile: "சுயவிவரம் ஏற்றும் போது சேவையக பிழை.",
    savingChanges: "மாற்றங்கள் சேமிக்கப்படுகின்றன...",
    failedToUpdateProfile: "சுயவிவரத்தை புதுப்பிக்க முடியவில்லை.",
    profileUpdatedSuccessfully: "சுயவிவரம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது.",
    serverErrorUpdatingProfile: "சுயவிவரம் புதுப்பிக்கும் போது சேவையக பிழை.",
    societiesTitle: "மொத்த சமூகங்கள்",
      blocksTitle: "மொத்த பிளாக்குகள்",
      flatsTitle: "மொத்த குடியிருப்புகள்",
      residentMappingsTitle: "குடியிருப்பாளர் இணைப்புகள்",
      emergencyContactsTitle: "அவசர தொடர்புகள்",
      emergencyAlertsTitle: "அவசர எச்சரிக்கைகள்",
      verifiedContactsTitle: "சரிபார்க்கப்பட்ட தொடர்புகள்",
    communityAccessLabel: "சமூக அணுகல்",
     pageTitle: "டாஷ்போர்டு",
  pageSubtitle: "உங்கள் சமூக அவசரநிலை டாஷ்போர்டுக்கு வரவேற்கிறோம்",

    communityAccessValue:
      "உங்கள் பங்கு அடிப்படையிலான சுயவிவரம், சமூகங்கள், பிளாக்குகள், குடியிருப்புகள் மற்றும் அவசர தொகுதிகளை ஒரே இடத்தில் காணலாம்.",

    modulesProgressLabel: "நடைபெற்று வரும் தொகுதிகள்",

    modulesProgressValue:
      "குடியிருப்பாளர் இணைப்பு, அவசர தொடர்புகள், OTP சரிபார்ப்பு, எச்சரிக்கைகள் மற்றும் பங்கு அடிப்படையிலான அனுமதிகள்."
  }

};
function changeLanguage(lang) {

    activeLanguage = lang;
    const selectedTranslations = translations[lang] || translations.en;
    const t = { ...translations.en, ...selectedTranslations };

    // =========================
    // Sidebar
    // =========================

    if (dashboardBtn) dashboardBtn.textContent = t.dashboard;
    if (profileBtn) profileBtn.textContent = t.profile;
    if (societiesBtn) societiesBtn.textContent = t.societies;
    if (blocksBtn) blocksBtn.textContent = t.blocks;
    if (flatsBtn) flatsBtn.textContent = t.flats;
    if (residentMappingBtn) residentMappingBtn.textContent = t.residentMapping;
    if (emergencyContactsBtn) emergencyContactsBtn.textContent = t.emergencyContacts;
    if (contactVerificationBtn) contactVerificationBtn.textContent = t.contactVerification;
    if (alertsBtn) alertsBtn.textContent = t.alerts;
    if (roleAccessBtn) roleAccessBtn.textContent = t.roleAccess;
    if (sosBtn) sosBtn.textContent = t.sosMonitoring;
    if (incidentBtn) incidentBtn.textContent = t.incident;
    if (escalationBtn) escalationBtn.textContent = t.escalation;
    if (volunteerBtn) volunteerBtn.textContent = t.volunteer;
    if (logoutBtn) logoutBtn.textContent = t.logout;
    if (document.getElementById("sidebarTitle")) document.getElementById("sidebarTitle").textContent = t.sidebarTitle;
    if (document.getElementById("sidebarSubtitle")) document.getElementById("sidebarSubtitle").textContent = t.sidebarSubtitle;
    if (document.getElementById("languageLabel")) document.getElementById("languageLabel").textContent = t.languageLabel;
    if (document.getElementById("sidebarFooterText")) document.getElementById("sidebarFooterText").textContent = t.sidebarFooterText;

    // =========================
    // Dashboard Header
    // =========================

    const pageTitle = document.getElementById("pageTitle");
    if (pageTitle) pageTitle.textContent = t.pageTitle;

    const pageSubtitle = document.getElementById("pageSubtitle");
    if (pageSubtitle) pageSubtitle.textContent = t.pageSubtitle;

    // =========================
    // Dashboard Summary
    // =========================

    const loggedInUserLabel = document.getElementById("loggedInUserLabel");
    if (loggedInUserLabel) loggedInUserLabel.textContent = t.loggedInUserLabel;

    const communityAccessLabel = document.getElementById("communityAccessLabel");
    if (communityAccessLabel)
        communityAccessLabel.textContent = t.communityAccessLabel;

    const communityAccessValue = document.getElementById("communityAccessValue");
    if (communityAccessValue)
        communityAccessValue.textContent = t.communityAccessValue;

    const modulesProgressLabel = document.getElementById("modulesProgressLabel");
    if (modulesProgressLabel)
        modulesProgressLabel.textContent = t.modulesProgressLabel;

    const modulesProgressValue = document.getElementById("modulesProgressValue");
    if (modulesProgressValue)
        modulesProgressValue.textContent = t.modulesProgressValue;

    // =========================
    // Dashboard Cards
    // =========================

    const societiesTitle = document.getElementById("societiesTitle");
    if (societiesTitle) societiesTitle.textContent = t.societiesTitle;

    const totalSocietiesTitle = document.getElementById("totalSocietiesTitle");
    if (totalSocietiesTitle) totalSocietiesTitle.textContent = t.societiesTitle;

    const blocksTitle = document.getElementById("blocksTitle");
    if (blocksTitle) blocksTitle.textContent = t.blocksTitle;

    const totalBlocksTitle = document.getElementById("totalBlocksTitle");
    if (totalBlocksTitle) totalBlocksTitle.textContent = t.blocksTitle;

    const flatsTitle = document.getElementById("flatsTitle");
    if (flatsTitle) flatsTitle.textContent = t.flatsTitle;

    const totalFlatsTitle = document.getElementById("totalFlatsTitle");
    if (totalFlatsTitle) totalFlatsTitle.textContent = t.flatsTitle;

    const residentMappingsTitle = document.getElementById("residentMappingsTitle");
    if (residentMappingsTitle)
        residentMappingsTitle.textContent = t.residentMappingsTitle;

    const emergencyContactsTitle = document.getElementById("emergencyContactsTitle");
    if (emergencyContactsTitle)
        emergencyContactsTitle.textContent = t.emergencyContactsTitle;

    const emergencyAlertsTitle = document.getElementById("emergencyAlertsTitle");
    if (emergencyAlertsTitle)
        emergencyAlertsTitle.textContent = t.emergencyAlertsTitle;

    const verifiedContactsTitle = document.getElementById("verifiedContactsTitle");
    if (verifiedContactsTitle)
        verifiedContactsTitle.textContent = t.verifiedContactsTitle;

    // =========================
    // Profile Section
    // =========================

    const profileDetailsHeading = document.getElementById("profileDetailsHeading");
    if (profileDetailsHeading)
        profileDetailsHeading.textContent = t.profileDetailsHeading;

    const editProfileBtn = document.getElementById("editProfileBtn");
    if (editProfileBtn)
        editProfileBtn.textContent = t.editProfile;

    const firstNameLabel = document.getElementById("firstNameLabel");
    if (firstNameLabel)
        firstNameLabel.textContent = t.firstNameLabel;

    const lastNameLabel = document.getElementById("lastNameLabel");
    if (lastNameLabel)
        lastNameLabel.textContent = t.lastNameLabel;

    const emailLabel = document.getElementById("emailLabel");
    if (emailLabel)
        emailLabel.textContent = t.emailLabel;

    const phoneLabel = document.getElementById("phoneLabel");
    if (phoneLabel)
        phoneLabel.textContent = t.phoneLabel;

    const roleLabel = document.getElementById("roleLabel");
    if (roleLabel)
        roleLabel.textContent = t.roleLabel;

    const societyLabel = document.getElementById("societyLabel");
    if (societyLabel)
        societyLabel.textContent = t.societyLabel;

    const blockLabel = document.getElementById("blockLabel");
    if (blockLabel)
        blockLabel.textContent = t.blockLabel;

    const flatLabel = document.getElementById("flatLabel");
    if (flatLabel)
        flatLabel.textContent = t.flatLabel;

    const employeeIdLabel = document.getElementById("employeeIdLabel");
    if (employeeIdLabel)
        employeeIdLabel.textContent = t.employeeIdLabel;

    const shiftDetailsLabel = document.getElementById("shiftDetailsLabel");
    if (shiftDetailsLabel)
        shiftDetailsLabel.textContent = t.shiftDetailsLabel;

    // =========================
    // Edit Profile
    // =========================

    const editProfileHeading = document.getElementById("editProfileHeading");
    if (editProfileHeading)
        editProfileHeading.textContent = t.editProfileHeading;

    const editFirstNameLabel = document.getElementById("editFirstNameLabel");
    if (editFirstNameLabel)
        editFirstNameLabel.textContent = t.editFirstNameLabel;

    const editLastNameLabel = document.getElementById("editLastNameLabel");
    if (editLastNameLabel)
        editLastNameLabel.textContent = t.editLastNameLabel;

    const editPhoneLabel = document.getElementById("editPhoneLabel");
    if (editPhoneLabel)
        editPhoneLabel.textContent = t.editPhoneLabel;

    const saveChangesBtn = document.getElementById("saveChangesBtn");
    if (saveChangesBtn)
        saveChangesBtn.textContent = t.saveChangesBtn;

    const cancelEditBtn = document.getElementById("cancelEditBtn");
    if (cancelEditBtn)
        cancelEditBtn.textContent = t.cancelBtn;

    const societyManagementTitle = document.getElementById("societyManagementTitle");
    if (societyManagementTitle) societyManagementTitle.textContent = t.societyManagementTitle;

    const societyNameLabel = document.getElementById("societyNameLabel");
    if (societyNameLabel) societyNameLabel.textContent = t.societyNameLabel;

    const societyAddressLabel = document.getElementById("societyAddressLabel");
    if (societyAddressLabel) societyAddressLabel.textContent = t.societyAddressLabel;

    const societyCityLabel = document.getElementById("societyCityLabel");
    if (societyCityLabel) societyCityLabel.textContent = t.societyCityLabel;

    const societyStateLabel = document.getElementById("societyStateLabel");
    if (societyStateLabel) societyStateLabel.textContent = t.societyStateLabel;

    const societyPincodeLabel = document.getElementById("societyPincodeLabel");
    if (societyPincodeLabel) societyPincodeLabel.textContent = t.societyPincodeLabel;

    const societyStatusLabel = document.getElementById("societyStatusLabel");
    if (societyStatusLabel) societyStatusLabel.textContent = t.societyStatusLabel;

    const saveSocietyBtn = document.getElementById("saveSocietyBtn");
    if (saveSocietyBtn) saveSocietyBtn.textContent = t.saveSocietyBtn;

    const blockManagementTitle = document.getElementById("blockManagementTitle");
    if (blockManagementTitle) blockManagementTitle.textContent = t.blockManagementTitle;

    const blockNameLabel = document.getElementById("blockNameLabel");
    if (blockNameLabel) blockNameLabel.textContent = t.blockNameLabel;

    const blockSocietyIdLabel = document.getElementById("blockSocietyIdLabel");
    if (blockSocietyIdLabel) blockSocietyIdLabel.textContent = t.blockSocietyIdLabel;

    const saveBlockBtn = document.getElementById("saveBlockBtn");
    if (saveBlockBtn) saveBlockBtn.textContent = t.saveBlockBtn;

    const flatManagementTitle = document.getElementById("flatManagementTitle");
    if (flatManagementTitle) flatManagementTitle.textContent = t.flatManagementTitle;

    const flatNumberLabel = document.getElementById("flatNumberLabel");
    if (flatNumberLabel) flatNumberLabel.textContent = t.flatNumberLabel;

    const flatFloorNumberLabel = document.getElementById("flatFloorNumberLabel");
    if (flatFloorNumberLabel) flatFloorNumberLabel.textContent = t.flatFloorNumberLabel;

    const flatBlockIdLabel = document.getElementById("flatBlockIdLabel");
    if (flatBlockIdLabel) flatBlockIdLabel.textContent = t.flatBlockIdLabel;

    const saveFlatBtn = document.getElementById("saveFlatBtn");
    if (saveFlatBtn) saveFlatBtn.textContent = t.saveFlatBtn;

    const residentMappingTitle = document.getElementById("residentMappingTitle");
    if (residentMappingTitle) residentMappingTitle.textContent = t.residentMappingTitle;

    const residentMappingFormTitle = document.getElementById("residentMappingFormTitle");
    if (residentMappingFormTitle) residentMappingFormTitle.textContent = t.residentMappingFormTitle;

    const residentMappingSaveBtn = document.getElementById("residentMappingSaveBtn");
    if (residentMappingSaveBtn) residentMappingSaveBtn.textContent = t.residentMappingSaveBtn;

    const emergencyContactsSectionTitle = document.getElementById("emergencyContactsSectionTitle");
    if (emergencyContactsSectionTitle) emergencyContactsSectionTitle.textContent = t.emergencyContactsSectionTitle;

    const emergencyContactFormTitle = document.getElementById("emergencyContactFormTitle");
    if (emergencyContactFormTitle) emergencyContactFormTitle.textContent = t.emergencyContactFormTitle;

    const contactResidentUserIdLabel = document.getElementById("contactResidentUserIdLabel");
    if (contactResidentUserIdLabel) contactResidentUserIdLabel.textContent = t.contactResidentUserIdLabel;

    const contactNameLabel = document.getElementById("contactNameLabel");
    if (contactNameLabel) contactNameLabel.textContent = t.contactNameLabel;

    const contactRelationshipLabel = document.getElementById("contactRelationshipLabel");
    if (contactRelationshipLabel) contactRelationshipLabel.textContent = t.contactRelationshipLabel;

    const contactPhoneLabel = document.getElementById("contactPhoneLabel");
    if (contactPhoneLabel) contactPhoneLabel.textContent = t.contactPhoneLabel;

    const contactEmailLabel = document.getElementById("contactEmailLabel");
    if (contactEmailLabel) contactEmailLabel.textContent = t.contactEmailLabel;

    const contactPriorityLabel = document.getElementById("contactPriorityLabel");
    if (contactPriorityLabel) contactPriorityLabel.textContent = t.contactPriorityLabel;

    const saveContactBtn = document.getElementById("saveContactBtn");
    if (saveContactBtn) saveContactBtn.textContent = t.saveContactBtn;

    const otpVerifyTitle = document.getElementById("otpVerifyTitle");
    if (otpVerifyTitle) otpVerifyTitle.textContent = t.otpVerifyTitle;

    const otpValueLabel = document.getElementById("otpValueLabel");
    if (otpValueLabel) otpValueLabel.textContent = t.otpValueLabel;

    const verifyOtpBtn = document.getElementById("verifyOtpBtn");
    if (verifyOtpBtn) verifyOtpBtn.textContent = t.verifyOtpBtn;

    const verifyOtpFormBtn = document.getElementById("verifyOtpFormBtn");
    if (verifyOtpFormBtn) verifyOtpFormBtn.textContent = t.verifyOtpBtn;

    const contactVerificationTitle = document.getElementById("contactVerificationTitle");
    if (contactVerificationTitle) contactVerificationTitle.textContent = t.contactVerificationTitle;

    const contactVerificationSubtitle = document.getElementById("contactVerificationSubtitle");
    if (contactVerificationSubtitle) contactVerificationSubtitle.textContent = t.contactVerificationSubtitle;

    const generateOtpTitle = document.getElementById("generateOtpTitle");
    if (generateOtpTitle) generateOtpTitle.textContent = t.generateOtpTitle;

    const generateOtpContactIdLabel = document.getElementById("generateOtpContactIdLabel");
    if (generateOtpContactIdLabel) generateOtpContactIdLabel.textContent = t.generateOtpContactIdLabel;

    const generateOtpBtn = document.getElementById("generateOtpBtn");
    if (generateOtpBtn) generateOtpBtn.textContent = t.generateOtpBtn;

    const verifyOtpTitle = document.getElementById("verifyOtpTitle");
    if (verifyOtpTitle) verifyOtpTitle.textContent = t.verifyOtpTitle;

    const verifyOtpContactIdLabel = document.getElementById("verifyOtpContactIdLabel");
    if (verifyOtpContactIdLabel) verifyOtpContactIdLabel.textContent = t.verifyOtpContactIdLabel;

    const verifyOtpValueLabel = document.getElementById("verifyOtpValueLabel");
    if (verifyOtpValueLabel) verifyOtpValueLabel.textContent = t.verifyOtpValueLabel;

    const alertsSectionTitle = document.getElementById("alertsSectionTitle");
    if (alertsSectionTitle) alertsSectionTitle.textContent = t.alertsSectionTitle;

    const alertsSectionSubtitle = document.getElementById("alertsSectionSubtitle");
    if (alertsSectionSubtitle) alertsSectionSubtitle.textContent = t.alertsSectionSubtitle;

    const createAlertTitle = document.getElementById("createAlertTitle");
    if (createAlertTitle) createAlertTitle.textContent = t.createAlertTitle;

    const alertUserIdLabel = document.getElementById("alertUserIdLabel");
    if (alertUserIdLabel) alertUserIdLabel.textContent = t.alertUserIdLabel;

    const alertTypeLabel = document.getElementById("alertTypeLabel");
    if (alertTypeLabel) alertTypeLabel.textContent = t.alertTypeLabel;

    const alertMessageLabel = document.getElementById("alertMessageLabel");
    if (alertMessageLabel) alertMessageLabel.textContent = t.alertMessageLabel;

    const createAlertBtn = document.getElementById("createAlertBtn");
    if (createAlertBtn) createAlertBtn.textContent = t.createAlertBtn;

    const refreshAlertsBtnText = document.getElementById("refreshAlertsBtnText");
    if (refreshAlertsBtnText) refreshAlertsBtnText.textContent = t.refreshAlertsBtnText;

    const emergencyAlertsSectionTitle = document.getElementById("emergencyAlertsSectionTitle");
    if (emergencyAlertsSectionTitle) emergencyAlertsSectionTitle.textContent = t.emergencyAlertsSectionTitle;

    const roleAccessSectionTitle = document.getElementById("roleAccessSectionTitle");
    if (roleAccessSectionTitle) roleAccessSectionTitle.textContent = t.roleAccessSectionTitle;

    const roleAccessSectionSubtitle = document.getElementById("roleAccessSectionSubtitle");
    if (roleAccessSectionSubtitle) roleAccessSectionSubtitle.textContent = t.roleAccessSectionSubtitle;

    const assignRoleTitle = document.getElementById("assignRoleTitle");
    if (assignRoleTitle) assignRoleTitle.textContent = t.assignRoleTitle;

    const roleUserIdLabel = document.getElementById("roleUserIdLabel");
    if (roleUserIdLabel) roleUserIdLabel.textContent = t.roleUserIdLabel;

    const roleIdInputLabel = document.getElementById("roleIdInputLabel");
    if (roleIdInputLabel) roleIdInputLabel.textContent = t.roleIdInputLabel;

    const assignRoleBtn = document.getElementById("assignRoleBtn");
    if (assignRoleBtn) assignRoleBtn.textContent = t.assignRoleBtn;

    const refreshRolesBtnText = document.getElementById("refreshRolesBtnText");
    if (refreshRolesBtnText) refreshRolesBtnText.textContent = t.refreshRolesBtnText;

    const roleReferenceTitle = document.getElementById("roleReferenceTitle");
    if (roleReferenceTitle) roleReferenceTitle.textContent = t.roleReferenceTitle;

    const roleListTitle = document.getElementById("roleListTitle");
    if (roleListTitle) roleListTitle.textContent = t.roleListTitle;

    const sosSectionTitle = document.getElementById("sosSectionTitle");
    if (sosSectionTitle) sosSectionTitle.textContent = t.sosSectionTitle;

    const sosSectionSubtitle = document.getElementById("sosSectionSubtitle");
    if (sosSectionSubtitle) sosSectionSubtitle.textContent = t.sosSectionSubtitle;

    const createSosTitle = document.getElementById("createSosTitle");
    if (createSosTitle) createSosTitle.textContent = t.createSosTitle;

    const sosResidentIdLabel = document.getElementById("sosResidentIdLabel");
    if (sosResidentIdLabel) sosResidentIdLabel.textContent = t.sosResidentIdLabel;

    const sosEmergencyTypeLabel = document.getElementById("sosEmergencyTypeLabel");
    if (sosEmergencyTypeLabel) sosEmergencyTypeLabel.textContent = t.sosEmergencyTypeLabel;

    const sosMessageLabel = document.getElementById("sosMessageLabel");
    if (sosMessageLabel) sosMessageLabel.textContent = t.sosMessageLabel;

    const peopleCountLabel = document.getElementById("peopleCountLabel");
    if (peopleCountLabel) peopleCountLabel.textContent = t.peopleCountLabel;

    const needAmbulanceLabel = document.getElementById("needAmbulanceLabel");
    if (needAmbulanceLabel) needAmbulanceLabel.textContent = t.needAmbulanceLabel;

    const sendSosBtn = document.getElementById("sendSosBtn");
    if (sendSosBtn) sendSosBtn.textContent = t.sendSosBtn;

    const allSosAlertsTitle = document.getElementById("allSosAlertsTitle");
    if (allSosAlertsTitle) allSosAlertsTitle.textContent = t.allSosAlertsTitle;

    const refreshSosBtnText = document.getElementById("refreshSosBtnText");
    if (refreshSosBtnText) refreshSosBtnText.textContent = t.refreshSosBtnText;

    const incidentManagementTitle = document.getElementById("incidentManagementTitle");
    if (incidentManagementTitle) incidentManagementTitle.textContent = t.incidentManagementTitle;

    const incidentManagementSubtitle = document.getElementById("incidentManagementSubtitle");
    if (incidentManagementSubtitle) incidentManagementSubtitle.textContent = t.incidentManagementSubtitle;

    const refreshIncidentsBtnText = document.getElementById("refreshIncidentsBtnText");
    if (refreshIncidentsBtnText) refreshIncidentsBtnText.textContent = t.refreshIncidentsBtnText;

    const incidentDetailsTitle = document.getElementById("incidentDetailsTitle");
    if (incidentDetailsTitle) incidentDetailsTitle.textContent = t.incidentDetailsTitle;

    const incidentDetailsPlaceholder = document.getElementById("incidentDetailsPlaceholder");
    if (incidentDetailsPlaceholder) incidentDetailsPlaceholder.textContent = t.incidentDetailsPlaceholder;

    const assistanceStartedBtn = document.getElementById("assistanceStartedBtn");
    if (assistanceStartedBtn) assistanceStartedBtn.textContent = t.assistanceStartedBtn;

    const resolveIncidentBtnText = document.getElementById("resolveIncidentBtnText");
    if (resolveIncidentBtnText) resolveIncidentBtnText.textContent = t.resolveIncidentBtnText;

    const closeIncidentBtnText = document.getElementById("closeIncidentBtnText");
    if (closeIncidentBtnText) closeIncidentBtnText.textContent = t.closeIncidentBtnText;

    const incidentTimelineTitle = document.getElementById("incidentTimelineTitle");
    if (incidentTimelineTitle) incidentTimelineTitle.textContent = t.incidentTimelineTitle;

    const incidentTimelinePlaceholder = document.getElementById("incidentTimelinePlaceholder");
    if (incidentTimelinePlaceholder) incidentTimelinePlaceholder.textContent = t.incidentTimelinePlaceholder;

    const escalationSectionTitle = document.getElementById("escalationSectionTitle");
    if (escalationSectionTitle) escalationSectionTitle.textContent = t.escalationSectionTitle;

    const escalationSectionSubtitle = document.getElementById("escalationSectionSubtitle");
    if (escalationSectionSubtitle) escalationSectionSubtitle.textContent = t.escalationSectionSubtitle;

    const escalationIncidentIdLabel = document.getElementById("escalationIncidentIdLabel");
    if (escalationIncidentIdLabel) escalationIncidentIdLabel.textContent = t.escalationIncidentIdLabel;

    const checkEscalationBtnText = document.getElementById("checkEscalationBtnText");
    if (checkEscalationBtnText) checkEscalationBtnText.textContent = t.checkEscalationBtnText;

    const startEscalationBtnText = document.getElementById("startEscalationBtnText");
    if (startEscalationBtnText) startEscalationBtnText.textContent = t.startEscalationBtnText;

    const nextEscalationBtnText = document.getElementById("nextEscalationBtnText");
    if (nextEscalationBtnText) nextEscalationBtnText.textContent = t.nextEscalationBtnText;

    const currentEscalationTitle = document.getElementById("currentEscalationTitle");
    if (currentEscalationTitle) currentEscalationTitle.textContent = t.currentEscalationTitle;

    const noEscalationSelectedText = document.getElementById("noEscalationSelectedText");
    if (noEscalationSelectedText) noEscalationSelectedText.textContent = t.noEscalationSelectedText;

    const escalationLogsTitle = document.getElementById("escalationLogsTitle");
    if (escalationLogsTitle) escalationLogsTitle.textContent = t.escalationLogsTitle;

    const noEscalationLogsText = document.getElementById("noEscalationLogsText");
    if (noEscalationLogsText) noEscalationLogsText.textContent = t.noEscalationLogsText;

    const volunteerAvailabilityTitle = document.getElementById("volunteerAvailabilityTitle");
    if (volunteerAvailabilityTitle) volunteerAvailabilityTitle.textContent = t.volunteerAvailabilityTitle;

    const volunteerAvailabilitySubtitle = document.getElementById("volunteerAvailabilitySubtitle");
    if (volunteerAvailabilitySubtitle) volunteerAvailabilitySubtitle.textContent = t.volunteerAvailabilitySubtitle;

    const volunteerIdLabel = document.getElementById("volunteerIdLabel");
    if (volunteerIdLabel) volunteerIdLabel.textContent = t.volunteerIdLabel;

    const volunteerOnlineBtnText = document.getElementById("volunteerOnlineBtnText");
    if (volunteerOnlineBtnText) volunteerOnlineBtnText.textContent = t.volunteerOnlineBtnText;

    const volunteerOfflineBtnText = document.getElementById("volunteerOfflineBtnText");
    if (volunteerOfflineBtnText) volunteerOfflineBtnText.textContent = t.volunteerOfflineBtnText;

    const emergencyRequestTitle = document.getElementById("emergencyRequestTitle");
    if (emergencyRequestTitle) emergencyRequestTitle.textContent = t.emergencyRequestTitle;

    const incidentIdLabel = document.getElementById("incidentIdLabel");
    if (incidentIdLabel) incidentIdLabel.textContent = t.incidentIdLabel;

    const loadAssignmentBtnText = document.getElementById("loadAssignmentBtnText");
    if (loadAssignmentBtnText) loadAssignmentBtnText.textContent = t.loadAssignmentBtnText;

    const autoAssignBtnText = document.getElementById("autoAssignBtnText");
    if (autoAssignBtnText) autoAssignBtnText.textContent = t.autoAssignBtnText;

    const volunteerAssignmentPlaceholder = document.getElementById("volunteerAssignmentPlaceholder");
    if (volunteerAssignmentPlaceholder) volunteerAssignmentPlaceholder.textContent = t.volunteerAssignmentPlaceholder;

    const acceptIncidentBtnText = document.getElementById("acceptIncidentBtnText");
    if (acceptIncidentBtnText) acceptIncidentBtnText.textContent = t.acceptIncidentBtnText;

    const rejectIncidentBtnText = document.getElementById("rejectIncidentBtnText");
    if (rejectIncidentBtnText) rejectIncidentBtnText.textContent = t.rejectIncidentBtnText;
}

/* =========================================================
   INITIAL DASHBOARD DATA
========================================================= */
if (sidebarUserName) sidebarUserName.textContent = getTranslation("loggedInUserLabel", "Logged In User");
if (sidebarUserEmail) sidebarUserEmail.textContent = userEmail || "-";
if (cardUserEmail) cardUserEmail.textContent = userEmail || "-";
if (cardUserId) cardUserId.textContent = userId || "-";
if (dashboardUserEmail) dashboardUserEmail.textContent = `${getTranslation("emailLabel", "Email")}: ${userEmail || "-"}`;
if (dashboardUserId) dashboardUserId.textContent = `${getTranslation("userIdLabel", "User ID")}: ${userId || "-"}`;
if (heroWelcome) heroWelcome.textContent = getTranslation("welcomeBack", "Welcome back");
if (heroText) heroText.textContent = `${getTranslation("loggedInAs", "You are logged in as")} ${userEmail || "-"}. ${getTranslation("accessDashboardText", "Access your dashboard and modules from the left menu.")}`;
if (miniAvatar) miniAvatar.textContent = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

/* =========================================================
   COMMON HELPERS
========================================================= */


function authHeaders(includeJson = true) {
  const headers = {};
  if (includeJson) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;
  return headers;
}

function setActiveButton(activeButton) {
  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
  if (activeButton) activeButton.classList.add("active");
}

function showOnlySection(sectionToShow) {
  [
    dashboardSection,
    profileSection,
    societiesSection,
    blocksSection,
    flatsSection,
    residentMappingSection,
    emergencyContactsSection,
    contactVerificationSection,
    alertsSection,
    roleAccessSection,
    sosSection,

    // M3
    incidentSection,
    escalationSection,
    volunteerSection
  ].forEach(section => {
    if (section) {
      section.classList.add("hidden");
    }
  });

  if (sectionToShow) {
    sectionToShow.classList.remove("hidden");
  }
}

function safeText(value, fallback = "-") {
  if (value === null || value === undefined || value === "") return fallback;
  return value;
}

function isAdmin() {
  return currentUserRole && currentUserRole.toLowerCase() === "admin";
}

function isResident() {
  return currentUserRole && currentUserRole.toLowerCase() === "resident";
}

function isSecurity() {
  return currentUserRole && currentUserRole.toLowerCase() === "security";
}

function isVolunteer() {
  return currentUserRole && currentUserRole.toLowerCase() === "volunteer";
}

function isGuardian() {
  return currentUserRole && currentUserRole.toLowerCase() === "guardian";
}

async function ensureRoleLoaded() {
  if (!currentUserRole) {
    await loadProfile();
  }
}

/* =========================================================
   PROFILE
========================================================= */
function renderProfile(data) {
  const firstName = data.first_name || "";
  const lastName = data.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim() || "User Profile";
  const email = data.email || "-";
  const role = data.role_name || "-";

  currentUserRole = data.role_name || null;
  applyRoleBasedUI();

  document.getElementById("profileFullName").textContent = fullName;
  document.getElementById("profileHeaderEmail").textContent = email;
  document.getElementById("profileRoleBadge").textContent = role;
  document.getElementById("profileAvatar").textContent =
    firstName ? firstName.charAt(0).toUpperCase() : email.charAt(0).toUpperCase();

  document.getElementById("profileFirstName").textContent = safeText(data.first_name);
  document.getElementById("profileLastName").textContent = safeText(data.last_name);
  document.getElementById("profileEmail").textContent = safeText(email);
  document.getElementById("profilePhone").textContent = safeText(data.phone);
  document.getElementById("profileRole").textContent = safeText(role);
  document.getElementById("profileSociety").textContent = safeText(data.society_name);
  document.getElementById("profileBlock").textContent = safeText(data.block_name);
  document.getElementById("profileFlat").textContent = safeText(data.flat_number);
  document.getElementById("profileEmployeeId").textContent = safeText(data.employee_id);
  document.getElementById("profileShift").textContent = safeText(data.shift_details);

  sidebarUserName.textContent = fullName;

  document.getElementById("editFirstName").value = data.first_name || "";
  document.getElementById("editLastName").value = data.last_name || "";
  document.getElementById("editPhone").value = data.phone || "";
}

async function loadProfile() {
if (profileMessage) {
  profileMessage.style.color = "#475569";
  profileMessage.textContent = "Loading profile...";
}

  try {
    const response = await fetch(`${API_BASE_URL}/users/profile/${userId}`);
    const data = await response.json();

    if (!response.ok) {
      profileMessage.style.color = "#dc2626";
      profileMessage.textContent = data.detail || "Failed to load profile";
      return null;
    }

    renderProfile(data);
    profileMessage.style.color = "green";
    profileMessage.textContent = "Profile loaded successfully.";
    return data;
  } catch (error) {
    profileMessage.style.color = "#dc2626";
    profileMessage.textContent = "Server error while loading profile.";
    console.error(error);
    return null;
  }
}


/* =========================================================
   PROFILE EDIT
========================================================= */
if (editProfileBtn) {
  editProfileBtn.addEventListener("click", () => {
    editProfileCard.classList.remove("hidden");
    editProfileMessage.textContent = "";
  });
}

if (cancelEditBtn) {
  cancelEditBtn.addEventListener("click", () => {
    editProfileCard.classList.add("hidden");
    editProfileMessage.textContent = "";
  });
}

if (editProfileForm) {
  editProfileForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const first_name = document.getElementById("editFirstName").value.trim();
    const last_name = document.getElementById("editLastName").value.trim();
    const phone = document.getElementById("editPhone").value.trim();

    editProfileMessage.style.color = "#475569";
    editProfileMessage.textContent = "Saving changes...";

    try {
      const response = await fetch(`${API_BASE_URL}/users/profile/${userId}`, {
        method: "PUT",
        headers: authHeaders(true),
        body: JSON.stringify({ first_name, last_name, phone })
      });

      const data = await response.json();

      if (!response.ok) {
        editProfileMessage.style.color = "#dc2626";
        editProfileMessage.textContent = data.detail || "Failed to update profile";
        return;
      }

      renderProfile(data);
      editProfileMessage.style.color = "green";
      editProfileMessage.textContent = "Profile updated successfully!";
      profileMessage.style.color = "green";
      profileMessage.textContent = "Profile updated successfully.";
      editProfileCard.classList.add("hidden");
    } catch (error) {
      editProfileMessage.style.color = "#dc2626";
      editProfileMessage.textContent = "Server error while updating profile.";
      console.error(error);
    }
  });
}

/* =========================================================
   SOCIETIES
========================================================= */
function clearSocietyForm() {
  document.getElementById("societyId").value = "";
  document.getElementById("societyName").value = "";
  document.getElementById("societyAddress").value = "";
  document.getElementById("societyCity").value = "";
  document.getElementById("societyState").value = "";
  document.getElementById("societyPincode").value = "";
  document.getElementById("societyStatus").value = "active";
  societyFormTitle.textContent = getTranslation("createSociety", "Create Society");
  societyFormMessage.textContent = "";
}

function openCreateSocietyForm() {
  clearSocietyForm();
  societyFormCard.classList.remove("hidden");
}

function openEditSocietyForm(society) {
  document.getElementById("societyId").value = society.id;
  document.getElementById("societyName").value = society.society_name;
  document.getElementById("societyAddress").value = society.address;
  document.getElementById("societyCity").value = society.city;
  document.getElementById("societyState").value = society.state;
  document.getElementById("societyPincode").value = society.pincode;
  document.getElementById("societyStatus").value = society.status;
  societyFormTitle.textContent = getTranslation("editSociety", "Edit Society");
  societyFormMessage.textContent = "";
  societyFormCard.classList.remove("hidden");
}

function renderSocieties(societies) {
  if (!societies.length) {
    societyList.innerHTML = `<p class="empty-text">No societies found.</p>`;
    return;
  }

  societyList.innerHTML = societies.map(society => `
    <div class="society-card">
      <div class="society-card-top">
        <div>
          <h3>${safeText(society.society_name)}</h3>
          <p><strong>ID:</strong> ${safeText(society.id)}</p>
        </div>
        <span class="role-badge">${safeText(society.status)}</span>
      </div>

      <div class="society-details">
        <p><strong>Address:</strong> ${safeText(society.address)}</p>
        <p><strong>City:</strong> ${safeText(society.city)}</p>
        <p><strong>State:</strong> ${safeText(society.state)}</p>
        <p><strong>Pincode:</strong> ${safeText(society.pincode)}</p>
      </div>

      ${isAdmin() ? `
        <div class="society-btn-row">
          <button class="small-btn edit-society-btn" data-id="${society.id}">Edit</button>
          <button class="small-btn cancel-btn delete-society-btn" data-id="${society.id}">Delete</button>
        </div>
      ` : ""}
    </div>
  `).join("");

  if (isAdmin()) {
    document.querySelectorAll(".edit-society-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const societyId = Number(btn.dataset.id);
        const society = societies.find(s => s.id === societyId);
        if (society) openEditSocietyForm(society);
      });
    });

    document.querySelectorAll(".delete-society-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const societyId = Number(btn.dataset.id);
        const confirmDelete = confirm("Are you sure you want to delete this society?");
        if (!confirmDelete) return;
        await deleteSociety(societyId);
      });
    });
  }
}

async function loadSocieties() {
  societyAccessMessage.style.color = "#475569";
  societyAccessMessage.textContent = "Loading societies...";

  try {
    const response = await fetch(`${API_BASE_URL}/societies/`);
    const data = await response.json();

    if (!response.ok) {
      societyAccessMessage.style.color = "#dc2626";
      societyAccessMessage.textContent = "Failed to load societies.";
      return;
    }

    renderSocieties(data);

    if (isAdmin()) {
      societyActions.classList.remove("hidden");
      societyAccessMessage.style.color = "green";
      societyAccessMessage.textContent = "Admin access: you can create, edit and delete societies.";
    } else {
      societyActions.classList.add("hidden");
      societyFormCard.classList.add("hidden");
      societyAccessMessage.style.color = "#475569";
      societyAccessMessage.textContent = "View-only mode: only admins can modify societies.";
    }
  } catch (error) {
    societyAccessMessage.style.color = "#dc2626";
    societyAccessMessage.textContent = "Server error while loading societies.";
    console.error(error);
  }
}

if (showCreateSocietyBtn) showCreateSocietyBtn.addEventListener("click", openCreateSocietyForm);

if (cancelSocietyBtn) {
  cancelSocietyBtn.addEventListener("click", () => {
    societyFormCard.classList.add("hidden");
    societyFormMessage.textContent = "";
  });
}

if (societyForm) {
  societyForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!isAdmin()) {
      societyFormMessage.style.color = "#dc2626";
      societyFormMessage.textContent = "Only admins can modify societies.";
      return;
    }

    const societyId = document.getElementById("societyId").value;
    const payload = {
      society_name: document.getElementById("societyName").value.trim(),
      address: document.getElementById("societyAddress").value.trim(),
      city: document.getElementById("societyCity").value.trim(),
      state: document.getElementById("societyState").value.trim(),
      pincode: document.getElementById("societyPincode").value.trim(),
      status: document.getElementById("societyStatus").value
    };

    const isEdit = !!societyId;
    const url = isEdit
      ? `${API_BASE_URL}/societies/${societyId}`
      : `${API_BASE_URL}/societies/`;
    const method = isEdit ? "PUT" : "POST";

    societyFormMessage.style.color = "#475569";
    societyFormMessage.textContent = isEdit ? "Updating society..." : "Creating society...";

    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        societyFormMessage.style.color = "#dc2626";
        societyFormMessage.textContent = data.detail || "Failed to save society.";
        return;
      }

      societyFormMessage.style.color = "green";
      societyFormMessage.textContent = isEdit
        ? "Society updated successfully!"
        : "Society created successfully!";

      clearSocietyForm();
      societyFormCard.classList.add("hidden");
      await loadSocieties();
    } catch (error) {
      societyFormMessage.style.color = "#dc2626";
      societyFormMessage.textContent = "Server error while saving society.";
      console.error(error);
    }
  });
}

async function deleteSociety(societyId) {
  try {
    const response = await fetch(`${API_BASE_URL}/societies/${societyId}`, {
      method: "DELETE",
      headers: authHeaders(false)
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.detail || "Failed to delete society.");
      return;
    }

    await loadSocieties();
  } catch (error) {
    alert("Server error while deleting society.");
    console.error(error);
  }
}

/* =========================================================
   BLOCKS
========================================================= */
function clearBlockForm() {
  document.getElementById("blockId").value = "";
  document.getElementById("blockName").value = "";
  document.getElementById("blockSocietyId").value = "";
  document.getElementById("blockDescription").value = "";
  blockFormTitle.textContent = getTranslation("createBlock", "Create Block");
  blockFormMessage.textContent = "";
}

function openCreateBlockForm() {
  clearBlockForm();
  blockFormCard.classList.remove("hidden");
}

function openEditBlockForm(block) {
  document.getElementById("blockId").value = block.id;
  document.getElementById("blockName").value = block.block_name;
  document.getElementById("blockSocietyId").value = block.society_id;
  document.getElementById("blockDescription").value = block.description || "";
  blockFormTitle.textContent = getTranslation("editBlock", "Edit Block");
  blockFormMessage.textContent = "";
  blockFormCard.classList.remove("hidden");
}

function renderBlocks(blocks) {
  if (!blocks.length) {
    blockList.innerHTML = `<p class="empty-text">No blocks found.</p>`;
    return;
  }

  blockList.innerHTML = blocks.map(block => `
    <div class="society-card">
      <div class="society-card-top">
        <div>
          <h3>${safeText(block.block_name)}</h3>
          <p><strong>Block ID:</strong> ${safeText(block.id)}</p>
          <p><strong>Society ID:</strong> ${safeText(block.society_id)}</p>
        </div>
      </div>

      <div class="society-details">
        <p><strong>Description:</strong> ${safeText(block.description)}</p>
      </div>

      ${isAdmin() ? `
        <div class="society-btn-row">
          <button class="small-btn edit-block-btn" data-id="${block.id}">Edit</button>
          <button class="small-btn cancel-btn delete-block-btn" data-id="${block.id}">Delete</button>
        </div>
      ` : ""}
    </div>
  `).join("");

  if (isAdmin()) {
    document.querySelectorAll(".edit-block-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const blockId = Number(btn.dataset.id);
        const block = blocks.find(b => b.id === blockId);
        if (block) openEditBlockForm(block);
      });
    });

    document.querySelectorAll(".delete-block-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const blockId = Number(btn.dataset.id);
        const confirmDelete = confirm("Are you sure you want to delete this block?");
        if (!confirmDelete) return;
        await deleteBlock(blockId);
      });
    });
  }
}

async function loadBlocks() {
  blockAccessMessage.style.color = "#475569";
  blockAccessMessage.textContent = "Loading blocks...";

  try {
    const response = await fetch(`${API_BASE_URL}/blocks/`);
    const data = await response.json();

    if (!response.ok) {
      blockAccessMessage.style.color = "#dc2626";
      blockAccessMessage.textContent = "Failed to load blocks.";
      return;
    }

    renderBlocks(data);

    if (isAdmin()) {
      blockActions.classList.remove("hidden");
      blockAccessMessage.style.color = "green";
      blockAccessMessage.textContent = "Admin access: you can create, edit and delete blocks.";
    } else {
      blockActions.classList.add("hidden");
      blockFormCard.classList.add("hidden");
      blockAccessMessage.style.color = "#475569";
      blockAccessMessage.textContent = "View-only mode: only admins can modify blocks.";
    }
  } catch (error) {
    blockAccessMessage.style.color = "#dc2626";
    blockAccessMessage.textContent = "Server error while loading blocks.";
    console.error(error);
  }
}

if (showCreateBlockBtn) showCreateBlockBtn.addEventListener("click", openCreateBlockForm);

if (cancelBlockBtn) {
  cancelBlockBtn.addEventListener("click", () => {
    blockFormCard.classList.add("hidden");
    blockFormMessage.textContent = "";
  });
}

if (blockForm) {
  blockForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!isAdmin()) {
      blockFormMessage.style.color = "#dc2626";
      blockFormMessage.textContent = "Only admins can modify blocks.";
      return;
    }

    const blockId = document.getElementById("blockId").value;
    const payload = {
      block_name: document.getElementById("blockName").value.trim(),
      society_id: Number(document.getElementById("blockSocietyId").value),
      description: document.getElementById("blockDescription").value.trim()
    };

    const isEdit = !!blockId;
    const url = isEdit
      ? `${API_BASE_URL}/blocks/${blockId}`
      : `${API_BASE_URL}/blocks/`;
    const method = isEdit ? "PUT" : "POST";

    blockFormMessage.style.color = "#475569";
    blockFormMessage.textContent = isEdit ? "Updating block..." : "Creating block...";

    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        blockFormMessage.style.color = "#dc2626";
        blockFormMessage.textContent = data.detail || "Failed to save block.";
        return;
      }

      blockFormMessage.style.color = "green";
      blockFormMessage.textContent = isEdit
        ? "Block updated successfully!"
        : "Block created successfully!";

      clearBlockForm();
      blockFormCard.classList.add("hidden");
      await loadBlocks();
    } catch (error) {
      blockFormMessage.style.color = "#dc2626";
      blockFormMessage.textContent = "Server error while saving block.";
      console.error(error);
    }
  });
}

async function deleteBlock(blockId) {
  try {
    const response = await fetch(`${API_BASE_URL}/blocks/${blockId}`, {
      method: "DELETE",
      headers: authHeaders(false)
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.detail || "Failed to delete block.");
      return;
    }

    await loadBlocks();
  } catch (error) {
    alert("Server error while deleting block.");
    console.error(error);
  }
}

/* =========================================================
   FLATS
========================================================= */
function clearFlatForm() {
  document.getElementById("flatId").value = "";
  document.getElementById("flatNumber").value = "";
  document.getElementById("flatFloorNumber").value = "";
  document.getElementById("flatBlockId").value = "";
  flatFormTitle.textContent = getTranslation("createFlat", "Create Flat");
  flatFormMessage.textContent = "";
}

function openCreateFlatForm() {
  clearFlatForm();
  flatFormCard.classList.remove("hidden");
}

function openEditFlatForm(flat) {
  document.getElementById("flatId").value = flat.id;
  document.getElementById("flatNumber").value = flat.flat_number;
  document.getElementById("flatFloorNumber").value = flat.floor_number;
  document.getElementById("flatBlockId").value = flat.block_id;
  flatFormTitle.textContent = getTranslation("editFlat", "Edit Flat");
  flatFormMessage.textContent = "";
  flatFormCard.classList.remove("hidden");
}

function renderFlats(flats) {
  if (!flats.length) {
    flatList.innerHTML = `<p class="empty-text">No flats found.</p>`;
    return;
  }

  flatList.innerHTML = flats.map(flat => `
    <div class="society-card">
      <div class="society-card-top">
        <div>
          <h3>${safeText(flat.flat_number)}</h3>
          <p><strong>Flat ID:</strong> ${safeText(flat.id)}</p>
          <p><strong>Floor Number:</strong> ${safeText(flat.floor_number)}</p>
          <p><strong>Block ID:</strong> ${safeText(flat.block_id)}</p>
        </div>
      </div>

      ${isAdmin() ? `
        <div class="society-btn-row">
          <button class="small-btn edit-flat-btn" data-id="${flat.id}">Edit</button>
          <button class="small-btn cancel-btn delete-flat-btn" data-id="${flat.id}">Delete</button>
        </div>
      ` : ""}
    </div>
  `).join("");

  if (isAdmin()) {
    document.querySelectorAll(".edit-flat-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const flatId = Number(btn.dataset.id);
        const flat = flats.find(f => f.id === flatId);
        if (flat) openEditFlatForm(flat);
      });
    });

    document.querySelectorAll(".delete-flat-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const flatId = Number(btn.dataset.id);
        const confirmDelete = confirm("Are you sure you want to delete this flat?");
        if (!confirmDelete) return;
        await deleteFlat(flatId);
      });
    });
  }
}

async function loadFlats() {
  flatAccessMessage.style.color = "#475569";
  flatAccessMessage.textContent = "Loading flats...";

  try {
    const response = await fetch(`${API_BASE_URL}/flats/`);
    const data = await response.json();

    if (!response.ok) {
      flatAccessMessage.style.color = "#dc2626";
      flatAccessMessage.textContent = "Failed to load flats.";
      return;
    }

    renderFlats(data);

    if (isAdmin()) {
      flatActions.classList.remove("hidden");
      flatAccessMessage.style.color = "green";
      flatAccessMessage.textContent = "Admin access: you can create, edit and delete flats.";
    } else {
      flatActions.classList.add("hidden");
      flatFormCard.classList.add("hidden");
      flatAccessMessage.style.color = "#475569";
      flatAccessMessage.textContent = "View-only mode: only admins can modify flats.";
    }
  } catch (error) {
    flatAccessMessage.style.color = "#dc2626";
    flatAccessMessage.textContent = "Server error while loading flats.";
    console.error(error);
  }
}

if (showCreateFlatBtn) showCreateFlatBtn.addEventListener("click", openCreateFlatForm);

if (cancelFlatBtn) {
  cancelFlatBtn.addEventListener("click", () => {
    flatFormCard.classList.add("hidden");
    flatFormMessage.textContent = "";
  });
}

if (flatForm) {
  flatForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!isAdmin()) {
      flatFormMessage.style.color = "#dc2626";
      flatFormMessage.textContent = "Only admins can modify flats.";
      return;
    }

    const flatId = document.getElementById("flatId").value;
    const payload = {
      flat_number: document.getElementById("flatNumber").value.trim(),
      floor_number: Number(document.getElementById("flatFloorNumber").value),
      block_id: Number(document.getElementById("flatBlockId").value)
    };

    const isEdit = !!flatId;
    const url = isEdit
      ? `${API_BASE_URL}/flats/${flatId}`
      : `${API_BASE_URL}/flats/`;
    const method = isEdit ? "PUT" : "POST";

    flatFormMessage.style.color = "#475569";
    flatFormMessage.textContent = isEdit ? "Updating flat..." : "Creating flat...";

    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        flatFormMessage.style.color = "#dc2626";
        flatFormMessage.textContent = data.detail || "Failed to save flat.";
        return;
      }

      flatFormMessage.style.color = "green";
      flatFormMessage.textContent = isEdit
        ? "Flat updated successfully!"
        : "Flat created successfully!";

      clearFlatForm();
      flatFormCard.classList.add("hidden");
      await loadFlats();
    } catch (error) {
      flatFormMessage.style.color = "#dc2626";
      flatFormMessage.textContent = "Server error while saving flat.";
      console.error(error);
    }
  });
}

async function deleteFlat(flatId) {
  try {
    const response = await fetch(`${API_BASE_URL}/flats/${flatId}`, {
      method: "DELETE",
      headers: authHeaders(false)
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.detail || "Failed to delete flat.");
      return;
    }

    await loadFlats();
  } catch (error) {
    alert("Server error while deleting flat.");
    console.error(error);
  }
}

/* =========================================================
   RESIDENT MAPPING
========================================================= */
function clearResidentMappingForm() {
  document.getElementById("mappingUserId").value = "";
  document.getElementById("mappingSocietyId").value = "";
  document.getElementById("mappingBlockId").value = "";
  document.getElementById("mappingFlatId").value = "";
  residentMappingFormMessage.textContent = "";
}

function openCreateResidentMappingForm() {
  clearResidentMappingForm();
  residentMappingFormCard.classList.remove("hidden");
}

function renderResidentMappings(mappings) {
  if (!mappings.length) {
    residentMappingList.innerHTML = `<p class="empty-text">No resident mappings found.</p>`;
    return;
  }

  residentMappingList.innerHTML = mappings.map(mapping => `
    <div class="society-card">
      <div class="society-card-top">
        <div>
          <h3>${mapping.resident_name}</h3>
          <p><strong>Resident Email:</strong> ${mapping.resident_email}</p>
          <p><strong>User ID:</strong> ${mapping.user_id}</p>
        </div>
      </div>

      <div class="society-details">
        <p><strong>Mapping ID:</strong> ${mapping.id}</p>
        <p><strong>Society:</strong> ${mapping.society_name} (ID: ${mapping.society_id})</p>
        <p><strong>Block:</strong> ${mapping.block_name} (ID: ${mapping.block_id})</p>
        <p><strong>Flat:</strong> ${mapping.flat_number} (ID: ${mapping.flat_id})</p>
      </div>

      ${isAdmin() ? `
        <div class="society-btn-row">
          <button class="small-btn cancel-btn delete-mapping-btn" data-id="${mapping.id}">
            Delete
          </button>
        </div>
      ` : ""}
    </div>
  `).join("");

  if (isAdmin()) {
    document.querySelectorAll(".delete-mapping-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const mappingId = Number(btn.dataset.id);
        const confirmDelete = confirm("Are you sure you want to delete this resident mapping?");
        if (!confirmDelete) return;
        await deleteResidentMapping(mappingId);
      });
    });
  }
}

async function loadResidentMappings() {
  residentMappingAccessMessage.style.color = "#475569";
  residentMappingAccessMessage.textContent = "Loading resident mappings...";

  try {
    const response = await fetch(`${API_BASE_URL}/resident-flats/`);
    const data = await response.json();

    if (!response.ok) {
      residentMappingAccessMessage.style.color = "#dc2626";
      residentMappingAccessMessage.textContent = data.detail || "Failed to load resident mappings.";
      return;
    }

    renderResidentMappings(data);

    if (isAdmin()) {
      residentMappingActions.classList.remove("hidden");
      residentMappingAccessMessage.style.color = "green";
      residentMappingAccessMessage.textContent =
        "Admin access: you can create and delete resident mappings.";
    } else {
      residentMappingActions.classList.add("hidden");
      residentMappingFormCard.classList.add("hidden");
      residentMappingAccessMessage.style.color = "#475569";
      residentMappingAccessMessage.textContent =
        "View-only mode: only admins can create or delete resident mappings.";
    }
  } catch (error) {
    residentMappingAccessMessage.style.color = "#dc2626";
    residentMappingAccessMessage.textContent = "Server error while loading resident mappings.";
    console.error(error);
  }
}

if (showCreateResidentMappingBtn) {
  showCreateResidentMappingBtn.addEventListener("click", openCreateResidentMappingForm);
}

if (cancelResidentMappingBtn) {
  cancelResidentMappingBtn.addEventListener("click", () => {
    residentMappingFormCard.classList.add("hidden");
    residentMappingFormMessage.textContent = "";
  });
}

if (residentMappingForm) {
  residentMappingForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!isAdmin()) {
      residentMappingFormMessage.style.color = "#dc2626";
      residentMappingFormMessage.textContent = "Only admins can create resident mappings.";
      return;
    }

    const payload = {
      user_id: Number(document.getElementById("mappingUserId").value),
      society_id: Number(document.getElementById("mappingSocietyId").value),
      block_id: Number(document.getElementById("mappingBlockId").value),
      flat_id: Number(document.getElementById("mappingFlatId").value)
    };

    residentMappingFormMessage.style.color = "#475569";
    residentMappingFormMessage.textContent = "Creating resident mapping...";

    try {
      const response = await fetch(`${API_BASE_URL}/resident-flats/`, {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        residentMappingFormMessage.style.color = "#dc2626";
        residentMappingFormMessage.textContent = data.detail || "Failed to create resident mapping.";
        return;
      }

      residentMappingFormMessage.style.color = "green";
      residentMappingFormMessage.textContent = "Resident mapping created successfully!";

      clearResidentMappingForm();
      residentMappingFormCard.classList.add("hidden");
      await loadResidentMappings();
    } catch (error) {
      residentMappingFormMessage.style.color = "#dc2626";
      residentMappingFormMessage.textContent = "Server error while creating resident mapping.";
      console.error(error);
    }
  });
}

async function deleteResidentMapping(mappingId) {
  try {
    const response = await fetch(`${API_BASE_URL}/resident-flats/${mappingId}`, {
      method: "DELETE",
      headers: authHeaders(false)
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.detail || "Failed to delete resident mapping.");
      return;
    }

    await loadResidentMappings();
  } catch (error) {
    alert("Server error while deleting resident mapping.");
    console.error(error);
  }
}

/* =========================================================
   EMERGENCY CONTACTS
========================================================= */
function clearEmergencyContactForm() {
  document.getElementById("emergencyContactId").value = "";
  document.getElementById("contactResidentUserId").value = "";
  document.getElementById("contactName").value = "";
  document.getElementById("contactRelationship").value = "";
  document.getElementById("contactPhone").value = "";
  document.getElementById("contactEmail").value = "";
  document.getElementById("contactPriority").value = "";
  emergencyContactFormMessage.textContent = "";
}

function openCreateEmergencyContactForm() {
  clearEmergencyContactForm();
  emergencyContactFormCard.classList.remove("hidden");
}

function openEditEmergencyContactForm(contact) {
  document.getElementById("emergencyContactId").value = contact.id;
  document.getElementById("contactResidentUserId").value = contact.resident_user_id;
  document.getElementById("contactName").value = contact.contact_name;
  document.getElementById("contactRelationship").value = contact.relationship;
  document.getElementById("contactPhone").value = contact.phone;
  document.getElementById("contactEmail").value = contact.email || "";
  document.getElementById("contactPriority").value = contact.priority_order;
  emergencyContactFormCard.classList.remove("hidden");
}

function renderEmergencyContacts(contacts) {
  if (!contacts.length) {
    emergencyContactList.innerHTML = `<p class="empty-text">No emergency contacts found.</p>`;
    return;
  }

  emergencyContactList.innerHTML = contacts.map(contact => `
    <div class="society-card">
      <div class="society-card-top">
        <div>
          <h3>${contact.contact_name}</h3>
          <p><strong>Relationship:</strong> ${contact.relationship}</p>
        </div>
      </div>

      <div class="society-details">
        <p><strong>Contact ID:</strong> ${contact.id}</p>
        <p><strong>Resident User ID:</strong> ${contact.resident_user_id}</p>
        <p><strong>Phone:</strong> ${contact.phone}</p>
        <p><strong>Email:</strong> ${contact.email || "-"}</p>
        <p><strong>Priority:</strong> ${contact.priority_order}</p>
        <p><strong>Verified:</strong> ${contact.is_verified ? "Yes" : "No"}</p>
      </div>

      <div class="society-btn-row">
        <button class="small-btn edit-emergency-contact-btn" data-id="${contact.id}">Edit</button>
        <button class="small-btn cancel-btn delete-emergency-contact-btn" data-id="${contact.id}">Delete</button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".edit-emergency-contact-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const contactId = Number(btn.dataset.id);
      const contact = contacts.find(c => c.id === contactId);
      if (contact) openEditEmergencyContactForm(contact);
    });
  });

  document.querySelectorAll(".delete-emergency-contact-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const contactId = Number(btn.dataset.id);
      const confirmDelete = confirm("Delete this emergency contact?");
      if (!confirmDelete) return;
      await deleteEmergencyContact(contactId);
    });
  });
}

async function loadEmergencyContacts() {
  emergencyContactAccessMessage.style.color = "#475569";
  emergencyContactAccessMessage.textContent = "Loading emergency contacts...";
  emergencyContactList.innerHTML = "Loading...";

  try {
    const response = await fetch(`${API_BASE_URL}/emergency-contacts/`);
    const contacts = await response.json();

    if (!response.ok) {
      emergencyContactAccessMessage.style.color = "#dc2626";
      emergencyContactAccessMessage.textContent = contacts.detail || "Failed to load contacts.";
      emergencyContactList.innerHTML = "";
      return;
    }

    emergencyContactAccessMessage.style.color = "green";
    emergencyContactAccessMessage.textContent = "Emergency contacts loaded.";
    renderEmergencyContacts(contacts);
  } catch (err) {
    console.error(err);
    emergencyContactAccessMessage.style.color = "#dc2626";
    emergencyContactAccessMessage.textContent = "Server error while loading contacts.";
    emergencyContactList.innerHTML = "";
  }
}

async function deleteEmergencyContact(contactId) {
  try {
    const response = await fetch(`${API_BASE_URL}/emergency-contacts/${contactId}`, {
      method: "DELETE",
      headers: authHeaders(false)
    });

    if (!response.ok) {
      const data = await response.json();
      alert(data.detail || "Failed to delete emergency contact.");
      return;
    }

    await loadEmergencyContacts();
  } catch (error) {
    alert("Server error while deleting emergency contact.");
    console.error(error);
  }
}

if (showCreateEmergencyContactBtn) {
  showCreateEmergencyContactBtn.addEventListener("click", openCreateEmergencyContactForm);
}

if (cancelEmergencyContactBtn) {
  cancelEmergencyContactBtn.addEventListener("click", () => {
    emergencyContactFormCard.classList.add("hidden");
    emergencyContactFormMessage.textContent = "";
  });
}

if (emergencyContactForm) {
  emergencyContactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contactId = document.getElementById("emergencyContactId").value.trim();
    const payload = {
      resident_user_id: Number(document.getElementById("contactResidentUserId").value),
      contact_name: document.getElementById("contactName").value.trim(),
      relationship: document.getElementById("contactRelationship").value.trim(),
      phone: document.getElementById("contactPhone").value.trim(),
      email: document.getElementById("contactEmail").value.trim() || null,
      priority_order: Number(document.getElementById("contactPriority").value)
    };

    const isEdit = !!contactId;
    const url = isEdit
      ? `${API_BASE_URL}/emergency-contacts/${contactId}`
      : `${API_BASE_URL}/emergency-contacts/`;
    const method = isEdit ? "PUT" : "POST";

    emergencyContactFormMessage.style.color = "#475569";
    emergencyContactFormMessage.textContent = isEdit
      ? "Updating emergency contact..."
      : "Creating emergency contact...";

    try {
      const response = await fetch(url, {
        method,
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        emergencyContactFormMessage.style.color = "#dc2626";
        emergencyContactFormMessage.textContent = data.detail || "Failed to save emergency contact.";
        return;
      }

      emergencyContactFormMessage.style.color = "green";
      emergencyContactFormMessage.textContent = isEdit
        ? "Emergency contact updated successfully!"
        : "Emergency contact created successfully!";

      clearEmergencyContactForm();
      emergencyContactFormCard.classList.add("hidden");
      await loadEmergencyContacts();
    } catch (error) {
      emergencyContactFormMessage.style.color = "#dc2626";
      emergencyContactFormMessage.textContent = "Server error while saving emergency contact.";
      console.error(error);
    }
  });
}

/* =========================================================
   CONTACT VERIFICATION / OTP MODULE
========================================================= */
if (generateOtpForm) {
  generateOtpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contactId = Number(generateOtpContactId.value);

    if (!contactId) {
      generateOtpMessage.style.color = "#dc2626";
      generateOtpMessage.textContent = "Please enter a valid Emergency Contact ID.";
      return;
    }

    generateOtpMessage.style.color = "#475569";
    generateOtpMessage.textContent = "Generating OTP...";

    try {
      const response = await fetch(`${API_BASE_URL}/contact-verifications/generate-otp`, {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({
          emergency_contact_id: contactId
        })
      });

      const data = await response.json();

      if (!response.ok) {
        generateOtpMessage.style.color = "#dc2626";
        generateOtpMessage.textContent = data.detail || "Failed to generate OTP.";
        return;
      }

      generateOtpMessage.style.color = "green";
      generateOtpMessage.textContent = `OTP generated successfully. Mock OTP: ${data.otp}`;
    } catch (error) {
      console.error("Generate OTP error:", error);
      generateOtpMessage.style.color = "#dc2626";
      generateOtpMessage.textContent = "Server error while generating OTP.";
    }
  });
}

if (verifyOtpForm) {
  verifyOtpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const contactId = Number(verifyOtpContactId.value);
    const otp = verifyOtpValue.value.trim();

    if (!contactId) {
      verifyOtpMessage.style.color = "#dc2626";
      verifyOtpMessage.textContent = "Please enter a valid Emergency Contact ID.";
      return;
    }

    if (!otp) {
      verifyOtpMessage.style.color = "#dc2626";
      verifyOtpMessage.textContent = "Please enter OTP.";
      return;
    }

    verifyOtpMessage.style.color = "#475569";
    verifyOtpMessage.textContent = "Verifying OTP...";

    try {
      const response = await fetch(`${API_BASE_URL}/contact-verifications/verify-otp`, {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify({
          emergency_contact_id: contactId,
          otp: otp
        })
      });

      const data = await response.json();

      if (!response.ok) {
        verifyOtpMessage.style.color = "#dc2626";
        verifyOtpMessage.textContent = data.detail || "OTP verification failed.";
        return;
      }

      verifyOtpMessage.style.color = "green";
      verifyOtpMessage.textContent = "OTP verified successfully! Contact marked as verified.";

      await loadEmergencyContacts();
    } catch (error) {
      console.error("Verify OTP error:", error);
      verifyOtpMessage.style.color = "#dc2626";
      verifyOtpMessage.textContent = "Server error while verifying OTP.";
    }
  });
}

/* =========================================================
   ALERTS / SOS
========================================================= */
async function loadAlerts() {
  if (!alertsList) return;

  alertsList.innerHTML = `<p class="muted-text">Loading alerts...</p>`;

  try {
    const response = await fetch(`${API_BASE_URL}/emergency-alerts/`);
    const alerts = await response.json();

    if (!response.ok) {
      alertsList.innerHTML = `<p class="error-text">${alerts.detail || "Failed to load alerts."}</p>`;
      return;
    }

    renderAlerts(alerts);
  } catch (error) {
    console.error("Load alerts error:", error);
    alertsList.innerHTML = `<p class="error-text">Server error while loading alerts.</p>`;
  }
}

function renderAlerts(alerts) {
  if (!alertsList) return;

  if (!alerts || alerts.length === 0) {
    alertsList.innerHTML = `<p class="muted-text">No emergency alerts found.</p>`;
    return;
  }

  alertsList.innerHTML = alerts.map(alert => `
    <div class="alert-card">
      <div class="alert-card-top">
        <div>
          <h4>${alert.alert_type}</h4>
          <p><strong>Alert ID:</strong> ${alert.id}</p>
        </div>
        <span class="alert-status-badge">${alert.status}</span>
      </div>

      <div class="alert-details">
        <p><strong>User ID:</strong> ${alert.user_id}</p>
        <p><strong>Message:</strong> ${alert.message}</p>
      </div>
    </div>
  `).join("");
}

if (alertForm) {
  alertForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    alertFormMessage.textContent = "";
    alertFormMessage.style.color = "#dc2626";

    const payload = {
      user_id: Number(alertUserId.value),
      alert_type: alertType.value.trim(),
      message: alertMessage.value.trim()
    };

    if (!payload.user_id || !payload.alert_type || !payload.message) {
      alertFormMessage.textContent = "Please fill all alert fields.";
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/emergency-alerts/`, {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        alertFormMessage.textContent = data.detail || "Failed to create alert.";
        return;
      }

      alertFormMessage.style.color = "green";
      alertFormMessage.textContent = "Emergency alert created successfully!";
      alertForm.reset();
      await loadAlerts();
    } catch (error) {
      console.error("Create alert error:", error);
      alertFormMessage.textContent = "Server error while creating alert.";
    }
  });
}

if (refreshAlertsBtn) {
  refreshAlertsBtn.addEventListener("click", loadAlerts);
}

/* =========================================================
   ROLE ACCESS
========================================================= */
async function loadRoleAccess() {
  if (!roleAccessList) return;

  roleAccessList.innerHTML = `<p class="muted-text">Loading role access data...</p>`;

  try {
    const response = await fetch(`${API_BASE_URL}/role-access/`, {
      headers: authHeaders(false)
    });
    const users = await response.json();

    if (!response.ok) {
      roleAccessList.innerHTML = `<p class="error-text">${users.detail || "Failed to load role access data."}</p>`;
      return;
    }

    renderRoleAccess(users);
  } catch (error) {
    console.error("Load role access error:", error);
    roleAccessList.innerHTML = `<p class="error-text">Server error while loading role access data.</p>`;
  }
}

function renderRoleAccess(users) {
  if (!roleAccessList) return;

  if (!users || users.length === 0) {
    roleAccessList.innerHTML = `<p class="muted-text">No users found.</p>`;
    return;
  }

  roleAccessList.innerHTML = users.map(user => `
    <div class="role-card">
      <div class="role-card-top">
        <div>
          <h4>${user.full_name}</h4>
          <p><strong>User ID:</strong> ${user.user_id}</p>
        </div>
        <span class="role-badge-pill">${user.role_name || "No Role"}</span>
      </div>

      <div class="role-details">
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role ID:</strong> ${user.role_id ?? "-"}</p>
        <p><strong>Role Name:</strong> ${user.role_name ?? "Not assigned"}</p>
      </div>
    </div>
  `).join("");
}

if (roleAssignForm) {
  roleAssignForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    roleAssignMessage.textContent = "";
    roleAssignMessage.style.color = "#dc2626";

    const payload = {
      user_id: Number(roleUserId.value),
      role_id: Number(roleIdInput.value)
    };

    if (!payload.user_id || !payload.role_id) {
      roleAssignMessage.textContent = "Please enter both user ID and role ID.";
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/role-access/assign-role`, {
        method: "POST",
        headers: authHeaders(true),
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        roleAssignMessage.textContent = data.detail || "Failed to assign role.";
        return;
      }

      roleAssignMessage.style.color = "green";
      roleAssignMessage.textContent = "Role assigned/updated successfully!";
      roleAssignForm.reset();
      await loadRoleAccess();
    } catch (error) {
      console.error("Assign role error:", error);
      roleAssignMessage.textContent = "Server error while assigning role.";
    }
  });
}

if (refreshRolesBtn) {
  refreshRolesBtn.addEventListener("click", loadRoleAccess);
}



/* =========================================================
   NAVIGATION
========================================================= */
if (dashboardBtn) {
  dashboardBtn.addEventListener("click", async () => {
    setActiveButton(dashboardBtn);
    pageTitle.textContent = "Dashboard";
    showOnlySection(dashboardSection);
    await loadDashboardSummary();
  });
}

if (profileBtn) {
  profileBtn.addEventListener("click", async () => {
    setActiveButton(profileBtn);
    pageTitle.textContent = "Profile";
    showOnlySection(profileSection);
    editProfileCard.classList.add("hidden");
    await loadProfile();
  });
}

if (societiesBtn) {
  societiesBtn.addEventListener("click", async () => {
    setActiveButton(societiesBtn);
    pageTitle.textContent = "Societies";
    showOnlySection(societiesSection);
    await ensureRoleLoaded();
    await loadSocieties();
  });
}

if (blocksBtn) {
  blocksBtn.addEventListener("click", async () => {
    setActiveButton(blocksBtn);
    pageTitle.textContent = "Blocks";
    showOnlySection(blocksSection);
    await ensureRoleLoaded();
    await loadBlocks();
  });
}

if (flatsBtn) {
  flatsBtn.addEventListener("click", async () => {
    setActiveButton(flatsBtn);
    pageTitle.textContent = "Flats";
    showOnlySection(flatsSection);
    await ensureRoleLoaded();
    await loadFlats();
  });
}

if (residentMappingBtn) {
  residentMappingBtn.addEventListener("click", async () => {
    setActiveButton(residentMappingBtn);
    pageTitle.textContent = "Resident to Flat Mapping";
    showOnlySection(residentMappingSection);
    await ensureRoleLoaded();
    await loadResidentMappings();
  });
}

if (emergencyContactsBtn) {
  emergencyContactsBtn.addEventListener("click", async () => {
    setActiveButton(emergencyContactsBtn);
    pageTitle.textContent = "Emergency Contacts";
    showOnlySection(emergencyContactsSection);
    await loadEmergencyContacts();
  });
}

if (contactVerificationBtn) {
  contactVerificationBtn.addEventListener("click", () => {
    setActiveButton(contactVerificationBtn);
    showOnlySection(contactVerificationSection);
    pageTitle.textContent = "Contact Verification";
  });
}

if (alertsBtn) {
  alertsBtn.addEventListener("click", async () => {
    setActiveButton(alertsBtn);
    showOnlySection(alertsSection);
    pageTitle.textContent = "Alerts / SOS";
    await loadAlerts();
  });
}

if (roleAccessBtn) {
  roleAccessBtn.addEventListener("click", async () => {
    setActiveButton(roleAccessBtn);
    showOnlySection(roleAccessSection);
    pageTitle.textContent = "Role & Access";
    await loadRoleAccess();
  });
}

/* =========================================================
   LOGOUT
========================================================= */
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_email");
    window.location.href = "login.html";
  });
}

/* =========================================================
   DEFAULT LOAD
========================================================= */


async function loadDashboardSummary() {
  try {
    const response = await fetch(`${API_BASE_URL}/dashboard/summary`);
    const data = await response.json();

    if (!response.ok) {
      console.error("Failed to load dashboard summary", data);
      return;
    }

    if (totalUsersCard) totalUsersCard.textContent = data.total_users;
    if (totalSocietiesCard) totalSocietiesCard.textContent = data.total_societies;
    if (totalBlocksCard) totalBlocksCard.textContent = data.total_blocks;
    if (totalFlatsCard) totalFlatsCard.textContent = data.total_flats;
    if (totalResidentMappingsCard) totalResidentMappingsCard.textContent = data.total_resident_mappings;
    if (totalEmergencyContactsCard) totalEmergencyContactsCard.textContent = data.total_emergency_contacts;
    if (totalEmergencyAlertsCard) totalEmergencyAlertsCard.textContent = data.total_emergency_alerts;
    if (verifiedContactsCard) verifiedContactsCard.textContent = data.verified_contacts;

  } catch (error) {
    console.error("Dashboard summary error:", error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  setActiveButton(dashboardBtn);
  pageTitle.textContent = "Dashboard";
  showOnlySection(dashboardSection);
  await loadProfile();
  await loadDashboardSummary();
});




function applyRoleBasedUI() {
  const adminOnlySelectors = [
    "#societyFormCard",
    "#blockFormCard",
    "#flatFormCard",
    "#residentMappingFormCard",
    "#roleAssignCard"
  ];

  adminOnlySelectors.forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el) return;

    if (isAdmin()) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  });

  const adminOnlyNavButtons = [
    societiesBtn,
    blocksBtn,
    flatsBtn,
    roleAccessBtn
  ];

  adminOnlyNavButtons.forEach((btn) => {
    if (!btn) return;

    if (isAdmin()) {
      btn.classList.remove("hidden");
    } else {
      btn.classList.add("hidden");
    }
  });

  const residentMappingNote = document.getElementById("residentMappingNote");
  if (residentMappingNote) {
    residentMappingNote.textContent = isAdmin()
      ? "Admin can create or delete resident mappings."
      : "View-only mode: only admins can create or delete resident mappings.";
  }
}


if (sosBtn) {

    sosBtn.addEventListener("click", async () => {

        pageTitle.textContent = "SOS Monitoring";

        setActiveButton(sosBtn);

        showOnlySection(sosSection);

        await loadSOSAlerts();

    });

}

// =========================================================
// M3 NAVIGATION
// =========================================================

if (incidentBtn) {
  incidentBtn.addEventListener("click", async () => {
    setActiveButton(incidentBtn);
    pageTitle.textContent = "Incident Management";
    showOnlySection(incidentSection);

    await loadIncidents();
  });
}

if (escalationBtn) {
  escalationBtn.addEventListener("click", () => {
    setActiveButton(escalationBtn);
    pageTitle.textContent = "Escalation Status";
    showOnlySection(escalationSection);
  });
}

if (volunteerBtn) {
  volunteerBtn.addEventListener("click", () => {
    setActiveButton(volunteerBtn);
    pageTitle.textContent = "Volunteer Response";
    showOnlySection(volunteerSection);

    const volunteerIdInput =
      document.getElementById("volunteerId");

    if (volunteerIdInput && userId) {
      volunteerIdInput.value = userId;
    }
  });
}


// =========================================================
// M3 - LOAD INCIDENTS
// =========================================================

async function loadIncidents() {

  const incidentList =
    document.getElementById("incidentList");

  if (!incidentList) return;

  incidentList.innerHTML = "Loading incidents...";

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/sos/`,
      {
        headers: authHeaders(false)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      incidentList.innerHTML =
        `<p>Failed to load incidents.</p>`;
      return;
    }

    if (!data.length) {
      incidentList.innerHTML =
        `<p>No incidents found.</p>`;
      return;
    }

    incidentList.innerHTML = data
      .slice()
      .reverse()
      .map(incident => `

        <div class="profile-card" style="margin-top:15px;">

          <h3>
            Incident #${incident.id}
          </h3>

          <p>
            <strong>Emergency:</strong>
            ${safeText(incident.emergency_type)}
          </p>

          <p>
            <strong>Resident:</strong>
            ${incident.resident_id}
          </p>

          <p>
            <strong>Block:</strong>
            ${incident.block_id}
          </p>

          <p>
            <strong>Flat:</strong>
            ${incident.flat_id}
          </p>

          <p>
            <strong>Status:</strong>
            ${safeText(incident.status)}
          </p>

          <p>
            <strong>Message:</strong>
            ${safeText(incident.emergency_message)}
          </p>

          <button
            class="small-btn"
            onclick="viewIncident(${incident.id})"
          >
            View Incident
          </button>

        </div>

      `)
      .join("");

  } catch (error) {

    console.error(error);

    incidentList.innerHTML =
      `<p>Server error while loading incidents.</p>`;

  }
}

// =========================================================
// M3 - VOLUNTEER RESPONSE
// =========================================================

const volunteerOnlineBtn =
  document.getElementById("volunteerOnlineBtn");

const volunteerOfflineBtn =
  document.getElementById("volunteerOfflineBtn");

const volunteerAvailabilityMessage =
  document.getElementById("volunteerAvailabilityMessage");

const volunteerIncidentId =
  document.getElementById("volunteerIncidentId");

const loadAssignmentBtn =
  document.getElementById("loadAssignmentBtn");

const autoAssignBtn =
  document.getElementById("autoAssignBtn");

const volunteerAssignment =
  document.getElementById("volunteerAssignment");

const volunteerResponseButtons =
  document.getElementById("volunteerResponseButtons");

const acceptIncidentBtn =
  document.getElementById("acceptIncidentBtn");

const rejectIncidentBtn =
  document.getElementById("rejectIncidentBtn");

const volunteerResponseMessage =
  document.getElementById("volunteerResponseMessage");

// =========================================================
// M3 - ESCALATION STATUS
// =========================================================

const escalationIncidentId =
  document.getElementById("escalationIncidentId");

const checkEscalationBtn =
  document.getElementById("checkEscalationBtn");

const startEscalationBtn =
  document.getElementById("startEscalationBtn");

const nextEscalationBtn =
  document.getElementById("nextEscalationBtn");

const escalationMessage =
  document.getElementById("escalationMessage");

const escalationStatusCard =
  document.getElementById("escalationStatusCard");

const escalationStatus =
  document.getElementById("escalationStatus");

const escalationLogs =
  document.getElementById("escalationLogs");


// =========================================================
// LOAD ESCALATION STATUS
// =========================================================

async function loadEscalationStatus() {

  const incidentId = Number(escalationIncidentId.value);

  if (!incidentId) {
    escalationMessage.textContent =
      "Enter Incident ID.";
    return;
  }

  escalationMessage.textContent =
    "Loading escalation status...";

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/escalation/${incidentId}`
    );

    const data = await response.json();

    if (!response.ok) {
      escalationMessage.textContent =
        typeof data.detail === "string"
          ? data.detail
          : "Unable to load escalation.";
      return;
    }

    escalationStatusCard.classList.remove("hidden");

    escalationStatus.innerHTML = `

      <p>
        <strong>Incident ID:</strong>
        ${incidentId}
      </p>

      <p>
        <strong>Incident Status:</strong>
        ${safeText(data.incident_status)}
      </p>

      <p>
        <strong>Current Level:</strong>
        ${data.current_level}
      </p>

      <p>
        <strong>Current Stage:</strong>
        ${safeText(data.current_stage)}
      </p>

      <p>
        <strong>Escalation Count:</strong>
        ${data.escalation_count}
      </p>

    `;

    renderEscalationLogs(data.logs || []);

    escalationMessage.textContent =
      "Escalation status loaded.";

  } catch (error) {

    console.error(error);

    escalationMessage.textContent =
      "Server error.";

  }
}


// =========================================================
// RENDER ESCALATION LOGS
// =========================================================

function renderEscalationLogs(logs) {

  if (!logs.length) {

    escalationLogs.innerHTML =
      "<p>No escalation logs yet.</p>";

    return;
  }

  escalationLogs.innerHTML = logs.map(log => {

    let levelName = "Unknown";

    switch (log.escalation_level) {

      case 1:
        levelName = "Guardian";
        break;

      case 2:
        levelName = "Security";
        break;

      case 3:
        levelName = "Volunteer";
        break;

      case 4:
        levelName = "Emergency Contact";
        break;
    }

    return `

      <div
        style="
          padding:12px;
          margin-top:10px;
          border:1px solid #e2e8f0;
          border-radius:8px;
        "
      >

        <strong>
          Level ${log.escalation_level}
          - ${levelName}
        </strong>

        <p>
          Escalated To:
          ${log.escalated_to}
        </p>

        <p>
          Time:
          ${
            log.escalated_at
              ? new Date(log.escalated_at).toLocaleString()
              : "-"
          }
        </p>

      </div>

    `;

  }).join("");
}


// =========================================================
// CHECK ESCALATION
// =========================================================

if (checkEscalationBtn) {

  checkEscalationBtn.addEventListener(
    "click",
    loadEscalationStatus
  );

}


// =========================================================
// START ESCALATION
// =========================================================

if (startEscalationBtn) {

  startEscalationBtn.addEventListener(
    "click",
    async () => {

      const incidentId =
        Number(escalationIncidentId.value);

      if (!incidentId) {

        escalationMessage.textContent =
          "Enter Incident ID.";

        return;
      }

      escalationMessage.textContent =
        "Starting escalation...";

      try {

        const response = await fetch(
          `${API_BASE_URL}/api/escalation/start/${incidentId}`,
          {
            method: "POST"
          }
        );

        const data = await response.json();

        if (!response.ok) {

          escalationMessage.textContent =
            typeof data.detail === "string"
              ? data.detail
              : "Unable to start escalation.";

          return;
        }

        escalationMessage.textContent =
          `Escalation started → ${data.current_level}`;

        await loadEscalationStatus();

      } catch (error) {

        console.error(error);

        escalationMessage.textContent =
          "Server error.";

      }

    }
  );

}


// =========================================================
// NEXT ESCALATION LEVEL
// =========================================================

if (nextEscalationBtn) {

  nextEscalationBtn.addEventListener(
    "click",
    async () => {

      const incidentId =
        Number(escalationIncidentId.value);

      if (!incidentId) {

        escalationMessage.textContent =
          "Enter Incident ID.";

        return;
      }

      escalationMessage.textContent =
        "Escalating...";

      try {

        const response = await fetch(
          `${API_BASE_URL}/api/escalation/next/${incidentId}`,
          {
            method: "POST"
          }
        );

        const data = await response.json();

        if (!response.ok) {

          escalationMessage.textContent =
            typeof data.detail === "string"
              ? data.detail
              : "Unable to escalate.";

          return;
        }

        escalationMessage.textContent =
          data.current_level
            ? `Escalated → ${data.current_level}`
            : data.message;

        await loadEscalationStatus();

      } catch (error) {

        console.error(error);

        escalationMessage.textContent =
          "Server error.";

      }

    }
  );

}

// =========================================================
// M3 - INCIDENT LIFECYCLE
// =========================================================

const markInProgressBtn =
  document.getElementById("markInProgressBtn");

const resolveIncidentBtn =
  document.getElementById("resolveIncidentBtn");

const closeIncidentBtn =
  document.getElementById("closeIncidentBtn");

const incidentMessage =
  document.getElementById("incidentMessage");

const timelineCard =
  document.getElementById("timelineCard");

const incidentTimeline =
  document.getElementById("incidentTimeline");


// =========================================================
// UPDATE INCIDENT STATUS
// =========================================================

async function updateIncidentStatus(status) {

  const incidentId = window.currentIncidentId;

  if (!incidentId) {
    incidentMessage.textContent =
      "Select an incident first.";
    return;
  }

  incidentMessage.textContent =
    "Updating incident...";

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/incidents/${incidentId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          status: status
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {

      incidentMessage.textContent =
        typeof data.detail === "string"
          ? data.detail
          : "Unable to update incident.";

      return;
    }

    incidentMessage.textContent =
      `✅ Incident status updated to ${status}`;

    await viewIncident(incidentId);

    await loadIncidentTimeline(incidentId);

  } catch (error) {

    console.error(error);

    incidentMessage.textContent =
      "Server error.";

  }
}


async function loadIncidentClosure(incidentId) {
  const closureBox = document.getElementById("incidentClosure");

  if (!closureBox) return;

  closureBox.innerHTML = "Loading closure details...";

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/incidents/${incidentId}/closure`,
      {
        headers: authHeaders(false)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      closureBox.innerHTML = "";
      return;
    }

    closureBox.innerHTML = `
      <div class="profile-card" style="margin-top:20px;">
        <h3>Closure Documentation</h3>

        <p>
          <strong>Resolution Summary:</strong>
          ${safeText(data.resolution_summary)}
        </p>

        <p>
          <strong>Closed By:</strong>
          ${safeText(data.closed_by_name)}
          (ID: ${data.closed_by})
        </p>

        <p>
          <strong>Closed At:</strong>
          ${new Date(data.closed_at).toLocaleString()}
        </p>

        <p>
          <strong>Remarks:</strong>
          ${safeText(data.remarks) || "-"}
        </p>

        <p>
          <strong>Status:</strong>
          ${safeText(data.status)}
        </p>
      </div>
    `;

  } catch (error) {
    console.error(error);
    closureBox.innerHTML = "";
  }
}

// =========================================================
// ASSISTANCE STARTED
// =========================================================

if (markInProgressBtn) {

  markInProgressBtn.addEventListener(
    "click",
    async () => {

      await updateIncidentStatus("In Progress");

    }
  );

}


// =========================================================
// RESOLVE INCIDENT
// =========================================================

if (resolveIncidentBtn) {

  resolveIncidentBtn.addEventListener(
    "click",
    async () => {

      const incidentId = window.currentIncidentId;

      if (!incidentId) {

        incidentMessage.textContent =
          "Select an incident first.";

        return;
      }

      const confirmed = confirm(
        `Mark Incident #${incidentId} as resolved?`
      );

      if (!confirmed) return;

      incidentMessage.textContent =
        "Resolving incident...";

      try {

        const response = await fetch(
         `${API_BASE_URL}/api/incidents/${incidentId}/resolve?performed_by=${userId}`,
          {
            method: "POST"
          }
        );

        const data = await response.json();

        if (!response.ok) {

          incidentMessage.textContent =
            typeof data.detail === "string"
              ? data.detail
              : "Unable to resolve incident.";

          return;
        }

        incidentMessage.textContent =
          "✅ Incident Resolved";

        await viewIncident(incidentId);

        await loadIncidentTimeline(incidentId);

      } catch (error) {

        console.error(error);

        incidentMessage.textContent =
          "Server error.";

      }

    }
  );

}


// =========================================================
// CLOSE INCIDENT
// =========================================================

if (closeIncidentBtn) {

  closeIncidentBtn.addEventListener("click", async () => {

    const incidentId = window.currentIncidentId;

    if (!incidentId) {
      incidentMessage.textContent =
        "Select an incident first.";
      return;
    }

    const resolutionSummary = prompt(
      "Enter resolution summary:"
    );

    if (resolutionSummary === null) return;

    if (!resolutionSummary.trim()) {
      incidentMessage.textContent =
        "Resolution summary is required.";
      return;
    }

    const remarks = prompt(
      "Enter optional remarks:"
    ) || "";

    incidentMessage.textContent =
      "Closing incident...";

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/incidents/${incidentId}/close`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            resolution_summary: resolutionSummary.trim(),
            closed_by: Number(userId),
            remarks: remarks.trim()
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {

        console.error("Close error:", data);

        incidentMessage.textContent =
          typeof data.detail === "string"
            ? data.detail
            : "Unable to close incident.";

        return;
      }

      incidentMessage.textContent =
        "✅ Incident Closed Successfully";

      await viewIncident(incidentId);
      await loadIncidentTimeline(incidentId);
      await loadIncidents();

    } catch (error) {

      console.error(error);

      incidentMessage.textContent =
        "Server error while closing incident.";

    }

  });

}


// =========================================================
// INCIDENT TIMELINE / HISTORY
// =========================================================

async function loadIncidentTimeline(incidentId) {

  if (!incidentTimeline || !timelineCard) return;

  timelineCard.classList.remove("hidden");

  incidentTimeline.innerHTML =
    "Loading timeline...";

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/incidents/${incidentId}/history`
    );

    const data = await response.json();

    if (!response.ok) {

      incidentTimeline.innerHTML =
        "<p>Unable to load incident history.</p>";

      return;
    }

    // Handles either direct array OR { history: [...] }
    const history =
      Array.isArray(data)
        ? data
        : (data.history || data.timeline || []);

    if (!history.length) {

      incidentTimeline.innerHTML =
        "<p>No timeline events recorded yet.</p>";

      return;
    }

    incidentTimeline.innerHTML =
      history.map(event => {

        const action =
          event.action ||
          event.status ||
          event.event ||
          "Incident Updated";

        const performedBy =
          event.performed_by ?? "-";

        const timestamp =
          event.timestamp ||
          event.created_at ||
          event.action_at;

        return `

          <div
            style="
              padding:14px;
              margin-bottom:10px;
              border-left:4px solid #2563eb;
              background:#f8fafc;
              border-radius:6px;
            "
          >

            <strong>
              ${safeText(action)}
            </strong>

            <p style="margin:6px 0 0;">
              Performed By:
              ${safeText(performedBy)}
            </p>

            <small>
              ${
                timestamp
                  ? new Date(timestamp).toLocaleString()
                  : "-"
              }
            </small>

          </div>

        `;

      }).join("");

  } catch (error) {

    console.error(error);

    incidentTimeline.innerHTML =
      "<p>Server error loading timeline.</p>";

  }
}
// =========================================================
// UPDATE VOLUNTEER AVAILABILITY
// =========================================================

async function updateVolunteerAvailability(isAvailable) {

  const volunteerId =
    Number(document.getElementById("volunteerId").value);

  if (!volunteerId) {
    volunteerAvailabilityMessage.textContent =
      "Enter Volunteer ID.";
    return;
  }

  volunteerAvailabilityMessage.textContent =
    "Updating availability...";

  try {

        const response = await fetch(
      `${API_BASE_URL}/api/volunteer/availability/${volunteerId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          volunteer_id: volunteerId,
          is_available: isAvailable
        })
      }
    );
    const data = await response.json();

    if (!response.ok) {
      volunteerAvailabilityMessage.textContent =
        data.detail || "Unable to update availability.";
      return;
    }

    volunteerAvailabilityMessage.textContent =
      isAvailable
        ? "🟢 Volunteer is ONLINE and receiving emergency requests."
        : "⚫ Volunteer is OFFLINE.";

  } catch (error) {

    console.error(error);

    volunteerAvailabilityMessage.textContent =
      "Server error.";

  }
}

if (volunteerOnlineBtn) {

  volunteerOnlineBtn.addEventListener("click", () => {
    updateVolunteerAvailability(true);
  });

}


if (volunteerOfflineBtn) {

  volunteerOfflineBtn.addEventListener("click", () => {
    updateVolunteerAvailability(false);
  });

}


// =========================================================
// AUTO ASSIGN VOLUNTEER
// =========================================================

if (autoAssignBtn) {

  autoAssignBtn.addEventListener("click", async () => {

    const incidentId = Number(volunteerIncidentId.value);

    if (!incidentId) {
      volunteerResponseMessage.textContent =
        "Enter Incident ID.";
      return;
    }

    volunteerResponseMessage.textContent =
      "Assigning volunteer...";

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/incidents/${incidentId}/auto-assign`,
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        volunteerResponseMessage.textContent =
          data.detail || "Auto assignment failed.";
        return;
      }

      volunteerResponseMessage.textContent =
        "Volunteer assigned successfully.";

      await loadVolunteerAssignment();

    } catch (error) {

      console.error(error);

      volunteerResponseMessage.textContent =
        "Server error.";

    }

  });

}


// =========================================================
// LOAD ASSIGNMENT
// =========================================================

async function loadVolunteerAssignment() {

  const incidentId = Number(volunteerIncidentId.value);

  if (!incidentId) {
    volunteerResponseMessage.textContent =
      "Enter Incident ID.";
    return;
  }

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/incidents/${incidentId}/assigned`
    );

    const data = await response.json();

    if (!response.ok) {

      volunteerAssignment.innerHTML =
        "No assignment found.";

      volunteerResponseButtons.classList.add("hidden");

      volunteerResponseMessage.textContent =
        data.detail || "";

      return;
    }

    volunteerAssignment.innerHTML = `

      <h3>Assigned Incident</h3>

      <p>
        <strong>Incident ID:</strong>
        ${data.sos_alert_id}
      </p>

      <p>
        <strong>Volunteer ID:</strong>
        ${data.responder_id}
      </p>

      <p>
        <strong>Role:</strong>
        ${safeText(data.responder_role)}
      </p>

      <p>
        <strong>Status:</strong>
        ${safeText(data.status)}
      </p>

      <p>
        <strong>Assigned At:</strong>
        ${new Date(data.assigned_at).toLocaleString()}
      </p>

    `;

    volunteerResponseButtons.classList.remove("hidden");

  } catch (error) {

    console.error(error);

    volunteerResponseMessage.textContent =
      "Server error.";

  }
}


if (loadAssignmentBtn) {
  loadAssignmentBtn.addEventListener(
    "click",
    loadVolunteerAssignment
  );
}


// =========================================================
// ACCEPT INCIDENT
// =========================================================

if (acceptIncidentBtn) {

  acceptIncidentBtn.addEventListener("click", async () => {

    const incidentId = Number(volunteerIncidentId.value);

    if (!incidentId) return;

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/incidents/${incidentId}/accept`,
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        volunteerResponseMessage.textContent =
          data.detail || "Unable to accept incident.";
        return;
      }

      volunteerResponseMessage.textContent =
        "✅ Incident accepted. Response In Progress.";

      await loadVolunteerAssignment();

    } catch (error) {

      console.error(error);

      volunteerResponseMessage.textContent =
        "Server error.";

    }

  });

}


// =========================================================
// REJECT INCIDENT
// =========================================================

if (rejectIncidentBtn) {

  rejectIncidentBtn.addEventListener("click", async () => {

    const incidentId = Number(volunteerIncidentId.value);

    if (!incidentId) return;

    try {

      const response = await fetch(
        `${API_BASE_URL}/api/incidents/${incidentId}/reject`,
        {
          method: "POST"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        volunteerResponseMessage.textContent =
          data.detail || "Unable to reject incident.";
        return;
      }

      volunteerResponseMessage.textContent =
        "Incident declined. Incident reopened.";

      await loadVolunteerAssignment();

    } catch (error) {

      console.error(error);

      volunteerResponseMessage.textContent =
        "Server error.";

    }

  });

}




async function viewIncident(id) {

  const card =
    document.getElementById("incidentDetailsCard");

  const details =
    document.getElementById("incidentDetails");

  if (!card || !details) return;

  card.classList.remove("hidden");

  details.innerHTML = "Loading...";

  try {

    const response = await fetch(
      `${API_BASE_URL}/api/sos/${id}`,
      {
        headers: authHeaders(false)
      }
    );

    const incident = await response.json();

    if (!response.ok) {
      details.innerHTML = "Unable to load incident.";
      return;
    }

    window.currentIncidentId = id;

    details.innerHTML = `

      <h3>Incident #${incident.id}</h3>

      <p>
        <strong>Resident ID:</strong>
        ${incident.resident_id}
      </p>

      <p>
        <strong>Emergency:</strong>
        ${safeText(incident.emergency_type)}
      </p>

      <p>
        <strong>Location:</strong>
        Block ${incident.block_id} -
        Flat ${incident.flat_id}
      </p>

      <p>
        <strong>Status:</strong>
        ${safeText(incident.status)}
      </p>

      <p>
        <strong>Message:</strong>
        ${safeText(incident.emergency_message)}
      </p>

      <p>
        <strong>Created:</strong>
        ${new Date(incident.created_at).toLocaleString()}
      </p>

    `;

    // Load timeline AFTER incident loads successfully
    await loadIncidentTimeline(id);

    await loadIncidentClosure(id);

  } catch (error) {

    console.error(error);
    details.innerHTML = "Server error.";

  }
}



if (sosForm) {

    sosForm.addEventListener("submit", async (e) => {

        e.preventDefault();

              const body = {

            resident_id: Number(sosResidentId.value),

            emergency_type: sosEmergencyType.value,

            emergency_message:

                `${sosMessage.value}

        People Involved : ${document.getElementById("peopleCount").value}

        Need Ambulance : ${document.getElementById("needAmbulance").value}`

        };

        try {

                        const confirmSOS = confirm(

              `Emergency Type : ${sosEmergencyType.value}

              Do you really want to send SOS?`

              );

              if(!confirmSOS){

                  return;

              }

            const response = await fetch(`${API_BASE_URL}/api/sos/`, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(body)

            });

            const data = await response.json();

            if (!response.ok) {

                sosMessageBox.textContent = data.detail;

                return;

            }

            sosMessageBox.textContent = "SOS Created Successfully.";

            sosForm.reset();

            loadSOSAlerts();

        }

        catch {

            sosMessageBox.textContent = "Server Error";

        }

    });

}

if (refreshSOSBtn) {

    refreshSOSBtn.addEventListener("click", loadSOSAlerts);

}

async function loadSOSAlerts() {

    try {

        const response = await fetch(`${API_BASE_URL}/api/sos/`);

        const alerts = await response.json();

        if (!response.ok) {

            sosList.innerHTML = "Unable to load alerts.";

            return;

        }

        renderSOSAlerts(alerts);

    }

    catch {

        sosList.innerHTML = "Server Error";

    }

}

function renderSOSAlerts(alerts) {

    sosList.innerHTML = "";

    alerts.forEach(alert => {

        const card = document.createElement("div");

        card.className = "sos-card";

        let statusClass = "";

        switch (alert.status) {

            case "Open":

                statusClass = "status-open";

                break;

            case "Received":

                statusClass = "status-received";

                break;

            case "In Progress":

                statusClass = "status-inprogress";

                break;

            case "Resolved":

                statusClass = "status-resolved";

                break;

            default:

                statusClass = "status-cancelled";

        }

        card.innerHTML = `

            <h4>${alert.emergency_type}</h4>

            <p><strong>Resident :</strong> ${alert.resident_id}</p>

            <p><strong>Society :</strong> ${alert.society_id}</p>

            <p><strong>Block :</strong> ${alert.block_id}</p>

            <p><strong>Flat :</strong> ${alert.flat_id}</p>

            <p><strong>Message :</strong> ${alert.emergency_message || "-"}</p>

            <span class="sos-status ${statusClass}">
                ${alert.status}
            </span>

        `;

        sosList.appendChild(card);

    });

}

languageSelect.addEventListener("change", (e)=>{

    changeLanguage(e.target.value);

    localStorage.setItem(
        "language",
        e.target.value
    );

});

const savedLanguage =
    localStorage.getItem("language") || "en";

languageSelect.value = savedLanguage;

changeLanguage(savedLanguage);