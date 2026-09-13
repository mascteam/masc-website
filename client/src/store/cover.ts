import { create } from "zustand";

export type CoverStoreType = {
  hovered: boolean;
  setHovered: (data: boolean) => void;
};

export const useCoverStore = create<CoverStoreType>()((set) => ({
  hovered: false,
  setHovered: (data) => set(() => ({ hovered: data })),
}));
