import { slugField } from "@/fields/slug";
import type { CollectionConfig } from "payload";

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import {
  revalidateDelete,
  revalidateProperty,
} from "./hooks/revalidateProperty";
import { populatePublishedAt } from "./hooks/populatePublishedAt";

export const Properties: CollectionConfig = {
  slug: "properties",
  admin: {
    useAsTitle: "title",
  },
  access: {
    read: () => true,
  },
  versions: {
    drafts: {
      autosave: {
        interval: 5000, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateProperty],
    beforeChange: [
      populatePublishedAt,
      ({ data }) => {
        data.pricePerToken = Math.floor(Number(data.price) / Number(data.area));
      },
    ],
    afterDelete: [revalidateDelete],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Content",
          fields: [
            {
              name: "media",
              type: "upload",
              relationTo: "media",
              hasMany: true,
              minRows: 1,
              required: true,
            },
          ],
        },
        {
          label: "Attributes",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "area",
                  type: "text",
                  required: true,
                  admin: {
                    description: "in square feet",
                  },
                },
                {
                  name: "location",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              type: "row",
              fields: [
                {
                  name: "price",
                  type: "text",
                  required: true,
                  validate: (data: any) =>
                    /^\d+$/.test(data) || "Price must be an integer.",
                  admin: {
                    description: "Property value in dollars",
                  },
                },
                {
                  name: "pricePerToken",
                  type: "text",
                  admin: {
                    readOnly: true,
                    description:
                      "Auto calculated based on price and area ( price / area)",
                  },
                },
              ],
            },
          ],
        },
        {
          name: "metadata",
          label: "Metadata",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
              overrides: {
                hasMany: true,
              },
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Upcoming",
          value: "upcoming",
        },
        {
          label: "Closed",
          value: "closed",
        },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],
};
