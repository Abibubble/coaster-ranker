import styled from 'styled-components'
import { spacing, colours } from '../../theme'
import { Text } from '../../components'

export const PageContent = styled.div`
  padding: 0 ${spacing.medium};
  margin-bottom: ${spacing.large};
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
    // Don't forward Text component's custom props to the DOM
    const customProps = ['italic', 'mt']
    return !customProps.includes(prop)
  },
})`
  padding-top: ${spacing.medium};
  border-top: 1px solid ${colours.lightGrey};
`
