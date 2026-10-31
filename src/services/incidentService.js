import api from './api';

// =========================================
// GET ASSIGNED INCIDENT
// =========================================
export const getAssignedIncident = async (incidentId) => {
  const response = await api.get(
    `/api/incidents/${incidentId}/assigned`
  );

  return response.data;
};

// =========================================
// ACCEPT INCIDENT
// =========================================
export const acceptIncident = async (incidentId) => {
  const response = await api.post(
    `/api/incidents/${incidentId}/accept`
  );

  return response.data;
};

// =========================================
// REJECT INCIDENT
// =========================================
export const rejectIncident = async (incidentId) => {
  const response = await api.post(
    `/api/incidents/${incidentId}/reject`
  );

  return response.data;
};

// =========================================
// COMPLETE / RESOLVE INCIDENT
// =========================================

// =========================================
// INCIDENT DETAILS
// =========================================
export const getIncidentDetails = async (incidentId) => {
  const response = await api.get(
    `/api/incidents/${incidentId}`
  );

  return response.data;
};

// =========================================
// INCIDENT TIMELINE
// =========================================
export const getIncidentHistory = async (incidentId) => {
  const response = await api.get(
    `/api/incidents/${incidentId}/history`
  );

  return response.data;
};

// =========================================
// INCIDENT CLOSURE
// =========================================
export const getIncidentClosure = async (incidentId) => {
  const response = await api.get(
    `/api/incidents/${incidentId}/closure`
  );

  return response.data;
};

// =========================================
// ESCALATION STATUS
// =========================================
export const getEscalationStatus = async (incidentId) => {
  const response = await api.get(
    `/api/escalation/${incidentId}`
  );

  return response.data;
};
// =========================================
// COMPLETE / RESOLVE INCIDENT
// =========================================
export const completeIncident = async (incidentId, performedBy) => {
  const response = await api.post(
    `/api/incidents/${incidentId}/resolve?performed_by=${performedBy}`
  );

  return response.data;
};

// =========================================
// INCIDENT ACTION
// =========================================
export const incidentAction = async (
  incidentId,
  action,
  performedBy
) => {

  const response = await api.post(
    `/api/incidents/${incidentId}/action`,
    {
      action,
      performed_by: performedBy,
    }
  );

  return response.data;

};