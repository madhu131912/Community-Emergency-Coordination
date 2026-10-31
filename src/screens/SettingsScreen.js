import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { removeToken, removeUserId } from '../utils/storage';
import { changeAppLanguage } from '../i18n';

export default function SettingsScreen({ navigation }) {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language || 'en';

  const handleLogout = () => {
    Alert.alert(
      t('settings.logout'),
      t('settings.confirmLogout'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('settings.logout'),
          onPress: async () => {
            await removeToken();
            await removeUserId();
            navigation.replace('Login');
          },
        },
      ]
    );
  };

  const handleLanguageChange = async (language) => {
    await changeAppLanguage(language);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ {t('settings.title')}</Text>

      <View style={styles.languageCard}>
        <Text style={styles.languageTitle}>🌐 {t('settings.language')}</Text>
        <Text style={styles.languageSubtitle}>{t('settings.chooseLanguage')}</Text>

        <TouchableOpacity
          style={[
            styles.languageButton,
            currentLanguage === 'en' && styles.selectedLanguage,
          ]}
          onPress={() => handleLanguageChange('en')}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === 'en' && styles.selectedLanguageText,
            ]}
          >
            English
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            currentLanguage === 'te' && styles.selectedLanguage,
          ]}
          onPress={() => handleLanguageChange('te')}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === 'te' && styles.selectedLanguageText,
            ]}
          >
            తెలుగు
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            currentLanguage === 'hi' && styles.selectedLanguage,
          ]}
          onPress={() => handleLanguageChange('hi')}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === 'hi' && styles.selectedLanguageText,
            ]}
          >
            हिंदी
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            currentLanguage === 'ur' && styles.selectedLanguage,
          ]}
          onPress={() => handleLanguageChange('ur')}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === 'ur' && styles.selectedLanguageText,
            ]}
          >
            اردو
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.languageButton,
            currentLanguage === 'ta' && styles.selectedLanguage,
          ]}
          onPress={() => handleLanguageChange('ta')}
        >
          <Text
            style={[
              styles.languageText,
              currentLanguage === 'ta' && styles.selectedLanguageText,
            ]}
          >
            தமிழ்
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>{t('settings.logout')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20,
    paddingTop: 70,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 30,
  },
  languageCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 15,
    elevation: 3,
    marginBottom: 30,
  },
  languageTitle: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 5,
  },
  languageSubtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
  },
  languageButton: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#EEF2FF',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectedLanguage: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  languageText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  selectedLanguageText: {
    color: '#FFFFFF',
  },
  logoutButton: {
    backgroundColor: '#DC2626',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});