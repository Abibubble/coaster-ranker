import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'
import { Text } from '../../components'

export const PageContent = styled.div`
  margin-bottom: ${spacing.large};
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

export const ContactInfo = styled.div`
  background-color: ${colours.paleGrey};
  border: ${spacing.mini} solid ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  margin: ${spacing.medium} 0;
  box-sizing: border-box;
  padding: ${spacing.small};
  margin: ${spacing.small} 0;

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: ${spacing.medium} ${spacing.large};
    margin: ${spacing.medium} 0;
  }
`

export const KeyboardShortcut = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['colour']
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
    const customProps = ['italic', 'mt']
    return !customProps.includes(prop)
  },
})`
  padding-top: ${spacing.medium};
  border-top: 1px solid ${colours.lightGrey};
`
