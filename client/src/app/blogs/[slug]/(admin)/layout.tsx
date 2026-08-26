"use client";

import { useUserStore } from "@/store/user";

import NotFound from "@/app/not-found";
import { ReactNode } from "react";

const AdminBlogRoutesLayout = ({ children }: { children: ReactNode }) => {
  const { isAuth, user } = useUserStore();

  if(isAuth && user?.role == "ORGANIZOR") {
    return children
  }

  return <NotFound/>
};

export default AdminBlogRoutesLayout;
