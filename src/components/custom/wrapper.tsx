import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
  className?: string
  children: React.ReactNode
}

const Wrapper = ({ className, children }: Props) => {
  return <section className={cn('container', className)}>{children}</section>
}

export default Wrapper
