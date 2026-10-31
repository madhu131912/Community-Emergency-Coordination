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
import { loginUser } from '../services/authService';

import { saveToken, saveUserId } from '../utils/storage';

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      await saveToken(response.access_token);
      await saveUserId(response.user_id);
      navigation.replace('ResidentHome');
    } catch (error) {
      Alert.alert(t('common.error'), error.message || t('common.genericError'));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CEPi</Text>
      <Text style={styles.subtitle}>{t('login.subtitle')}</Text>

      <TextInput
        style={styles.input}
        placeholder={t('login.email')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder={t('login.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHide}>{showPassword ? t('common.hide') : t('common.show')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>{t('login.button')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F7FA',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E3A8A',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 40,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    height: 50,
  },
  showHide: {
    color: 'blue',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#2563EB',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});