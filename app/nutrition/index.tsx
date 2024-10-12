import { useDataStore } from "@/store/data";
import { StyleSheet, Text, View } from "react-native";

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  return (
    <View>
      <Text>{user.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
