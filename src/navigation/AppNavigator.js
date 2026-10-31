import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VolunteerEmergencyScreen from '../screens/VolunteerEmergencyScreen';
import LoginScreen from '../screens/LoginScreen';
import ResidentHomeScreen from '../screens/ResidentHomeScreen';
import SOSScreen from '../screens/SOSScreen';
import NotificationScreen from '../screens/NotificationScreen';
import GuardianScreen from '../screens/GuardianScreen';
import SecurityScreen from '../screens/SecurityScreen';
import VolunteerScreen from '../screens/VolunteerScreen';
import IncidentDetailsScreen from '../screens/IncidentDetailsScreen';

import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import HistoryScreen from '../screens/HistoryScreen';

import VolunteerAvailabilityScreen from '../screens/VolunteerAvailabilityScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ResidentHome" component={ResidentHomeScreen} />
        <Stack.Screen name="SOS" component={SOSScreen} />
        <Stack.Screen name="Notifications" component={NotificationScreen} />
        <Stack.Screen name="Guardian" component={GuardianScreen} />
        <Stack.Screen name="Security" component={SecurityScreen} />
        <Stack.Screen name="Volunteer" component={VolunteerScreen} />
        <Stack.Screen
          name="IncidentDetails"
          component={IncidentDetailsScreen}
        />
                <Stack.Screen
          name="History"
          component={HistoryScreen}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
         <Stack.Screen name="Settings" component={SettingsScreen} />
                <Stack.Screen
          name="VolunteerAvailability"
          component={VolunteerAvailabilityScreen}
        />
                <Stack.Screen
          name="VolunteerEmergency"
          component={VolunteerEmergencyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}