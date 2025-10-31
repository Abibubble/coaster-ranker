import * as Styled from './MainContent.styled'
import { ReactNode } from 'react'

export type MainContentProps = {
  children: ReactNode
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <Styled.ContentContainer id='main-content'>
      {children}
    </Styled.ContentContainer>
  )
}
