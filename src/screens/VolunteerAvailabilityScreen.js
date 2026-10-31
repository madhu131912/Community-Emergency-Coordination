import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { getUserId } from '../utils/storage';

import {
  getVolunteerAvailability,
  updateVolunteerAvailability,
} from '../services/volunteerService';

export default function VolunteerAvailabilityScreen() {
  const { t } = useTranslation();

  const [volunteerId, setVolunteerId] = useState(null);

  const [available, setAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

      useEffect(() => {
      initializeVolunteer();
    }, []);

    const initializeVolunteer = async () => {
      try {
        const storedUserId = await getUserId();

        if (!storedUserId) {
          Alert.alert(t('common.error'), t('volunteer.loggedOut'));
          setLoading(false);
          return;
        }

        const id = Number(storedUserId);

        setVolunteerId(id);

        await loadAvailability(id);

      } catch (error) {
        console.log(error);
        Alert.alert(t('common.error'), 'Unable to load volunteer.');
        setLoading(false);
      }
    };

  const loadAvailability = async (id) => {
    try {

      const response =
        await getVolunteerAvailability(id);

      setAvailable(response.is_available);

    } catch (error) {

      console.log(error);

      Alert.alert(
        t('common.error'),
        'Unable to fetch availability.'
      );

    } finally {

      setLoading(false);

    }
  };

  const toggleAvailability = async () => {

    try {

      const response =
        await updateVolunteerAvailability(
          volunteerId,
          !available
        );

      setAvailable(response.is_available);

      Alert.alert(
        "Success",
        response.is_available
          ? "You are Online"
          : "You are Offline"
      );

    } catch (error) {

      Alert.alert(
        t('common.error'),
        'Unable to update availability.'
      );

    }

  };

  if (loading) {

    return (

      <View style={styles.loader}>

        <ActivityIndicator
          size="large"
          color="#1E3A8A"
        />

      </View>

    );

  }

  return (

    <View style={styles.container}>

      <Text style={styles.heading}>
        {t('volunteer.title')}
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          {t('security.status')}
        </Text>

        <Text
          style={[
            styles.status,
            {
              color: available
                ? "#16A34A"
                : "#DC2626",
            },
          ]}
        >
          {available
            ? t('volunteer.available').toUpperCase()
            : t('volunteer.unavailable').toUpperCase()}
        </Text>

        <Switch
          value={available}
          onValueChange={toggleAvailability}
        />

      </View>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    alignItems: "center",
  },

  label: {
    fontSize: 20,
    fontWeight: "600",
  },

  status: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 20,
  },

});