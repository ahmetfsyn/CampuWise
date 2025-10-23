/* eslint-disable import/no-named-as-default-member */
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import trAuth from "@/locales/tr/auth.json";
import trProfile from "@/locales/tr/profile.json";
import trMap from "@/locales/tr/map.json";
import trEvents from "@/locales/tr/events.json";
import trCommon from "@/locales/tr/common.json";
import trHome from "@/locales/tr/home.json";
import trRoutes from "@/locales/tr/routes.json";

import enAuth from "@/locales/en/auth.json";
import enProfile from "@/locales/en/profile.json";
import enMap from "@/locales/en/map.json";
import enEvents from "@/locales/en/events.json";
import enCommon from "@/locales/en/common.json";
import enHome from "@/locales/en/home.json";
import enRoutes from "@/locales/en/routes.json";

const deviceLanguage = Localization.getLocales()[0]?.languageCode || "tr";

i18next.use(initReactI18next).init({
  lng: deviceLanguage,
  fallbackLng: "en",
  ns: ["auth", "profile", "map", "events", "common", "home", "routes"], // namespace listesi
  defaultNS: "common",
  resources: {
    tr: {
      auth: trAuth,
      profile: trProfile,
      map: trMap,
      events: trEvents,
      common: trCommon,
      home: trHome,
      routes: trRoutes,
    },
    en: {
      auth: enAuth,
      profile: enProfile,
      map: enMap,
      events: enEvents,
      common: enCommon,
      home: enHome,
      routes: enRoutes,
    },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
