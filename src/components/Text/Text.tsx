import React from 'react'
import { StyledText } from './Text.styled'
import { colours, fonts, spacing } from '../../theme'

export interface TextProps {
  children: React.ReactNode
  as?: React.ElementType
  bold?: boolean
  center?: boolean
  colour?: keyof typeof colours
  fontSize?: keyof typeof fonts
  htmlFor?: string
  id?: string
  italic?: boolean
  mb?: keyof typeof spacing
  mt?: keyof typeof spacing
  role?: string
  'aria-live'?: 'off' | 'assertive' | 'polite'
}

export function Text({
  children,
  as = 'span',
  bold = false,
  center = false,
  colour = 'black',
  fontSize = 'body',
  htmlFor,
  id,
  italic = false,
  mb,
  mt,
  role,
  'aria-live': ariaLive,
}: TextProps) {
  return (
    <StyledText
      as={as}
      $bold={bold}
      $center={center}
      $colour={colour}
      $fontSize={fontSize}
      htmlFor={htmlFor}
      id={id}
      $italic={italic}
      $mb={mb}
      $mt={mt}
      role={role}
      aria-live={ariaLive}
    >
      {children}
    </StyledText>
  )
}
