import React from 'react'

import type { Page } from '@/payload-types'

import { AnimatedImpactHero } from '@/heros/AnimatedImpact'

const heroes = {
  animatedImpact: AnimatedImpactHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
