import type { CollectionConfig } from "payload";
import { render } from "@react-email/components";
import { User } from "@/payload-types";
import ResetPasswordEmail from "@/emails/reset-password";
import { getServerSideURL } from "@/lib/getURL";
import { siteConfig } from "@/config/site";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    forgotPassword: {
      expiration: 15 * 60, // 15 minutes,
      // @ts-ignore
      generateEmailHTML: async ({
        token,
        user,
      }: {
        token: string;
        user: User;
      }) => {
        const link = `${getServerSideURL()}/reset-password?token=${token}`;
        const html = await render(
          ResetPasswordEmail({
            resetPasswordLink: link,
            userFirstName: user.email,
            companyName: siteConfig.name,
            supportEmail: siteConfig.supports.email,
            supportPhone: siteConfig.supports.phone,
          }),
          { pretty: true }
        );
        return html;
      },
    },
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
};
