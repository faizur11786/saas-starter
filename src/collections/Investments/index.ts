import { authenticated, superAdminAndSelf } from "@/access/authenticated";
import { none, noneFieldLevel } from "@/access/none";
import { CollectionConfig } from "payload";

export const Investments: CollectionConfig = {
  slug: "investments",
  access: {
    read: superAdminAndSelf,
    create: authenticated,
    delete: none,
  },
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Claimed", value: "claimed" },
        { label: "Refunded", value: "refunded" },
      ],
    },
    {
      name: "amount",
      type: "number",
      required: true,
      admin: {
        description:
          "Total amount paid for the transaction ( quantity * property.pricePerToken )",
      },
    },
    {
      name: "quantity",
      type: "number",
      required: true,
    },
    {
      name: "property",
      type: "relationship",
      relationTo: "properties",
      access: {
        update: noneFieldLevel,
      },
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
};
