import React, { Fragment } from 'react'

import type { Props } from './types'

import { ImageMedias } from './image-media'
import { VideoMedias } from './video-media'

export const Medias: React.FC<Props> = (props) => {
  const { className, htmlElement = 'div', resource } = props

  const isVideo = typeof resource === 'object' && resource?.mimeType?.includes('video')
  const Tag = (htmlElement as any) || Fragment

  return (
    <Tag
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <VideoMedias {...props} /> : <ImageMedias {...props} />}
    </Tag>
  )
}
