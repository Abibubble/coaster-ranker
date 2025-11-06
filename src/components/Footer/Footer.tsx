import * as Styled from './Footer.styled'
import { Text } from '../Text'

export default function Footer() {
  return (
    <Styled.FooterContainer>
      <Text as='p' center colour='white'>
        © Bubble & Squeak
      </Text>
    </Styled.FooterContainer>
  )
}
