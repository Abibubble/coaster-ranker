import styled from 'styled-components'
import { breakpoints, fonts, spacing } from '../../theme'
import { Text } from '../Text'

export const TitleText = styled(Text).withConfig({
  shouldForwardProp: prop => {
    // Don't forward Text component's custom props to the DOM
    const customProps = [
      'bold',
      'center',
      'colour',
      'fontSize',
      'italic',
      'mb',
      'mt',
    ]
    return !customProps.includes(prop)
  },
})`
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
