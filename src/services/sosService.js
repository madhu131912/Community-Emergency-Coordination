import api from './api';

// Create SOS
export const createSOS = async (data) => {
  const response = await api.post('/api/sos/', data);
  return response.data;
};

// Get SOS History
export const getSOSHistory = async () => {
  const response = await api.get('/api/sos/');
  return response.data;
};

// Update SOS Status (Accept / Reject)
export const updateSOSStatus = async (alertId, status) => {
  const response = await api.patch(
    `/api/sos/${alertId}/status`,
    {
      status: status,
    }
  );

  return response.data;
};