import { toasty } from "@/components/ToastProvider";
import axiosInstance from "@/services/axios";
import { create } from "zustand";

export type UserType = {
  department: string;
  division: string;
  moodleID: string;
  password : string;
  name: string;
  year : string;
  organizationID: { _id: string; name: string; slug: string; logoUrl: string }[];
  registeredEvents: { title: string; _id: string; slug: string }[];
  role: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type userStore = {
  user: UserType | null;
  setUser: (data: UserType | null) => void;
  isAuth: boolean;
  setAuth: (data: boolean) => void;
  getUser : ()=> Promise<void>;
};

export const useUserStore = create<userStore>()((set, get) => ({
  user: null,
  setUser: (data: UserType | null) => set(() => ({ user: data })),
  isAuth: false,
  setAuth: (data: boolean) => set(() => ({ isAuth: data })),
  getUser : async () => {
    const {setAuth, setUser} = get()
      try {
        const { data } = await axiosInstance.get("/auth/check", { withCredentials: true });
        setAuth(true);
        setUser(data.user);
      } catch (error: any) {
        if (error.response.data.message === "jwt malformed") {
          toasty("cookie expired, login again");
        }
  
        if (error.response.data.message === "unauthorized no token provided") {
          toasty("login into your accoun to see profile");
        }
        setAuth(false);
      }
    }
}));
