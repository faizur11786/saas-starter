import { NodemailerAdapterArgs } from "@payloadcms/email-nodemailer";

export const NODEMAILER_ADAPTER_CONFIG: NodemailerAdapterArgs = {
  defaultFromAddress:
    process.env.SMTP_FROM_ADDRESS || "no-reply@kanoon4all.com",
  defaultFromName: process.env.SMTP_FROM_NAME || "kanoon4all",
  transportOptions: {
    host: process.env.SMTP_HOST || "127.0.0.1",
    port: Number(process.env.SMTP_PORT) || 1025,
    auth: {
      user: process.env.SMTP_USER || "user", // Add default credentials
      pass: process.env.SMTP_PASS || "pass", // Add default credentials
    },
    secure: process.env.SMTP_PORT === "465",
    requireTLS: process.env.SMTP_PORT === "587",
  },
};
