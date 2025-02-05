import { CollectionConfig } from "payload";

export const Transactions: CollectionConfig = {
  slug: "transactions",
  fields: [
    {
      name: "status",
      type: "select",
      defaultValue: "pending",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Failed", value: "failed" },
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
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
    {
      name: "investment",
      type: "relationship",
      relationTo: "investments",
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
