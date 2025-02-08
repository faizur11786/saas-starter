import type { Block, Field } from "payload";

export const FeatureBlock: Block = {
  slug: "featureBlock",
  interfaceName: "FeatureBlock",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "media",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "icon",
          type: "textarea",
        },
      ],
    },
  ],
};
