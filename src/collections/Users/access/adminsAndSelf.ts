import { isSuperAdmin } from '@/access/authenticated'
import type { Access } from 'payload'

export const adminsAndSelf: Access = async ({ req: { user } }) => {
  if (user) {
    const isSuper = isSuperAdmin(user)

    if (isSuper) {
      return true
    }

    return {
      or: [
        {
          id: {
            equals: user.id,
          },
        },
      ],
    }
  }
  return false
}
