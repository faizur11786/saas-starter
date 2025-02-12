import { siteConfig } from "@/config/site";
import type { Metadata } from "next/types";

export const dynamic = "force-static";
export const revalidate = 600;

export default async function Page() {
  return <div className="pt-24 pb-24"></div>;
}

export function generateMetadata(): Metadata {
  return {
    title: `${siteConfig.name}`,
  };
}
