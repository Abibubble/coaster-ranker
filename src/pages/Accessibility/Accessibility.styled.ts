import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'
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

export const ContactInfo = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.mini} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  padding: ${spacing.medium};
  margin: ${spacing.medium} 0;

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.medium} ${spacing.large};
  }
`

export const KeyboardShortcut = styled(Text).withConfig({
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
  background-color: ${colours.darkGrey};
  color: ${colours.white};
  border: ${spacing.micro} solid ${colours.black};
  border-radius: ${spacing.fine};
  padding: ${spacing.tiny} ${spacing.small};
  font-family: 'Courier New', monospace;
  font-size: ${fonts.body};
  font-weight: 500;
  display: inline-block;
  margin-left: ${spacing.fine};
  margin-right: ${spacing.fine};
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
