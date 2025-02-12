'use client'

import { Application } from '@/payload-types'
import React, { Fragment } from 'react'

type Props = {
  docs: Application[]
  pageCount: number
}

const PageClient = ({ docs, pageCount }: Props) => {
  return <Fragment>Hello</Fragment>
}

export default PageClient
