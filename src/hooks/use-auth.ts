"use client";

import { getClientSideURL } from "@/lib/getURL";
import { User } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch(`${getClientSideURL()}/api/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch user");
      }

      const data = (await res.json()) as {
        user: User | undefined;
        message: string;
        token?: string;
        exp?: number;
        collection?: string;
      };

      return data;
    },
  });
};
