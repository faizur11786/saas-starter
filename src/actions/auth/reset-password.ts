"use server";

import { getPayload } from "@/lib/getPayload";
import { ResetPassword, resetSchema } from "@/schema/auth";

export const resetPasswordAction = async (args: ResetPassword) => {
  const { success, data, error } = resetSchema.safeParse(args);
  if (!success) {
    throw new Error(
      "Please provide valid form data. Check all required fields.",
      { cause: error }
    );
  }

  const payload = await getPayload();

  const doc = await payload.resetPassword({
    collection: "users",
    data: {
      password: data.password,
      token: data.token,
    },
    overrideAccess: true,
  });

  return doc;
};
