import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { createSOS } from '../services/sosService';

export default function SOSScreen() {
  const { t } = useTranslation();
  const [emergencyType, setEmergencyType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const [typeError, setTypeError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [locationError, setLocationError] = useState('');

  const handleSOS = async () => {

  if (!emergencyType) {
    setTypeError(t('sos.errors.type'));
    return;
  }

  setTypeError('');

  if (!description.trim()) {
    setDescriptionError(t('sos.errors.description'));
    return;
  }

  setDescriptionError('');

  if (!location.trim()) {
    setLocationError(t('sos.errors.location'));
    return;
  }

  setLocationError('');

  try {

    const userId = await AsyncStorage.getItem('userId');

    const sosData = {
      resident_id: Number(userId),
      emergency_type: emergencyType,
      emergency_message: description,
    };

    const response = await createSOS(sosData);

    Alert.alert(
      t('common.success'),
      t('sos.success')
    );

    console.log(response);

  } catch (error) {

    console.log(error.response?.data);

    Alert.alert(
      t('common.error'),
      error.response?.data?.detail || t('sos.error')
    );

  }

};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('sos.title')}</Text>

      <Text style={styles.label}>{t('sos.type')}</Text>

      <View style={styles.typeContainer}>
        {[
          { key: 'Medical', label: t('sos.medical') },
          { key: 'Fire', label: t('sos.fire') },
          { key: 'Security', label: t('sos.security') },
        ].map((type) => (
          <TouchableOpacity
            key={type.key}
            style={[
              styles.typeButton,
              emergencyType === type.key && styles.selectedButton,
            ]}
            onPress={() => setEmergencyType(type.key)}
          >
            <Text
              style={[
                styles.typeText,
                emergencyType === type.key && styles.selectedText,
              ]}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {typeError ? (
        <Text style={styles.error}>{typeError}</Text>
      ) : null}

      <Text style={styles.label}>{t('sos.description')}</Text>

      <TextInput
        style={styles.textArea}
        placeholder={t('sos.descriptionPlaceholder')}
        multiline
        value={description}
        onChangeText={setDescription}
      />

      {descriptionError ? (
        <Text style={styles.error}>{descriptionError}</Text>
      ) : null}

      <Text style={styles.label}>{t('sos.location')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('sos.locationPlaceholder')}
        value={location}
        onChangeText={setLocation}
      />

      {locationError ? (
        <Text style={styles.error}>{locationError}</Text>
      ) : null}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSOS}
      >
        <Text style={styles.buttonText}>{t('sos.button')}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 30,
  },

  label: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 10,
  },

  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  typeButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    elevation: 2,
  },

  selectedButton: {
    backgroundColor: '#D32F2F',
    borderColor: '#D32F2F',
  },

  typeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  selectedText: {
    color: '#FFFFFF',
  },

  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
  },

  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },

  error: {
    color: '#D32F2F',
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 5,
  },

  button: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});