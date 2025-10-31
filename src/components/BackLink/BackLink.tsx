import { ReactNode } from 'react'
import * as Styled from './BackLink.styled'

interface BackLinkProps {
  children: ReactNode
  href: string
}

export default function BackLink({ children, href }: BackLinkProps) {
  return <Styled.BackLink href={href}>{children}</Styled.BackLink>
}
