import { Alert, Linking } from "react-native";

export const useCallPhone = () => {
  function callPhone(phone: string | undefined) {
    if (!phone) {
      Alert.alert("Telefon numarası yok");
      return;
    }
    const url = `tel:${phone}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert("Arama yapılamıyor", "Bu cihaz telefona bağlanamıyor.");
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => {
        console.error("Linking error", err);
        Alert.alert("Hata", "Arama açılamadı.");
      });
  }

  return { callPhone };
};
