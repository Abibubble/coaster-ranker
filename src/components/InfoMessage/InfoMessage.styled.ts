import styled from 'styled-components'
import { spacing } from '../../theme'
import { Text } from '../Text/Text'

export const InfoMessage = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['mb', 'mt']
    return !customProps.includes(prop)
  },
})<{
  $bgColour: string
  $borderColour: string
}>`
  background-color: ${({ $bgColour }) => $bgColour};
  border: ${spacing.micro} solid ${({ $borderColour }) => $borderColour};
  border-radius: ${spacing.fine};
  padding: ${spacing.small};
  display: flex;
  align-items: center;
  gap: ${spacing.tiny};
  margin: ${spacing.small} 0;
`
