import type { CollectionConfig } from "payload";

export const Subscriptions: CollectionConfig = {
  slug: "subscriptions",
  admin: {
    useAsTitle: "organization",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "organization",
      type: "relationship",
      relationTo: "organizations",
      required: true,
    },
    {
      name: "plan",
      type: "relationship",
      relationTo: "plans",
      required: true,
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
          label: "Canceled",
          value: "canceled",
        },
        {
          label: "Past Due",
          value: "past_due",
        },
      ],
      required: true,
      defaultValue: "active",
    },
    {
      name: "startDate",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      type: "date",
    },
    {
      name: "billingDetails",
      type: "group",
      fields: [
        {
          name: "amount",
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
          name: "currency",
          type: "text",
          defaultValue: "USD",
        },
      ],
    },
  ],
};
