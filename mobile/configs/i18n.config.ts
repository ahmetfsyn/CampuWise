/* eslint-disable import/no-named-as-default-member */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import trAuth from "@/locales/tr/auth.json";
// import trProfile from "@/locales/tr/profile.json";
// import trEvents from "@/locales/tr/events.json";
// import trCommon from "@/locales/tr/common.json";

import enAuth from "@/locales/en/auth.json";
// import enProfile from "@/locales/en/profile.json";
// import enEvents from "@/locales/en/events.json";
// import enCommon from "@/locales/en/common.json";

const deviceLanguage = Localization.getLocales()[0]?.languageCode || "en";

i18next.use(initReactI18next).init({
  lng: deviceLanguage,
  fallbackLng: "en",
  ns: ["auth", "profile", "events", "common"], // namespace listesi
  defaultNS: "common",
  resources: {
    tr: {
      auth: trAuth,
      // profile: trProfile,
      // events: trEvents,
      // common: trCommon,
    },
    en: {
      auth: enAuth,
      // profile: enProfile,
      // events: enEvents,
      // common: enCommon,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
