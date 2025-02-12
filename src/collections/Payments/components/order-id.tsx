"use client";

import { cn } from "@/lib/utils";
import { Payment } from "@/payload-types";
import { useField } from "@payloadcms/ui";
import type { TextFieldClientComponent } from "payload";
import { useEffect, useState } from "react";

export const OrderId: TextFieldClientComponent = ({ path }) => {
  const { value } = useField({ path });
  const [payment, setPayment] = useState<Payment | null>(null);
  useEffect(() => {
    (async () => {
      if (!value) return;
      const res = await fetch(`/api/payments/${value}`);
      const data = await res.json();
      setPayment(data);
    })();
  }, [value]);

  return (
    <div
      style={{
        marginTop: "1rem",
      }}
    >
      {`The current payment status is `}
      <span
        style={{
          fontWeight: "bold",
        }}
        className={cn("text-diff__locale-label", {
          "banner--type-default": payment?.status === "created",
          "banner--type-warning": payment?.status === "pending",
          "banner--type-success": payment?.status === "succeeded",
          "banner--type-error": payment?.status === "failed",
        })}
      >
        {payment?.status?.toUpperCase() ?? "NA"}
      </span>
    </div>
  );
};
