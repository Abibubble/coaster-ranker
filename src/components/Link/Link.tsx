import { ReactNode } from 'react'
import * as Styled from './Link.styled'
import { fonts } from '../../theme'

interface LinkProps {
  children: ReactNode
  href: string
  bold?: boolean
  center?: boolean
  dark?: boolean
  fontSize?: string
  variant?: 'text' | 'button' | 'back'
  onClick?: () => void
}

export default function Link({
  children,
  href,
  bold = false,
  center = false,
  dark = false,
  fontSize = fonts.body,
  variant = 'text',
  onClick,
}: LinkProps) {
  return (
    <Styled.Link
      href={href}
      $bold={bold}
      $center={center}
      $dark={dark}
      $fontSize={fontSize}
      $variant={variant}
      onClick={onClick}
    >
      {children}
    </Styled.Link>
  )
}
