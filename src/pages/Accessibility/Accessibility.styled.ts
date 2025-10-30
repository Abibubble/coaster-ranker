import styled from 'styled-components'
import { spacing, fonts, colours, breakpoints } from '../../theme'

export const PageContent = styled.div`
  padding: 0 ${spacing.medium};
`

export const Section = styled.section`
  margin-bottom: ${spacing.large};
`

export const SectionTitle = styled.h2`
  font-size: ${fonts.large};
  color: ${colours.darkGrey};
  margin-bottom: ${spacing.medium};
  font-weight: 600;
`

export const SubsectionTitle = styled.h3`
  font-size: ${fonts.body};
  color: ${colours.darkGrey};
  margin: ${spacing.medium} 0 ${spacing.small} 0;
  font-weight: 600;
`

export const Paragraph = styled.p`
  margin-bottom: ${spacing.small};
  line-height: 1.6;
  color: ${colours.black};
`

export const List = styled.ul`
  margin: ${spacing.small} 0;
  padding-left: ${spacing.medium};

  li {
    margin-bottom: ${spacing.tiny};
    line-height: 1.6;
    color: ${colours.black};
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

export const ContactTitle = styled.h4`
  margin: 0 0 ${spacing.small} 0;
  font-size: ${fonts.body};
  font-weight: 600;
  color: ${colours.darkGrey};
`

export const ContactDetail = styled.p`
  margin: ${spacing.tiny} 0;
  line-height: 1.6;
  color: ${colours.black};
`

export const KeyboardShortcut = styled.code`
  background-color: ${colours.darkGrey};
  border: ${spacing.micro} solid ${colours.black};
  border-radius: ${spacing.fine};
  padding: ${spacing.tiny} ${spacing.small};
  font-family: 'Courier New', monospace;
  font-size: ${fonts.body};
  color: ${colours.white};
  margin: 0 ${spacing.fine};
  font-weight: 500;
  display: inline-block;
`
