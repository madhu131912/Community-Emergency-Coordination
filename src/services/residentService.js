import api from './api';

export const getResidentDetails = async () => {
  const response = await api.get('/resident/profile');
  return response.data;
};

export const getRecentAlerts = async () => {
  const response = await api.get('/alerts');
  return response.data;
};