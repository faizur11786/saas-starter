// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { NODEMAILER_ADAPTER_CONFIG } from './emails/nodemailer'
import { plugins } from './payload/plugins'
import { Header } from './globals/header/config'
import { Footer } from './globals/footer/config'
import { siteConfig } from './config/site'
import collections from '@/payload/collections'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cookiePrefix: siteConfig.name.toLowerCase(),
  collections,
  globals: [Header, Footer],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  email: nodemailerAdapter({ ...NODEMAILER_ADAPTER_CONFIG }),
  sharp,
  plugins: [
    ...plugins,
    // storage-adapter-placeholder
  ],
})
