"use server";
import { auth } from "./auth";
import { headers } from "next/headers";

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isAdmin = session?.user?.role === "admin";
  return {
    isLoggedIn: !!session,
    isAdmin,
    token: session?.session.token,
    user: session?.user || null,
  };
};

export const getCurrentSession = async (token: string | undefined) => {
  const sessionList = await auth.api.listSessions({
    headers: await headers(),
  });
  return sessionList.find((session) => session.token == token);
};
