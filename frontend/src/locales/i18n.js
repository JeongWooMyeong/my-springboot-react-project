// src/locales/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en/translation.json';
import ko from './ko/translation.json';

const savedLang = localStorage.getItem("lang") || "ko";  // ✅ 저장된 언어 불러오기

i18n.use(initReactI18next).init({
    resources: { en: { translation: en }, ko: { translation: ko } },
    lng: savedLang,       // ✅ 저장된 언어로 초기화
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
});

export default i18n;
