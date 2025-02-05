// storage-adapter-import-placeholder
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Organizations } from "./collections/Organizations";
import { Plans } from "./collections/Plans";
import { Subscriptions } from "./collections/Subscriptions";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { NODEMAILER_ADAPTER_CONFIG } from "./emails/nodemailer";
import { Properties } from "./collections/Properties";
import { plugins } from "./plugins";
import { Investments } from "./collections/Investments";
import { Transactions } from "./collections/transactions";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cookiePrefix: "aqarchain",
  collections: [
    Properties,
    Investments,
    Transactions,
    Users,
    Media,
    Organizations,
    Plans,
    Subscriptions,
  ],
  editor: lexicalEditor(),
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
