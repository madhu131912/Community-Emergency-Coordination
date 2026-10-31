import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (error) {
    console.log('Error saving token:', error);
  }
};

export const saveUserId = async (userId) => {
  try {
    await AsyncStorage.setItem('userId', userId.toString());
  } catch (error) {
    console.log('Error saving userId:', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('token');
  } catch (error) {
    console.log('Error getting token:', error);
    return null;
  }
};

export const getUserId = async () => {
  try {
    return await AsyncStorage.getItem('userId');
  } catch (error) {
    console.log('Error getting userId:', error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log('Error removing token:', error);
  }
};

export const removeUserId = async () => {
  try {
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.log('Error removing userId:', error);
  }
};