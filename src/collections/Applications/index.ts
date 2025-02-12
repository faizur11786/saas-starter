import { authenticated } from '@/access/authenticated'
import { CollectionConfig } from 'payload'
import { generateApplicationId } from './utils/applicationId'

export const Applications: CollectionConfig = {
  slug: 'applications',
  admin: {
    useAsTitle: 'applicationId',
    defaultColumns: ['applicationId', 'user', 'payment', 'status', 'createdAt'],
  },
  access: {
    read: authenticated,
    create: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: 'email', type: 'text' },
    { name: 'mobile', type: 'text' },
    {
      name: 'applicationId',
      type: 'text',
      defaultValue: generateApplicationId,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'submitted',
      type: 'json',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'created',
      options: [
        { label: 'Created', value: 'created' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },

    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Service',
          value: 'service',
        },
        {
          label: 'Booking',
          value: 'booking',
        },
      ],
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
}
