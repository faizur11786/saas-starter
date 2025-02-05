import { User } from "@/payload-types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const currencyFormatter = (
  value: number | bigint,
  options?: Intl.NumberFormatOptions
) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  }).format(value);
};

export const formatCurrencySuffixes = (
  value: number | bigint,
  options?: Intl.NumberFormatOptions
) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    ...options,
  });

  if (value >= 1e12) return formatter.format(Number(value) / 1e12) + "T";
  if (value >= 1e9) return formatter.format(Number(value) / 1e9) + "B";
  if (value >= 1e6) return formatter.format(Number(value) / 1e6) + "M";
  if (value >= 1e3) return formatter.format(Number(value) / 1e3) + "K";

  return formatter.format(value);
};

export const getInitials = (title: string): string => {
  return title
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};
