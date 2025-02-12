import React, { Fragment } from 'react'

import { MediasBlock } from './media'
import { Page } from '@/payload-types'
import { ContentBlock } from './content'
import { FeatureBlock } from './feature'

const blockComponents = {
  // archive: ArchiveBlock,
  // cta: CallToActionBlock,
  // formBlock: FormBlock,
  contentBlock: ContentBlock,
  mediaBlock: MediasBlock,
  featureBlock: FeatureBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
