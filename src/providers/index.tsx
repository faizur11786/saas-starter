'use client'

import { FC, ReactNode } from 'react'

import { QueryProvider } from './query-provider'
import { ThemeProvider } from './theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NuqsAdapter } from 'nuqs/adapters/next/app'

type Props = {
  children: ReactNode
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <TooltipProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        // enableSystem
        // disableTransitionOnChange
      >
        <QueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </QueryProvider>
      </ThemeProvider>
    </TooltipProvider>
  )
}
