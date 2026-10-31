import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function SecurityScreen() {
  const { t } = useTranslation();

  const incidents = [
    {
      id: '1',
      resident: 'Madhu',
      emergency: 'Security',
      location: 'Block B',
      status: 'Pending',
    },
    {
      id: '2',
      resident: 'Rahul',
      emergency: 'Fire',
      location: 'Parking Area',
      status: 'In Progress',
    },
  ];

  const updateStatus = () => {
    Alert.alert(t('common.success'), t('security.success'));
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.resident}</Text>

      <Text>Emergency: {item.emergency}</Text>
      <Text>Location: {item.location}</Text>
      <Text>Status: {item.status}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={updateStatus}
      >
        <Text style={styles.buttonText}>
          {t('security.button')}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        {t('security.title')}
      </Text>

      <FlatList
        data={incidents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  button: {
    marginTop: 15,
    backgroundColor: '#2563EB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});