export const siteConfig = {
  name: "Aqarchain",
  cookies: {
    name: "aqarchain-token",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  },
  supports: {
    email: "support@aqarchain.in",
    phone: "+971 00 0000 0000",
  },
};
