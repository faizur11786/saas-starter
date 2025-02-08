import React from "react";

import type { Header } from "@/payload-types";
import { getAuth } from "@/actions/auth/user";
import { HeaderClient } from "./header.client";
import { getCachedGlobal } from "@/lib/payload/getGlobals";

export async function Header() {
  const { auth, headerData } = await Promise.all([
    getAuth(),
    getCachedGlobal("header", 1)(),
  ]).then(([auth, headerData]) => {
    return {
      auth,
      headerData: headerData as Header,
    };
  });

  return (
    <HeaderClient
      data={headerData}
      user={
        auth?.user
          ? {
              name: auth.user.name,
              id: auth.user.id,
            }
          : null
      }
    />
  );
}
