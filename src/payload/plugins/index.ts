import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { getServerSideURL } from '@/lib/getURL'
import { siteConfig } from '@/config/site'
import { Page, Service } from '@/payload-types'

const generateTitle: GenerateTitle<Page | Service> = ({ doc }) => {
  return doc?.title ? `${doc.title} | ${siteConfig.name}` : siteConfig.name
}

const generateURL: GenerateURL<Page | Service> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  seoPlugin({
    generateTitle,
    generateURL,
  }),
]
