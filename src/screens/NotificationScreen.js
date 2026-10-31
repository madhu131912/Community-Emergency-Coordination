import React from 'react';
import {
  View,
 Text,
  FlatList,
  StyleSheet,
} from 'react-native';
import { useTranslation } from 'react-i18next';

export default function NotificationScreen() {
  const { t } = useTranslation();

  const notifications = [
    {
      id: '1',
      title: t('notifications.sampleTitle'),
      message: t('notifications.sampleBody'),
      time: '2 min ago',
      read: false,
    },
    {
      id: '2',
      title: 'Fire Alert',
      message: 'Security team dispatched.',
      time: '10 min ago',
      read: true,
    },
    {
      id: '3',
      title: 'SOS Update',
      message: 'Your SOS has been acknowledged.',
      time: '25 min ago',
      read: true,
    },
  ];

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.card,
        !item.read && styles.unreadCard,
      ]}
    >
      <Text style={styles.title}>{item.title}</Text>

      <Text style={styles.message}>
        {item.message}
      </Text>

      <Text style={styles.time}>
        {item.time}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        {t('notifications.title')}
      </Text>

              {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {t('notifications.emptyAlt')}
            </Text>
          </View>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        )}

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

  unreadCard: {
    borderLeftWidth: 5,
    borderLeftColor: '#2563EB',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },

  message: {
    color: '#555',
    marginBottom: 8,
  },

  time: {
    color: '#888',
    fontSize: 12,
  },

  emptyContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

emptyText: {
  fontSize: 18,
  color: '#777',
},

});