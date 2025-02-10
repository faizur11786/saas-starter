import { availableTimes } from "@/constants/available-times";
import { GlobalConfig } from "payload";

export const Availability: GlobalConfig = {
  slug: "availability",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "daysOfWeek",
      type: "array",
      fields: [
        {
          name: "day",
          type: "text",
          required: true,
          admin: {
            description:
              'The day of the week for the availability slot, e.g. "Monday", "Tuesday", etc.',
          },
        },
        {
          type: "row",
          fields: [
            {
              name: "startTime",
              type: "select",
              required: true,
              options: [...availableTimes],
              admin: {
                description: "The start time of the availability slot",
              },
            },
            {
              name: "endTime",
              type: "select",
              required: true,
              options: [...availableTimes],
              admin: {
                description: "The end time of the availability slot",
              },
            },
          ],
        },
        {
          name: "isActive",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "slots",
          type: "text",
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
};
