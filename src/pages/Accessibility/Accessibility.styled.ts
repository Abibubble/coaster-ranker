import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'
import { Text } from '../../components/Text/Text'

export const PageContent = styled.div`
  padding: 0 ${spacing.medium};
`

export const Section = styled.section`
  margin-bottom: ${spacing.large};
`

export const SubsectionTitle = styled(Text)`
  margin: ${spacing.medium} 0 ${spacing.small};
`

export const List = styled.ul`
  margin: ${spacing.small} 0;
  padding-left: ${spacing.medium};
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

export const KeyboardShortcut = styled(Text)`
  background-color: ${colours.darkGrey};
  border: ${spacing.micro} solid ${colours.black};
  border-radius: ${spacing.fine};
  padding: ${spacing.tiny} ${spacing.small};
  font-family: 'Courier New', monospace;
  font-size: ${fonts.body};
  margin: 0 ${spacing.fine};
  font-weight: 500;
  display: inline-block;
`
