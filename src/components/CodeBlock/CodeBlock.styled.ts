import styled from 'styled-components'
import { colours, spacing } from '../../theme'
import { Text } from '../Text'

export const CodeBlock = styled(Text)`
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.fine};
  padding: ${spacing.small};
  font-family: 'Courier New', Monaco, monospace;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre;
`
