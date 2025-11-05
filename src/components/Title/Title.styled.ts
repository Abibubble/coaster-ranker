import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'
import { Text } from '../'

export const TitleText = styled(Text)`
  font-size: ${fonts.large};
  padding: ${spacing.tiny} ${spacing.small};
  line-height: 1.2;

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.huge};
    padding: ${spacing.small} ${spacing.small};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    font-size: ${fonts.title};
    padding: ${spacing.small} 0;
  }
`
