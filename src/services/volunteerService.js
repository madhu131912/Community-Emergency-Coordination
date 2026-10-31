import api from './api';

// ======================================================
// Volunteer Availability
// ======================================================

export const getVolunteerAvailability = async (volunteerId) => {
  const response = await api.get(
    `/api/volunteer/availability/${volunteerId}`
  );

  return response.data;
};

export const updateVolunteerAvailability = async (
  volunteerId,
  is_available
) => {
  const response = await api.put(
    `/api/volunteer/availability/${volunteerId}`,
    {
      volunteer_id: volunteerId,
      is_available,
    }
  );

  return response.data;
};