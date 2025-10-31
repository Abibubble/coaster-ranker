import { ReactNode } from 'react'
import * as Styled from './ViewLink.styled'

interface ViewLinkProps {
  children: ReactNode
  href: string
}

export default function ViewLink({ children, href }: ViewLinkProps) {
  return <Styled.ViewLink href={href}>{children}</Styled.ViewLink>
}
