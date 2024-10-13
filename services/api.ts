import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.15.7:3333",
});

interface Refeicao {
  nome: string;
  horario: string;
  alimentos: string[];
}

interface DadosUsuario {
  altura: number;
  idade: number;
  nome: string;
  objetivo: string;
  peso: number;
  refeicoes: Refeicao[];
  sexo: string;
  suplementos: string[];
}

export interface ApiResponse {
  data: DadosUsuario;
}