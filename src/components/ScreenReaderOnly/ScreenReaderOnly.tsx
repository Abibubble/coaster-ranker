import React, { ComponentPropsWithRef, ElementType, ReactNode } from 'react'

import * as Styled from './ScreenReaderOnly.styled'

export type ScreenReaderOnlyProps<
  GElementType extends ElementType = ElementType
> = ComponentPropsWithRef<GElementType> & {
  children: ReactNode
  as?: GElementType
  id?: string
}

export default function ScreenReaderOnly({
  children,
  as = 'span',
  id,
}: ScreenReaderOnlyProps) {
  return (
    <Styled.SROnly as={as} id={id}>
      {children}
    </Styled.SROnly>
  )
}
