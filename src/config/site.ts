export const siteConfig = {
  name: 'Payapp2',
  cookies: {
    name: 'payapp2-token',
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 1 week
    },
  },
  supports: {
    email: 'support@payapp2.com',
    mobile: '+91 81516 10901',
  },
}
