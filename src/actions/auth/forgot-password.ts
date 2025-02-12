'use server'

import { getPayload } from '@/payload/utils'
import { ForgotPassword, forgotSchema } from '@/schema/auth'

export const forgotPasswordAction = async (args: ForgotPassword) => {
  const { success, data } = forgotSchema.safeParse(args)

  if (!success) {
    throw new Error('Please provide valid form data. Check all required fields.')
  }

  const payload = await getPayload()

  const doc = await payload.forgotPassword({
    collection: 'users',
    data,
  })

  if (!doc) {
    throw new Error('Forgot password failed')
  }

  return doc
}
