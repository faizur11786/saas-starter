import type { Metadata } from 'next'

import type { Media, Page, Config } from '@/payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from '../../lib/getURL'
import { siteConfig } from '@/config/site'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: { doc: Partial<Page> }): Promise<Metadata> => {
  const { doc } = args || {}

  const ogImage = getImageURL(doc?.metadata?.image)

  const title = doc?.metadata?.title ? doc.metadata.title + `| ${siteConfig.name}` : siteConfig.name

  return {
    description: doc?.metadata?.description,
    openGraph: mergeOpenGraph({
      description: doc?.metadata?.description || '',
      images: ogImage ? [{ url: ogImage }] : undefined,
      title,
      url: Array.isArray(doc?.slug) ? doc?.slug.join('/') : '/',
    }),
    title,
  }
}
