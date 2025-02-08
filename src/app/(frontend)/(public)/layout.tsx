import { getAuth } from "@/actions/auth/user";
import { Footer } from "@/globals/footer";
import { Header } from "@/globals/header";
import { getServerSideURL } from "@/lib/getURL";
import { mergeOpenGraph } from "@/lib/payload/mergeOpenGraph";
import type { Metadata } from "next";
import { Fragment } from "react";

export default async function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = await getAuth();
  return (
    <Fragment>
      <Header />
      {/* <Header /> */}
      {children}
      <Footer />
      {/* <Footer /> */}
    </Fragment>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: "summary_large_image",
    creator: "@payloadcms",
  },
};
