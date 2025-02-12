// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { NODEMAILER_ADAPTER_CONFIG } from "./emails/nodemailer";
import { plugins } from "./plugins";
import { Header } from "./globals/header/config";
import { Pages } from "./collections/Pages";
import { Services } from "./collections/Services";
import { Footer } from "./globals/footer/config";
import { Applications } from "./collections/Applications";
import { Payments } from "./collections/Payments";
import { Availability } from "./globals/availability/config";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cookiePrefix: "kanoon4all",
  collections: [Applications, Payments, Services, Users, Media, Pages],
  globals: [Header, Footer, Availability],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
    ],
  }),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  email: nodemailerAdapter({ ...NODEMAILER_ADAPTER_CONFIG }),
  sharp,
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
});
