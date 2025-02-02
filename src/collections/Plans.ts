import type { CollectionConfig } from "payload";

export const Plans: CollectionConfig = {
  slug: "plans",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "price",
      type: "number",
      required: true,
    },
    {
      name: "interval",
      type: "select",
      options: [
        {
          label: "Monthly",
          value: "month",
        },
        {
          label: "Yearly",
          value: "year",
        },
      ],
      required: true,
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "name",
          type: "text",
          required: true,
        },
        {
          name: "included",
          type: "checkbox",
          defaultValue: true,
        },
      ],
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
  ],
};
