import React from 'react'
import * as Styled from './CodeBlock.styled'

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
}

export default function CodeBlock({ children, className }: CodeBlockProps) {
  return <Styled.CodeBlock className={className}>{children}</Styled.CodeBlock>
}
