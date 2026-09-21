"use client";

import { ReactNode, useEffect } from "react";

import { useUserStore } from "@/store/user";
import axiosInstance from "@/services/axios";
import { toasty } from "./ToastProvider";
import { useRouter, usePathname } from "next/navigation";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setAuth, setUser } = useUserStore();

  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = async () => {
    try {
      const { data } = await axiosInstance.get("/auth/check", { withCredentials: true });
      setAuth(true);

      setUser(data.user);
    } catch (error: any) {
      if (error.response.data.message === "jwt malformed") {
        toasty("cookie expired, login again");
      }

      if (error.response.data.message === "unauthorized no token provided") {
        toasty("login into your account to see profile");
      }
      setAuth(false);
      router.push(`/login?redirect=${pathname === "/login" ? "/profile" : pathname}`);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return children;
};

export default AuthProvider;
