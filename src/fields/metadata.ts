import { Field, Tab } from "payload";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";
import deepMerge from "@/lib/deepMerge";

type MetadataTab = (overrides?: Partial<Tab>) => Tab;

export const metadataTab: MetadataTab = (overrides: Partial<Tab> = {}) => {
  return deepMerge<Tab, Partial<Tab>>(
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
          relationTo: "medias",
        }),

        MetaDescriptionField({}),
        PreviewField({
          // if the `generateUrl` function is configured
          hasGenerateFn: true,

          // field paths to match the target field for data
          titlePath: "meta.title",
          descriptionPath: "meta.description",
        }),
      ],
    },
    overrides
  );
};
