import {
  StyleSheet,
  Text,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
  Pressable,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { router } from "expo-router";

interface HeaderProps {
  step: string;
  title: string;
}

export function Header({ step, title }: HeaderProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {step !== "0" && (
          <View style={styles.row}>
            <Pressable onPress={() => router.back()}>
              <Feather name="arrow-left" size={24} color="#000" />
            </Pressable>
            <Text style={styles.text}>
              Passo {step} <Feather name="loader" size={16} color="#000" />
            </Text>
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight! + 34 : 34,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 34,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.background,
  },
});
