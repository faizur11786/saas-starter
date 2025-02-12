import type { Block } from 'payload'

export const MediasBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediasBlock',
  fields: [
    {
      name: 'medias',
      type: 'upload',
      relationTo: 'medias',
      required: true,
    },
  ],
}
