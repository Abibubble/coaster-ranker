import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const CodeBlock = styled.pre`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.fine};
  padding: ${spacing.small};
  font-family: 'Courier New', Monaco, monospace;
  font-size: ${fonts.small};
  line-height: 1.4;
  overflow-x: auto;
  color: ${colours.slateGrey};
  margin: ${spacing.small} 0;
  white-space: pre;
`
