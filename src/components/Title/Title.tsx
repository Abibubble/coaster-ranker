import { ReactNode } from 'react'
import * as Styled from './Title.styled'

interface TitleProps {
  children: ReactNode
}

export default function Title({ children }: TitleProps) {
  return (
    <Styled.TitleText as='h1' center colour='darkGrey'>
      {children}
    </Styled.TitleText>
  )
}
