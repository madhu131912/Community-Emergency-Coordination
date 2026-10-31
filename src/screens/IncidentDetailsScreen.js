import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

export default function IncidentDetailsScreen() {

  const incident = {
    resident: 'Madhu',
    emergency: 'Medical',
    location: 'Block A - Room 204',
    description: 'Resident fainted and requires immediate medical assistance.',
    guardian: 'Anil Kumar',
    volunteer: 'Priya Sharma',
    security: 'Security Team A',
    status: 'In Progress',
    reportedAt: '20 Jul 2026, 10:30 AM',
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.heading}>
        Incident Details
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Resident Information</Text>
        <Text>Name: {incident.resident}</Text>
        <Text>Location: {incident.location}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Emergency Information</Text>
        <Text>Type: {incident.emergency}</Text>
        <Text>Description:</Text>
        <Text style={styles.description}>
          {incident.description}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Assigned Team</Text>
        <Text>Guardian: {incident.guardian}</Text>
        <Text>Volunteer: {incident.volunteer}</Text>
        <Text>Security: {incident.security}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Incident Status</Text>
        <Text>Status: {incident.status}</Text>
        <Text>Reported At: {incident.reportedAt}</Text>
      </View>

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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2563EB',
  },

  description: {
    marginTop: 5,
    color: '#555',
    lineHeight: 22,
  },

});