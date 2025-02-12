import { createParser, createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

import { Where } from 'payload'

const whereParser = createParser<Where>({
  parse: (value) => {
    try {
      return value ? JSON.parse(value) : null
    } catch {
      return null
    }
  },
  serialize: (value) => JSON.stringify(value),
})

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  limit: parseAsInteger.withDefault(10),
  sort: parseAsString.withDefault(''),
  email: parseAsString.withDefault(''),
  status: parseAsString.withDefault(''),
  where: whereParser.withDefault({}),
})

export type GetPaymentSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>
