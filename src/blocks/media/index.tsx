import type { StaticImageData } from 'next/image'

import React from 'react'

import type { MediasBlock as MediasBlockProps } from '@/payload-types'
import { Medias } from '@/components/media'
import { cn } from '@/lib/utils'
import RichText from '@/components/custom/rich-text'

type Props = MediasBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
  disableInnerContainer?: boolean
}

export const MediasBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    medias,
    staticImage,
    disableInnerContainer,
  } = props

  let caption
  if (medias && typeof medias === 'object') caption = medias.caption

  return (
    <div
      className={cn(
        '',
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(medias || staticImage) && (
        <Medias
          imgClassName={cn('border border-border rounded-[0.8rem]', imgClassName)}
          resource={medias}
          src={staticImage}
        />
      )}
      {caption && (
        <div
          className={cn(
            'mt-6',
            {
              container: !disableInnerContainer,
            },
            captionClassName,
          )}
        >
          <RichText data={caption} enableGutter={false} />
        </div>
      )}
    </div>
  )
}
