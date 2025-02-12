import React from "react";

import type { Footer } from "@/payload-types";
import { FooterClient } from "./footer.client";
import { getCachedGlobal } from "@/lib/payload/getGlobals";

export async function Footer() {
  const footerData: Footer = await getCachedGlobal("footer", 1)();
  return <FooterClient data={footerData} />;
}
