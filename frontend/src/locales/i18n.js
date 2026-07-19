// src/locales/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const savedLang = localStorage.getItem("lang") || "ko";

// ✅ 모든 JSON 파일 자동 import
const koModules = import.meta.glob('./ko/*.json', { eager: true });
const enModules = import.meta.glob('./en/*.json', { eager: true });

function buildResources(modules) {
    const res = {};
    for (const path in modules) {
        // 파일명 추출 (예: './ko/menu.json' → 'menu')
        const ns = path.split('/').pop().replace('.json', '');
        res[ns] = modules[path];
    }
    return res;
}

i18n.use(initReactI18next).init({
    resources: {
        ko: buildResources(koModules),
        en: buildResources(enModules)
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
});

export default i18n;
