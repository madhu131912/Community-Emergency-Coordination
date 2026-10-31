import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function ResidentHomeScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  const alerts = [
    t('home.alert1'),
    t('home.alert2'),
    t('home.alert3'),
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.welcome}>👋 {t('home.welcome')}</Text>
      <Text style={styles.name}>{t('home.residentDashboard')}</Text>
      <Text style={styles.subtitle}>{t('home.platform')}</Text>

      <Text style={styles.sectionTitle}>{t('home.emergencyServices')}</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SOS')}>
          <Text style={styles.cardIcon}>🏥</Text>
          <Text style={styles.cardText}>{t('home.medical')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SOS')}>
          <Text style={styles.cardIcon}>🔥</Text>
          <Text style={styles.cardText}>{t('home.fire')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SOS')}>
          <Text style={styles.cardIcon}>🚓</Text>
          <Text style={styles.cardText}>{t('home.security')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SOS')}>
          <Text style={styles.cardIcon}>🚨</Text>
          <Text style={styles.cardText}>{t('home.sos')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{t('home.quickActions')}</Text>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('History')}>
          <Text style={styles.cardIcon}>📜</Text>
          <Text style={styles.cardText}>{t('home.history')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Notifications')}>
          <Text style={styles.cardIcon}>🔔</Text>
          <Text style={styles.cardText}>{t('home.notifications')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.cardIcon}>👤</Text>
          <Text style={styles.cardText}>{t('home.profile')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Guardian')}>
          <Text style={styles.cardIcon}>👨‍👩‍👧</Text>
          <Text style={styles.cardText}>{t('home.guardian')}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.cardIcon}>⚙️</Text>
          <Text style={styles.cardText}>{t('home.settings')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Volunteer')}>
          <Text style={styles.cardIcon}>🙋</Text>
          <Text style={styles.cardText}>{t('home.volunteer')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>{t('home.recentAlerts')}</Text>

      <View style={styles.alertBox}>
        {alerts.map((item, index) => (
          <Text key={index} style={styles.alert}>• {item}</Text>
        ))}
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
  welcome: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    marginTop: 5,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    minHeight: 120,
  },
  cardIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  alertBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
    marginBottom: 30,
    elevation: 2,
  },
  alert: {
    fontSize: 15,
    marginBottom: 10,
    color: '#444',
  },
});