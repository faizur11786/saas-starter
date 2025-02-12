import type { Access, AccessArgs } from 'payload'

import type { User } from '@/payload-types'
import { checkUserRoles } from '@/lib/checkUserRoles'

type isAuthenticated = (args: AccessArgs<User>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  return Boolean(user)
}

export const superAdmin: Access = ({ req: { user } }) => checkUserRoles(['super-admin'], user)

export const isSuperAdmin = (user: User): boolean => checkUserRoles(['super-admin'], user)

export const superAdminAndSelf: Access = async ({ req: { user } }) => {
  if (user) {
    const isSuper = isSuperAdmin(user)

    if (isSuper) {
      return true
    }

    return {
      and: [{ user: { equals: user.id } }],
    }
  }

  return false
}

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user) {
    return true
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
