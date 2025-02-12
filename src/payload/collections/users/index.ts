import type { CollectionConfig } from 'payload'
import { render } from '@react-email/components'
import type { User } from '@/payload-types'
import ResetPasswordEmail from '@/emails/reset-password'
import { getServerSideURL } from '@/lib/getURL'
import { siteConfig } from '@/config/site'
import { isSuperAdmin, superAdmin } from '@/payload/access/authenticated'
import uuidField from '@/payload/fields/uuid'
import { adminsAndSelf } from './access/adminsAndSelf'

export const users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: siteConfig.cookies.options.maxAge,
    forgotPassword: {
      expiration: 15 * 60, // 15 minutes,
      // @ts-ignore
      generateEmailHTML: async ({ token, user }: { token: string; user: User }) => {
        const link = `${getServerSideURL()}/reset-password?token=${token}`
        const html = await render(
          ResetPasswordEmail({
            resetPasswordLink: link,
            userFirstName: user.email,
            companyName: siteConfig.name,
            supportEmail: siteConfig.supports.email,
            supportMobile: siteConfig.supports.mobile,
          }),
          { pretty: true },
        )
        return html
      },
    },
  },
  access: {
    read: adminsAndSelf,
    update: adminsAndSelf,
    delete: superAdmin,
    unlock: superAdmin,
    admin: ({ req: { user } }) => {
      if (user && isSuperAdmin(user)) {
        return true
      }
      return false
    },
  },
  fields: [
    uuidField,
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      required: true,
      hasMany: true,
      defaultValue: ['user'],
      options: [
        { label: 'Super Admin', value: 'super-admin' },
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      admin: {
        position: 'sidebar',
      },
      access: {},
    },
  ],
}
