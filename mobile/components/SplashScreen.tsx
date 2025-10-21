// import React, { useEffect } from "react";
// import useAppStore from "@/store/useAppStore";
// import i18n from "@/configs/i18n.config";
// import SplashScreenUI from "@/components/SplashScreenUI";

// export const SplashScreen: React.FC<{ onFinish?: () => void }> = ({
//   onFinish,
// }) => {
//   const lang = useAppStore((state) => state.language);

//   useEffect(() => {
//     console.log("lang değişti : ", lang);
//     i18n.changeLanguage(lang);
//   }, [lang]);

//   return <SplashScreenUI />;
// };
