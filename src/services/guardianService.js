import api from './api';

export const getGuardianRequests = async () => {
  const response = await api.get('/api/sos/');
  return response.data;
};

export const updateSOSStatus = async (id, status) => {
  const response = await api.patch(`/api/sos/${id}/status`, {
    status,
  });
  return response.data;
};