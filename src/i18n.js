import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en from '../locales/en.json';
import te from '../locales/te.json';
import hi from '../locales/hi.json';
import ur from '../locales/ur.json';
import ta from '../locales/ta.json';

const resources = {
  en: { translation: en },
  te: { translation: te },
  hi: { translation: hi },
  ur: { translation: ur },
  ta: { translation: ta },
};

export const changeAppLanguage = async (language) => {
  try {
    await AsyncStorage.setItem('app_language', language);
    await i18n.changeLanguage(language);
  } catch (error) {
    console.log('Language storage error:', error);
  }
};

const initializeI18n = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem('app_language');
    const languageToLoad = savedLanguage && resources[savedLanguage] ? savedLanguage : 'en';

    await i18n.use(initReactI18next).init({
      resources,
      lng: languageToLoad,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  } catch (error) {
    console.log('i18n init error:', error);
    await i18n.use(initReactI18next).init({
      resources,
      lng: 'en',
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    });
  }
};

initializeI18n();

export default i18n;
