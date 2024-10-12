import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Header } from "@/components/header";
import { colors } from "@/constants/colors";
import { Input } from "@/components/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { router } from "expo-router";
import { useDataStore } from "@/store/data";

const schema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  weight: z.string().min(1, { message: "O peso é obrigatório" }),
  age: z.string().min(1, { message: "O idade é obrigatória" }),
  height: z.string().min(1, { message: "O altura é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Step() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const setPageOne = useDataStore((state) => state.setPageOne);

  function handleCreate(data: FormData) {
    setPageOne({
      name: data.name,
      weight: data.weight,
      height: data.height,
      age: data.age,
    });
    router.push("/create");
  }

  return (
    <View style={styles.container}>
      <Header step="1" title="Vamos começar" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input
          name="name"
          control={control}
          error={errors.name?.message}
          placeholder="Digite seu nome..."
          keyboardType="default"
        />
        <Text style={styles.label}>Seu peso atual (em quilos):</Text>
        <Input
          name="weight"
          control={control}
          error={errors.weight?.message}
          placeholder="Ex: 75"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Sua altura atual:</Text>
        <Input
          name="height"
          control={control}
          error={errors.height?.message}
          placeholder="Ex: 180 (1 metro e 80 centimetros)"
          keyboardType="numeric"
        />
        <Text style={styles.label}>Sua idade atual:</Text>
        <Input
          name="age"
          control={control}
          error={errors.age?.message}
          placeholder="Ex: 24"
          keyboardType="numeric"
        />
        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
