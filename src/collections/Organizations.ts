import type { CollectionConfig } from "payload";

export const Organizations: CollectionConfig = {
  slug: "organizations",
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
      name: "owner",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "members",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
    },
    {
      name: "activePlan",
      type: "relationship",
      relationTo: "plans",
      required: true,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "settings",
      type: "group",
      fields: [
        {
          name: "billingEmail",
          type: "email",
        },
        {
          name: "notificationPreferences",
          type: "select",
          hasMany: true,
          options: [
            {
              label: "Billing",
              value: "billing",
            },
            {
              label: "Team Updates",
              value: "team",
            },
            {
              label: "Security",
              value: "security",
            },
          ],
        },
      ],
    },
  ],
};
