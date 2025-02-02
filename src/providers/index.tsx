"use client";
import { FC, ReactNode } from "react";

import { QueryProvider } from "./query-provider";
type Props = {
  children: ReactNode;
};

export const Providers: FC<Props> = ({ children }) => {
  return <QueryProvider>{children}</QueryProvider>;
};
