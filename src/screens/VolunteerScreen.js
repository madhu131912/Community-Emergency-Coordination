import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import {
  getAssignedIncident,
  acceptIncident,
  rejectIncident,
  completeIncident,
  incidentAction,
} from '../services/incidentService';
import { getUserId } from '../utils/storage';

import { useNavigation } from '@react-navigation/native';

export default function VolunteerScreen() {
  const { t } = useTranslation();

  const [incidentId, setIncidentId] = useState('');
  const [incident, setIncident] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // =====================================================
  // LOAD ASSIGNED INCIDENT
  // =====================================================
  const loadIncident = async () => {

    if (!incidentId.trim()) {
      Alert.alert(
        t('common.error'),
        t('volunteer.required')
      );
      return;
    }

    setLoading(true);

    try {

      const data = await getAssignedIncident(
        Number(incidentId)
      );

      setIncident(data);

    } catch (error) {

      console.log(
        'LOAD INCIDENT ERROR:',
        error.response?.data || error
      );

      setIncident(null);

      Alert.alert(
        t('common.error'),
        error.response?.data?.detail ||
        t('volunteer.notFound')
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // ACCEPT INCIDENT
  // =====================================================
  const handleAccept = async () => {

    try {

      const response = await acceptIncident(
        Number(incidentId)
      );

      Alert.alert(
        t('common.success'),
        response.message || t('volunteer.accepted')
      );

      await loadIncident();

    } catch (error) {

      console.log(
        'ACCEPT ERROR:',
        error.response?.data || error
      );

      Alert.alert(
        t('common.error'),
        error.response?.data?.detail ||
        t('volunteer.unableAccept')
      );

    }
  };


  // =====================================================
  // REJECT INCIDENT
  // =====================================================
  const handleReject = async () => {

    try {

      const response = await rejectIncident(
        Number(incidentId)
      );

      Alert.alert(
        t('common.success'),
        response.message || t('volunteer.declined')
      );

      await loadIncident();

    } catch (error) {

      console.log(
        'REJECT ERROR:',
        error.response?.data || error
      );

      Alert.alert(
        t('common.error'),
        error.response?.data?.detail ||
        t('volunteer.unableReject')
      );

    }
  };

const handleReachedLocation = async () => {

  const userId = await getUserId();

  await incidentAction(
    Number(incidentId),
    'Reached Location',
    Number(userId)
  );

  Alert.alert(
    t('common.success'),
    'Reached Location updated.'
  );

  loadIncident();
};

const handleAssistanceStarted = async () => {

  const userId = await getUserId();

  await incidentAction(
    Number(incidentId),
    'Assistance Started',
    Number(userId)
  );

  Alert.alert(
    t('common.success'),
    'Assistance Started.'
  );

  loadIncident();
};

  // =====================================================
  // COMPLETE / RESOLVE INCIDENT
  // =====================================================
  const handleComplete = async () => {

    try {

      const storedUserId = await getUserId();

      if (!storedUserId) {
        Alert.alert(
          t('common.error'),
          t('volunteer.loggedOut')
        );
        return;
      }

      await completeIncident(
        Number(incidentId),
        Number(storedUserId)
      );

      Alert.alert(
        t('common.success'),
        t('volunteer.resolved')
      );

      await loadIncident();

    } catch (error) {

      console.log(
        'COMPLETE ERROR:',
        error.response?.data || error
      );

      Alert.alert(
        t('common.error'),
        error.response?.data?.detail ||
        t('volunteer.unableComplete')
      );

    }
  };


  return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.heading}>
        {t('volunteer.heading')}
      </Text>

      <Text style={styles.subtitle}>
        {t('volunteer.subtitle')}
      </Text>
    
    <View style={styles.menuRow}>

  <TouchableOpacity
    style={styles.menuButton}
    onPress={() => navigation.navigate("VolunteerAvailability")}
  >
    <Text style={styles.buttonText}>
      🟢 {t('volunteer.availability')}
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={styles.menuButton}
    onPress={() => navigation.navigate("VolunteerEmergency")}
  >
    <Text style={styles.buttonText}>
      📋 {t('volunteer.emergencyMonitor')}
    </Text>
  </TouchableOpacity>

</View>

      {/* INCIDENT SEARCH */}

      <View style={styles.searchCard}>

        <Text style={styles.label}>
          {t('volunteer.incidentId')}
        </Text>

        <TextInput
          style={styles.input}
          placeholder={t('volunteer.incidentPlaceholder')}
          keyboardType="numeric"
          value={incidentId}
          onChangeText={setIncidentId}
        />

        <TouchableOpacity
          style={styles.loadButton}
          onPress={loadIncident}
        >
          <Text style={styles.buttonText}>
            {t('volunteer.loadRequest')}
          </Text>
        </TouchableOpacity>

      </View>


      {/* LOADING */}

      {loading && (

        <ActivityIndicator
          size="large"
          color="#1E3A8A"
          style={styles.loading}
        />

      )}


      {/* INCIDENT */}

      {!loading && incident && (

        <View style={styles.card}>

          <Text style={styles.emergencyTitle}>
            🚨 {t('volunteer.requestTitle')}
          </Text>
        
          <View style={styles.divider} />

          <Text style={styles.info}>
            <Text style={styles.bold}>
              Incident ID:
            </Text>{' '}
            {incident.sos_alert_id}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.bold}>
              {t('volunteer.assignedVolunteer')}:
            </Text>{' '}
            {incident.responder_id}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.bold}>
              Role:
            </Text>{' '}
            {incident.responder_role}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.bold}>
              Status:
            </Text>{' '}
            {incident.status}
          </Text>

          <Text style={styles.info}>
            <Text style={styles.bold}>
              {t('volunteer.assignedAt')}:
            </Text>
          </Text>

          <Text style={styles.time}>
            {new Date(
              incident.assigned_at
            ).toLocaleString()}
          </Text>


          {/* ACCEPT / DECLINE */}

          <View style={styles.actionRow}>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
            >
              <Text style={styles.buttonText}>
                {t('volunteer.accept')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.rejectButton}
              onPress={handleReject}
            >
              <Text style={styles.buttonText}>
                {t('volunteer.decline')}
              </Text>
            </TouchableOpacity>

          </View>


          {/* COMPLETE */}

          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.buttonText}>
              {t('volunteer.complete')}
            </Text>
          </TouchableOpacity>

        </View>

      )}

    </ScrollView>

  );
}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  heading: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 20,
  },

  searchCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 20,
  },

  label: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    color: '#334155',
  },

  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    backgroundColor: '#F8FAFC',
    marginBottom: 12,
  },

  loadButton: {
    backgroundColor: '#2563EB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  loading: {
    marginTop: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 40,
  },

  emergencyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#DC2626',
  },

  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 15,
  },

  info: {
    fontSize: 17,
    marginBottom: 12,
    color: '#334155',
  },

  bold: {
    fontWeight: 'bold',
    color: '#0F172A',
  },

  time: {
    fontSize: 15,
    color: '#64748B',
    marginBottom: 20,
  },

  actionRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  acceptButton: {
    flex: 1,
    backgroundColor: '#16A34A',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 6,
  },

  rejectButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 6,
  },

  completeButton: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },


  menuRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 20,
},

menuButton: {
  width: "48%",
  backgroundColor: "#2563EB",
  padding: 14,
  borderRadius: 10,
  alignItems: "center",
},

});