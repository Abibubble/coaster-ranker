import styled from 'styled-components'
import { colours, spacing } from '../../theme'
import { Text } from '../Text'

export const CodeBlock = styled(Text).withConfig({
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
  background-color: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.softGrey};
  border-radius: ${spacing.fine};
  padding: ${spacing.small};
  font-family: 'Courier New', Monaco, monospace;
  line-height: 1.4;
  overflow-x: auto;
  white-space: pre;
`
