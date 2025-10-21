/* eslint-disable import/no-named-as-default-member */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import trAuth from "@/locales/tr/auth.json";
import trProfile from "@/locales/tr/profile.json";

import enAuth from "@/locales/en/auth.json";
import enProfile from "@/locales/en/profile.json";

const deviceLanguage = Localization.getLocales()[0]?.languageCode || "tr";

i18next.use(initReactI18next).init({
  lng: deviceLanguage,
  fallbackLng: "en",
  ns: ["auth", "profile"], // namespace listesi
  defaultNS: "common",
  resources: {
    tr: {
      auth: trAuth,
      profile: trProfile,
    },
    en: {
      auth: enAuth,
      profile: enProfile,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
