import { create } from "zustand";

type LoadingStore = {
  loading: boolean;
  setLoading: (data: boolean) => void;
};

export const useLoadingStore = create<LoadingStore>()((set) => ({
  loading: false,
  setLoading: (data) => set({ loading: data }),
}));
