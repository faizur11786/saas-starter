import type { CollectionConfig } from 'payload'

import { authenticated, authenticatedOrPublished } from '@/payload/access/authenticated'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import { generatePreviewPath } from '@/payload/utils/generatePreviewPath'
import { slugField } from '@/payload/fields/slug'
import { MediasBlock } from '@/blocks/media/config'
import { populatePublishedAt } from './hooks/populatePublishedAt'
import { ContentBlock } from '@/blocks/content/config'
import { hero } from '@/heros/config'
import { FeatureBlock } from '@/blocks/feature/config'
import { metadataTab } from '@/payload/fields/metadata'

export const pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    group: 'Content Management System',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'pages',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              blocks: [
                // CallToAction,
                ContentBlock,
                MediasBlock,
                FeatureBlock,
                // Archive,
                // FormBlock,
                // LegalDocuments,
                // LegalConsultation,
                // LegalNotices,
                // FeatureBlock,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        metadataTab(),
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
