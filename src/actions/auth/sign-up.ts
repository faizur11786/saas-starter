'use server'

import { siteConfig } from '@/config/site'
import { getPayload } from '@/payload/utils'
import { SignUp, signUpSchema } from '@/schema/auth'
import { cookies } from 'next/headers'

export const signupAction = async (args: SignUp) => {
  const { success, data } = signUpSchema.safeParse(args)
  if (!success) {
    throw new Error('Please provide valid form data. Check all required fields.')
  }

  const payload = await getPayload()

  const doc = await payload.create({
    collection: 'users',
    data: {
      ...args,
      roles: ['user'],
    },
  })

  if (!doc) {
    throw new Error('An error occurred during the sign-up process.')
  }

  const login = await payload.login({
    collection: 'users',
    data: {
      email: args.email,
      password: args.password,
    },
  })

  if (!data || !login?.token) {
    throw new Error('Failed to automatically sign in.')
  }

  const { options, name } = siteConfig.cookies

  const cookie = await cookies()
  cookie.set(name, login.token, { ...options })

  return login
}
