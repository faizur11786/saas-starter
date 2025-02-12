'use client'
import type { PayloadClientReactComponent, RowLabelComponent } from 'payload'

import { useRowLabel } from '@payloadcms/ui'

const CustomRowLabelTabs: PayloadClientReactComponent<RowLabelComponent> = () => {
  const { data } = useRowLabel<{ label: string }>()

  return data.label || '...'
}

export default CustomRowLabelTabs
