'use server'

import { getPayload } from '@/payload/utils'
import { headers as nextHeaders } from 'next/headers'
import { cache } from 'react'

export const getAuth = cache(async () => {
  const { headers, payload } = await Promise.all([nextHeaders(), getPayload()]).then((values) => {
    return {
      headers: values[0],
      payload: values[1],
    }
  })

  if (!payload || !headers) {
    return null
  }

  try {
    const auth = await payload.auth({ headers })
    return { ...auth, payload }
  } catch (error) {
    payload.logger.error('Auth error', error)
    return null
  }
})
