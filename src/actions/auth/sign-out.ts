"use server";

import { siteConfig } from "@/config/site";
import { cookies } from "next/headers";

export const signOutAction = async () => {
  const { name } = siteConfig.cookies;

  const cookie = await cookies();
  cookie.delete(name);

  return { success: true };
};
