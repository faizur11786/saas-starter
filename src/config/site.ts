export const siteConfig = {
  name: "SaaS Starter",
  cookies: {
    token: {
      name: "token",
      options: {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        domain: process.env.HOST ?? "localhost",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        SameSite: true,
      },
    },
  },
  supports: {
    email: "support@gmail.com",
    phone: "+1234567890",
  },
};
