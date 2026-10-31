import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { getSOSHistory } from '../services/sosService';

export default function HistoryScreen() {
  const { t } = useTranslation();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await getSOSHistory();
      console.log("SOS HISTORY:", data);
      setHistory(data);
    } catch (error) {
      console.log("History Error:", error);
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
      <Text style={styles.title}>{t('history.title')}</Text>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
                    <Text style={styles.type}>
          {item.emergency_type === "Medical"
            ? "🚑"
            : item.emergency_type === "Fire"
            ? "🔥"
            : item.emergency_type === "Security"
            ? "🛡️"
            : "🚨"}{" "}
          {item.emergency_type}
          </Text>
            <Text>
              {t('history.message')}: {item.emergency_message}
            </Text>

            <Text>
              {t('history.status')}: {item.status}
            </Text>

            <Text>
              {t('history.date')}: {new Date(item.created_at).toLocaleString()}
            </Text>
          </View>
        )}
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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },

  type: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1E3A8A',
  },
  message: {
  fontSize: 16,
  marginTop: 6,
},

status: {
  marginTop: 8,
  fontWeight: 'bold',
  color: '#2563EB',
},

date: {
  marginTop: 5,
  color: 'gray',
},
});