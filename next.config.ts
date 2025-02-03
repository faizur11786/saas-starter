import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
import { RemotePattern } from "next/dist/shared/lib/image-config";

const NEXT_PUBLIC_SERVER_URL = "http://localhost:3000";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL, "https://media.faizur.me"].map((item) => {
        const url = new URL(item);
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(":", ""),
        } as RemotePattern;
      }),
    ],
  },
};

export default withPayload(nextConfig);
