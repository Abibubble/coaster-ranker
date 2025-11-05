import styled from 'styled-components'
import { spacing } from '../../theme'
import { Text } from '../Text/Text'

export const InfoMessage = styled(Text)<{
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
`
