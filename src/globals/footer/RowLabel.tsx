'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = (_props) => {
  const data = useRowLabel<NonNullable<Header['tabs']>[number]>()

  const label = (data?.data?.link as any)?.label
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${(data?.data?.link as any)?.label}`
    : 'Row'

  return <div>{label}</div>
}
