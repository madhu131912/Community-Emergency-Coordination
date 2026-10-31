import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  getGuardianRequests,
  updateSOSStatus,
} from '../services/guardianService';

import {
  startEscalation,
  nextEscalation,
  stopEscalation,
  getEscalation,
} from '../services/escalationService';

export default function GuardianScreen() {
  const { t } = useTranslation();

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await getGuardianRequests();
      setRequests(data);
    } catch (error) {
      Alert.alert(t('common.error'), t('guardian.error'));
    }
  };

  const acceptSOS = async (id) => {
    try {
      await updateSOSStatus(id, 'Accepted');
      Alert.alert(t('common.success'), 'SOS Accepted');
      loadRequests();
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to accept SOS');
    }
  };

  const rejectSOS = async (id) => {
    try {
      await updateSOSStatus(id, 'Rejected');
      Alert.alert(t('common.success'), 'SOS Rejected');
      loadRequests();
    } catch (error) {
      Alert.alert(t('common.error'), 'Failed to reject SOS');
    }
  };

  const start = async (id) => {
    try {
      const res = await startEscalation(id);
      Alert.alert("Escalation", res.message);
    } catch (e) {
      Alert.alert("Error", e.response?.data?.detail || "Unable to start escalation");
    }
  };

  const next = async (id) => {
    try {
      const res = await nextEscalation(id);
      Alert.alert("Escalation", `${res.message}\n${res.current_level}`);
    } catch (e) {
      Alert.alert("Error", e.response?.data?.detail || "Unable to escalate");
    }
  };

  const stop = async (id) => {
    try {
      const res = await stopEscalation(id);
      Alert.alert("Escalation", res.message);
      loadRequests();
    } catch (e) {
      Alert.alert("Error", e.response?.data?.detail || "Unable to stop escalation");
    }
  };

  const status = async (id) => {
    try {
      const res = await getEscalation(id);

      Alert.alert(
        "Escalation Status",
        `Stage : ${res.current_stage}

Status : ${res.incident_status}

Escalations : ${res.escalation_count}`
      );

    } catch (e) {
      Alert.alert("Error", "Unable to fetch status");
    }
  };

  const renderItem = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.name}>
        Resident ID : {item.resident_id}
      </Text>

      <Text>Emergency : {item.emergency_type}</Text>

      <Text>Message : {item.emergency_message}</Text>

      <Text>Status : {item.status}</Text>

      <Text>
        Time : {new Date(item.created_at).toLocaleString()}
      </Text>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => acceptSOS(item.id)}
        >
          <Text style={styles.buttonText}>{t('volunteer.accept')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => rejectSOS(item.id)}
        >
          <Text style={styles.buttonText}>{t('volunteer.decline')}</Text>
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.blueButton}
        onPress={() => start(item.id)}
      >
        <Text style={styles.buttonText}>
          Start Escalation
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.orangeButton}
        onPress={() => next(item.id)}
      >
        <Text style={styles.buttonText}>
          Next Level
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.purpleButton}
        onPress={() => status(item.id)}
      >
        <Text style={styles.buttonText}>
          View Status
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.stopButton}
        onPress={() => stop(item.id)}
      >
        <Text style={styles.buttonText}>
          Stop Escalation
        </Text>
      </TouchableOpacity>

    </View>

  );

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        {t('guardian.title')}
      </Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onRefresh={loadRequests}
        refreshing={false}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: '#16A34A',
    padding: 12,
    borderRadius: 10,
    marginRight: 6,
    alignItems: 'center',
  },

  rejectButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    padding: 12,
    borderRadius: 10,
    marginLeft: 6,
    alignItems: 'center',
  },

  blueButton: {
    backgroundColor: '#2563EB',
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  orangeButton: {
    backgroundColor: '#F97316',
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  purpleButton: {
    backgroundColor: '#7C3AED',
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  stopButton: {
    backgroundColor: '#111827',
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },

});