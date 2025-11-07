import styled from 'styled-components'
import { breakpoints, fonts, spacing } from '../../theme'
import { Text } from '../Text'

export const TitleText = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['center', 'colour']
    return !customProps.includes(prop)
  },
})`
  font-size: ${fonts.large};
  padding: ${spacing.small} 0;
  line-height: 1.2;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (min-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.huge};
  }

  @media (min-width: ${breakpoints.tablet}) {
    font-size: ${fonts.title};
  }
`
