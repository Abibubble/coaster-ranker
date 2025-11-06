import styled from 'styled-components'
import { spacing, colours, breakpoints } from '../../theme'
import { Text } from '../../components'

export const PageContent = styled.div`
  margin-bottom: ${spacing.large};
  box-sizing: border-box;
  padding: 0 ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: 0 ${spacing.medium};
  }
`

export const Section = styled.section`
  margin-bottom: ${spacing.large};
`

export const List = styled.ul`
  margin: ${spacing.small} 0 ${spacing.medium};
  padding-left: ${spacing.medium};

  li {
    margin-bottom: ${spacing.small};
  }
`

export const FooterText = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['italic', 'mt']
    return !customProps.includes(prop)
  },
})`
  padding-top: ${spacing.medium};
  border-top: 1px solid ${colours.lightGrey};
`
