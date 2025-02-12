import type { Metadata } from 'next'
import { getServerSideURL } from '../../lib/getURL'
import { siteConfig } from '@/config/site'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Bridging the gap between the general public and experienced legal professionals across India.',
  images: [
    {
      url: `${getServerSideURL()}/website-template-OG.webp`,
    },
  ],
  siteName: siteConfig.name,
  title: siteConfig.name,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
