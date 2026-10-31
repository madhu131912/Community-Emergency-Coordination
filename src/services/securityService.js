import api from './api';

export const getIncidents = async () => {
  const response = await api.get('/security/incidents');
  return response.data;
};

export const updateIncidentStatus = async (id, status) => {
  const response = await api.put(`/security/incidents/${id}`, {
    status,
  });

  return response.data;
};