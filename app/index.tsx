import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import { colors } from "@/constants/colors";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/images/icon.png")} />
      <Text style={styles.title}>
        Dieta<Text style={{ color: colors.white }}>.AI</Text>
      </Text>
      <Text style={styles.text}>
        Sua dieta personalizada com inteligência artificial
      </Text>
      <Link href="/step" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Gerar dieta</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 16,
    paddingRight: 16,
    gap: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: colors.green,
  },
  text: {
    fontSize: 16,
    color: colors.white,
    maxWidth: 240,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.blue,
    width: "100%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 34,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
