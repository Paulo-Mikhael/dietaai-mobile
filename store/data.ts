import { create } from "zustand";

export type User = {
  name: string;
  weight: string;
  height: string;
  age: string;
  level: string;
  objective: string;
  gender: string;
};

type PageOneUserState = Omit<User, "objective" | "gender" | "level">;
type PageTwoUserState = Pick<User, "objective" | "gender" | "level">;

type DataState = {
  user: User;
  setPageOne: (data: PageOneUserState) => void;
  setPageTwo: (data: PageTwoUserState) => void;
};

export const useDataStore = create<DataState>((set) => ({
  user: {
    name: "",
    weight: "",
    height: "",
    age: "",
    level: "",
    objective: "",
    gender: "",
  },
  setPageOne: (data) => {
    set((state) => ({ user: { ...state.user, ...data } }));
  },
  setPageTwo: (data) => {
    set((state) => ({ user: { ...state.user, ...data } }));
  },
}));
