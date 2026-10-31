import api from './api';

// Get all SOS alerts
export const getVolunteerEmergencies = async () => {
  const response = await api.get('/api/sos/');
  return response.data;
};

// Accept Incident
export const acceptIncident = async (incidentId) => {
  const response = await api.post(
    `/api/incidents/${incidentId}/accept`
  );

  return response.data;
};

// Reject Incident
export const rejectIncident = async (incidentId) => {
  const response = await api.post(
    `/api/incidents/${incidentId}/reject`
  );

  return response.data;
};