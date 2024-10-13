import { Header } from "@/components/header";
import { colors } from "@/constants/colors";
import { useDataStore } from "@/store/data";
import {
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { api, type ApiResponse } from "@/services/api";
import { Link, router } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";

export default function Nutrition() {
  const user = useDataStore((state) => state.user);
  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) throw new Error("Failed load nutrition. No user");

        const response = await api.post<ApiResponse>("/create", {
          name: user.name,
          weight: user.weight,
          height: user.height,
          age: user.age,
          level: user.level,
          objective: user.objective,
          gender: user.gender,
        });
        const responseData = response.data.data;

        return responseData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  async function handleShare() {
    try {
      if (data && Object.keys(data).length === 0) return;

      const supplements = `${data?.suplementos.map((suplemento) => `${suplemento}`)}`;
      const foods = `${data?.refeicoes.map((refeicao) => `\n\n- Nome: ${refeicao.nome}\nHorário: ${refeicao.horario}\n- Alimentos: ${refeicao.alimentos.map((alimento) => `${alimento}`)}`)}`;

      const message = `Dieta de ${data?.nome} - Objetivo: ${data?.objetivo}${foods}\n\n- Dica de suplementos: ${supplements}`;

      await Share.share({
        message: message,
      });
    } catch (error) {
      console.log(error);
    }
  }

  if (isFetching) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Carregando dieta...</Text>
      </View>
    );
  }

  if (!data || error) {
    return (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>
          Erro ao carregar dieta, verifique a conexão com o servidor e tente
          novamente.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("/")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Tente Novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header step="0" title="Minha dieta">
        <TouchableOpacity style={styles.button} onPress={handleShare}>
          <Text style={styles.buttonText}>Compartilhar</Text>
        </TouchableOpacity>
      </Header>
      <View style={{ paddingHorizontal: 16, flex: 1 }}>
        {data && Object.keys.length > 0 && (
          <>
            <Text style={styles.name}>Nome: {data.nome}</Text>
            <Text style={styles.objective}>Foco: {data.objetivo}</Text>
            <Text style={styles.label}>Refeições:</Text>
          </>
        )}
        <ScrollView>
          <View style={styles.foodsContainer}>
            {data.refeicoes.map((refeicao) => (
              <View key={refeicao.nome} style={styles.food}>
                <View style={styles.foodHeader}>
                  <Text style={styles.foodName}>{refeicao.nome}</Text>
                  <Ionicons name="restaurant" size={16} color="#000" />
                </View>
                <View style={styles.foodContent}>
                  <Feather name="clock" size={14} color="#000" />
                  <Text>Horário: {refeicao.horario}</Text>
                </View>
                <Text style={styles.foodText}>Alimentos:</Text>
                {refeicao.alimentos.map((alimento) => (
                  <Text key={alimento}>{alimento}</Text>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.supplements}>
            <Text style={styles.foodName}>Dica suplementos:</Text>
            {data.suplementos.map((suplemento) => (
              <Text key={suplemento}>{suplemento}</Text>
            ))}
          </View>
          <Link href="/" asChild style={{ marginBottom: 24 }}>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Gerar nova dieta</Text>
            </Pressable>
          </Link>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loading: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 20,
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    padding: 8,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
  objective: {
    color: colors.white,
    fontSize: 16,
    marginBottom: 24,
  },
  label: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  foodsContainer: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 8,
    marginTop: 4,
    gap: 8,
  },
  food: {
    backgroundColor: "rgba(208, 208, 208, 0.40)",
    padding: 8,
    borderRadius: 8,
  },
  foodHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  foodContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  foodText: {
    fontSize: 16,
    marginBottom: 4,
    marginTop: 14,
  },
  supplements: {
    backgroundColor: colors.white,
    marginTop: 14,
    marginBottom: 14,
    padding: 14,
    borderRadius: 8,
  },
});
