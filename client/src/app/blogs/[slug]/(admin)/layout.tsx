"use client";

import { useUserStore } from "@/store/user";

import NotFound from "@/app/not-found";
import { ReactNode } from "react";
import LoadingPage from "@/app/loading";

const AdminBlogRoutesLayout = ({ children }: { children: ReactNode }) => {
  const { isAuth, user } = useUserStore();

  if (!user || !isAuth) {
    return <LoadingPage />;
  }

  if (["ADMIN", "ORGANIZOR"].includes(user.role)) {
    return children;
  }

  return <NotFound />;
};

export default AdminBlogRoutesLayout;
