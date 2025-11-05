import React from 'react'
import * as Styled from './InfoMessage.styled'
import { colours } from '../../theme'

export type InfoVariant = 'error' | 'success' | 'info'

const getInfoVariantStyles = (variant: InfoVariant) => {
  switch (variant) {
    case 'error':
      return {
        backgroundColor: colours.lightRed,
        borderColor: colours.redBorder,
      }
    case 'success':
      return {
        backgroundColor: colours.lightGreenBg,
        borderColor: colours.greenBorder,
      }
    case 'info':
      return {
        backgroundColor: colours.warningBg,
        borderColor: colours.yellow,
      }
    default:
      return {
        backgroundColor: colours.lightRed,
        borderColor: colours.redBorder,
      }
  }
}

export interface InfoMessageProps {
  variant: InfoVariant
  children: React.ReactNode
  bgColour?: keyof typeof colours
  borderColour?: keyof typeof colours
  role?: string
  'aria-live'?: 'off' | 'assertive' | 'polite'
  className?: string
}

export function InfoMessage({
  variant,
  children,
  bgColour,
  borderColour,
  role,
  'aria-live': ariaLive,
  className,
}: InfoMessageProps) {
  const variantStyles = getInfoVariantStyles(variant)

  const backgroundColour = bgColour
    ? colours[bgColour]
    : variantStyles.backgroundColor

  const borderColor = borderColour
    ? colours[borderColour]
    : variantStyles.borderColor

  return (
    <Styled.InfoMessage
      as='p'
      mt='small'
      $bgColour={backgroundColour}
      $borderColour={borderColor}
      role={role}
      aria-live={ariaLive}
      className={className}
    >
      {children}
    </Styled.InfoMessage>
  )
}
