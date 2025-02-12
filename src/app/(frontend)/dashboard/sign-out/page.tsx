import { signOutAction } from "@/actions/auth/sign-out";
import { redirect } from "next/navigation";

import React from "react";

const Page = async () => {
  const data = await signOutAction();

  if (data) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-2">Signing Out...</h1>
      <p className="text-muted-foreground">
        Please wait while we securely sign you out of your account.
      </p>
    </div>
  );
};

export default Page;
