export const siteConfig = {
  name: "Kanoon4All",
  cookies: {
    name: "kanoon4all-token",
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  },
  supports: {
    email: "support@kanoon4all.com",
    mobile: "+91 81516 10901",
  },
};
