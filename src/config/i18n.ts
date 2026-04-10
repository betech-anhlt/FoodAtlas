import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import en from './locales/en.json';
import vi from './locales/vi.json';
import ja from './locales/ja.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ja: { translation: ja },
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0]?.languageCode || 'vi',
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

