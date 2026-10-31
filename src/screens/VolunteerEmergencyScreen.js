import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";

import {
  getIncidentDetails,
  getIncidentHistory,
  getIncidentClosure,
  getEscalationStatus,
} from "../services/incidentService";
import { useTranslation } from 'react-i18next';

export default function VolunteerEmergencyScreen() {
  const { t } = useTranslation();

  const [incidentId, setIncidentId] = useState("");

  const [loading, setLoading] = useState(false);

  const [incident, setIncident] = useState(null);

  const [timeline, setTimeline] = useState([]);

  const [closure, setClosure] = useState(null);

  const [escalation, setEscalation] = useState(null);

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

      const incidentData =
        await getIncidentDetails(
          Number(incidentId)
        );

      setIncident(incidentData);

      try {

        const history =
          await getIncidentHistory(
            Number(incidentId)
          );

        setTimeline(history);

      }

      catch {

        setTimeline([]);

      }

      try {

        const escalationData =
          await getEscalationStatus(
            Number(incidentId)
          );

        setEscalation(escalationData);

      }

      catch {

        setEscalation(null);

      }

      try {

        const closureData =
          await getIncidentClosure(
            Number(incidentId)
          );

        setClosure(closureData);

      }

      catch {

        setClosure(null);

      }

    }

    catch (error) {

      console.log(error);

      Alert.alert(
        t('common.error'),
        'Unable to load incident.'
      );

    }

    finally {

      setLoading(false);

    }

  };

    return (

    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <Text style={styles.heading}>
        {t('volunteer.emergencyMonitor')}
      </Text>

      <Text style={styles.subtitle}>
        {t('volunteer.monitorSubtitle')}
      </Text>

      <View style={styles.card}>

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
          style={styles.button}
          onPress={loadIncident}
        >

          <Text style={styles.buttonText}>
            {t('volunteer.loadIncident')}
          </Text>

        </TouchableOpacity>

      </View>

      {loading && (

        <ActivityIndicator
          size="large"
          color="#2563EB"
          style={{marginTop:20}}
        />

      )}

      {!loading && incident && (

        <>

          <View style={styles.card}>

            <Text style={styles.sectionTitle}>
              🚨 {t('incident.title')}
            </Text>

            <Text style={styles.info}>
              Incident ID : {incident.id}
            </Text>

            <Text style={styles.info}>
              Resident ID : {incident.resident_id}
            </Text>

            <Text style={styles.info}>
              Emergency : {incident.emergency_type}
            </Text>

            <Text style={styles.info}>
              Status : {incident.status}
            </Text>

            <Text style={styles.info}>
              Block : {incident.block_id}
            </Text>

            <Text style={styles.info}>
              Flat : {incident.flat_id}
            </Text>

            <Text style={styles.info}>
              Message :
            </Text>

            <Text style={styles.message}>
              {incident.emergency_message}
            </Text>

          </View>


          {escalation && (

            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                {t('incident.guardianEscalation')}
              </Text>

              <Text style={styles.info}>
                Current Level :
                {" "}
                {escalation.current_level}
              </Text>

              <Text style={styles.info}>
                Current Stage :
                {" "}
                {escalation.current_stage}
              </Text>

              <Text style={styles.info}>
                Escalation Count :
                {" "}
                {escalation.escalation_count}
              </Text>

            </View>

          )}

          {timeline.length > 0 && (

            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                {t('incident.timeline')}
              </Text>

              {timeline.map((item,index)=>(

                <View
                  key={index}
                  style={styles.timelineCard}
                >

                  <Text style={styles.bold}>
                    {item.action}
                  </Text>

                  <Text style={styles.time}>
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </Text>

                </View>

              ))}

            </View>

          )}

          {closure && (

            <View style={styles.card}>

              <Text style={styles.sectionTitle}>
                {t('incident.closure')}
              </Text>

              <Text style={styles.info}>
                Resolution :
              </Text>

              <Text style={styles.message}>
                {closure.resolution_summary}
              </Text>

              <Text style={styles.info}>
                Closed By :
                {" "}
                {closure.closed_by_name}
              </Text>

              <Text style={styles.info}>
                Closed At :
              </Text>

              <Text style={styles.time}>
                {new Date(
                  closure.closed_at
                ).toLocaleString()}
              </Text>

              <Text style={styles.info}>
                Remarks :
              </Text>

              <Text style={styles.message}>
                {closure.remarks || "-"}
              </Text>

            </View>

          )}

        </>

      )}

    </ScrollView>

  );

}
  const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:"#F5F7FA",
    padding:20,
  },

  heading:{
    fontSize:28,
    fontWeight:"bold",
    color:"#1E3A8A",
    marginTop:20,
  },

  subtitle:{
    fontSize:15,
    color:"#64748B",
    marginBottom:20,
    marginTop:5,
  },

  card:{
    backgroundColor:"#FFFFFF",
    borderRadius:14,
    padding:18,
    elevation:3,
    marginBottom:20,
  },

  label:{
    fontSize:17,
    fontWeight:"600",
    marginBottom:10,
    color:"#334155",
  },

  input:{
    borderWidth:1,
    borderColor:"#CBD5E1",
    borderRadius:10,
    padding:13,
    marginBottom:15,
    backgroundColor:"#F8FAFC",
    fontSize:16,
  },

  button:{
    backgroundColor:"#2563EB",
    padding:14,
    borderRadius:10,
    alignItems:"center",
  },

  buttonText:{
    color:"#FFFFFF",
    fontWeight:"bold",
    fontSize:15,
  },

  sectionTitle:{
    fontSize:22,
    fontWeight:"bold",
    color:"#1E3A8A",
    marginBottom:15,
  },

  info:{
    fontSize:16,
    color:"#334155",
    marginBottom:10,
  },

  bold:{
    fontWeight:"bold",
    color:"#0F172A",
    fontSize:16,
  },

  message:{
    fontSize:15,
    color:"#475569",
    marginBottom:15,
    lineHeight:22,
  },

  time:{
    fontSize:14,
    color:"#64748B",
    marginTop:4,
  },

  timelineCard:{
    backgroundColor:"#F8FAFC",
    borderRadius:10,
    padding:12,
    marginBottom:12,
  },

});

