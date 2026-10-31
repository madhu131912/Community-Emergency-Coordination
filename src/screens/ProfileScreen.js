import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { getProfile } from '../services/profileService';
import { getUserId } from '../utils/storage';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = await getUserId();

      if (!userId) {
        return;
      }

      const data = await getProfile(userId);
      setProfile(data);
    } catch (error) {
      console.log('Profile Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1E3A8A" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.info}>{t('profile.name')}: {profile?.first_name} {profile?.last_name}</Text>
      <Text style={styles.info}>{t('profile.email')}: {profile?.email}</Text>
      <Text style={styles.info}>{t('profile.phone')}: {profile?.phone}</Text>
      <Text style={styles.info}>{t('profile.role')}: {profile?.role_name}</Text>
      <Text style={styles.info}>{t('profile.society')}: {profile?.society_name || t('common.notAssigned')}</Text>
      <Text style={styles.info}>{t('profile.block')}: {profile?.block_name || t('common.notAssigned')}</Text>
      <Text style={styles.info}>{t('profile.flat')}: {profile?.flat_number || t('common.notAssigned')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 30,
  },
  info: {
    fontSize: 18,
    marginBottom: 15,
  },
});