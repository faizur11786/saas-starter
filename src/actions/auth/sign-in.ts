"use server";

import { getPayload } from "@/lib/getPayload";
import { SignIn, signInSchema } from "@/schema/auth";
import { cookies } from "next/headers";
import { siteConfig } from "@/config/site";
export const loginAction = async (args: SignIn) => {
  const { success, data } = signInSchema.safeParse(args);

  if (!success) {
    throw new Error(
      "Please provide valid form data. Check all required fields."
    );
  }

  const payload = await getPayload();

  const doc = await payload.login({
    collection: "users",
    data,
  });

  if (!doc || !doc?.token) {
    throw new Error("Login failed");
  }
  const { name, options } = siteConfig.cookies.token;

  (await cookies()).set({
    name,
    value: doc?.token,
    ...options,
  });
  return doc;
};
