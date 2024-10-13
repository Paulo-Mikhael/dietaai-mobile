import { Stack } from "expo-router";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { StatusBar } from "react-native";
import { colors } from "@/constants/colors";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar backgroundColor={colors.background} />
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="step/index" options={{ headerShown: false }} />
        <Stack.Screen name="create/index" options={{ headerShown: false }} />
        <Stack.Screen name="nutrition/index" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
