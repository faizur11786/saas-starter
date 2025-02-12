import type { Block, Field } from 'payload'

import {
  AlignFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
} from '@payloadcms/richtext-lexical'

import { link } from '@/fields/link'

const columnFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'size',
        type: 'select',
        defaultValue: 'oneThird',
        options: [
          {
            label: 'One Third',
            value: 'oneThird',
          },
          {
            label: 'Half',
            value: 'half',
          },
          {
            label: 'Two Thirds',
            value: 'twoThirds',
          },
          {
            label: 'Full',
            value: 'full',
          },
        ],
      },
      {
        name: 'position',
        type: 'select',
        defaultValue: 'left',
        options: [
          {
            label: 'Left',
            value: 'left',
          },
          {
            label: 'Center',
            value: 'center',
          },
          {
            label: 'Right',
            value: 'right',
          },
        ],
        admin: {
          condition: (_, siblingData) => siblingData.size !== 'full',
        },
      },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          HorizontalRuleFeature(),
          UnorderedListFeature(),
          AlignFeature(),
        ]
      },
    }),
    label: false,
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
  link({
    overrides: {
      admin: {
        // @ts-ignore
        condition: (_, { enableLink }: { enableLink: boolean }) => Boolean(enableLink),
      },
    },
  }),
]

export const ContentBlock: Block = {
  slug: 'contentBlock',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      fields: columnFields,
    },
  ],
}
