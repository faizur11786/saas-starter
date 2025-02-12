'use client'

import type { Page } from '@/payload-types'

import { FC, useEffect } from 'react'
// import { useHeaderTheme } from "@/providers/HeaderTheme";
// import { WordRotate } from "@/components/ui/word-rotate";
import { CMSLink } from '@/components/custom/cms-link'
import { Medias } from '@/components/media'
import { WordRotate } from '@/components/ui/word-rotate'
import { useHeaderTheme } from '@/providers/theme-provider'

export const AnimatedImpactHero: FC<Page['hero']> = ({
  links,
  medias,
  rotateWords,
  title,
  subtitle,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center justify-center text-white"
      data-theme="dark"
    >
      <div className="container mt-32 z-10 relative flex items-center justify-center mb-8">
        <div className="max-w-[36.5rem] md:text-center">
          <h1 className="text-7xl mb-4">
            {title}
            <WordRotate className="text-6xl font-bold " words={rotateWords?.split(',') ?? []} />
          </h1>
          <p className="mb-4">{subtitle}</p>
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex md:justify-center gap-4">
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {medias && typeof medias === 'object' && (
          <Medias fill imgClassName="-z-10 object-cover" priority resource={medias} />
        )}
      </div>
    </div>
  )
}
