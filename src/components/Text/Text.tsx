import React from 'react'
import { StyledText } from './Text.styled'
import { colours, fonts, spacing } from '../../theme'

export interface TextProps {
  children: React.ReactNode
  as?: React.ElementType
  bold?: boolean
  center?: boolean
  className?: string
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
  className,
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
  // Create filtered props object excluding custom Text props
  const domProps: Record<string, unknown> = {}

  // Only add props that are valid DOM attributes
  if (as) domProps.as = as
  if (className) domProps.className = className
  if (htmlFor) domProps.htmlFor = htmlFor
  if (id) domProps.id = id
  if (role) domProps.role = role
  if (ariaLive) domProps['aria-live'] = ariaLive

  return (
    <StyledText
      {...domProps}
      $bold={bold}
      $center={center}
      $colour={colour}
      $fontSize={fontSize}
      $italic={italic}
      $mb={mb}
      $mt={mt}
    >
      {children}
    </StyledText>
  )
}
