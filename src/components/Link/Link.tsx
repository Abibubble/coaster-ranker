import { ReactNode } from 'react'
import { Link as RouterLink } from 'react-router-dom'
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
  external?: boolean
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
  external = false,
}: LinkProps) {
  // For external links or links starting with http/https, use regular anchor
  if (external || href.startsWith('http')) {
    return (
      <Styled.Link
        as='a'
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

  // For internal links, use React Router Link
  return (
    <Styled.Link
      as={RouterLink}
      to={href}
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
