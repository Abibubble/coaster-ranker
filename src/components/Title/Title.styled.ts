import styled from 'styled-components'
import { fonts, spacing, colours, breakpoints } from '../../theme'

export const TitleText = styled.h1`
  font-size: ${fonts.large};
  padding: ${spacing.tiny} ${spacing.small};
  text-align: center;
  color: ${colours.darkGrey};
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
