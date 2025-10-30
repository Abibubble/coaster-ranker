import { ReactNode } from 'react'
import * as Styled from './Title.styled'

interface TitleProps {
  children: ReactNode
}

export default function Title({ children }: TitleProps) {
  return <Styled.TitleText>{children}</Styled.TitleText>
}
