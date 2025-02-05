import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  loading?: "lazy" | "eager";
  priority?: "auto" | "high" | "low";
  src?: string;
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    src = "/logo-light.png",
  } = props;

  const loading = loadingFromProps || "lazy";
  const priority = priorityFromProps || "low";

  return (
    /* eslint-disable @next/next/no-img-element */
    <img
      alt="Logo"
      width={193}
      height={44}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={cn("max-w-[9.375rem] w-full h-[44px]", className)}
      src={src}
    />
  );
};
