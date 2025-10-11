import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";

const EventDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  console.log(id);
  return (
    <ScrollView>
      <Text>EventDetailsScreen</Text>
    </ScrollView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({});
