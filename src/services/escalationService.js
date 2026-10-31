import api from './api';

// ==============================================
// START ESCALATION
// ==============================================
export const startEscalation = async (incidentId) => {
  const response = await api.post(
    `/api/escalation/start/${incidentId}`
  );

  return response.data;
};

// ==============================================
// NEXT ESCALATION LEVEL
// ==============================================
export const nextEscalation = async (incidentId) => {
  const response = await api.post(
    `/api/escalation/next/${incidentId}`
  );

  return response.data;
};

// ==============================================
// STOP ESCALATION
// ==============================================
export const stopEscalation = async (incidentId) => {
  const response = await api.post(
    `/api/escalation/stop/${incidentId}`
  );

  return response.data;
};

// ==============================================
// GET ESCALATION STATUS
// ==============================================
export const getEscalation = async (incidentId) => {
  const response = await api.get(
    `/api/escalation/${incidentId}`
  );

  return response.data;
};

// ==============================================
// GET ESCALATION LOGS
// ==============================================
export const getEscalationLogs = async (incidentId) => {
  const response = await api.get(
    `/api/escalation/logs/${incidentId}`
  );

  return response.data;
};