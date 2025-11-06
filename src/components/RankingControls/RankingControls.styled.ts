import styled from 'styled-components'
import { colours, spacing } from '../../theme'
import { Text } from '../Text'

export const ControlsContainer = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: center;
  margin: ${spacing.small} 0;
`

export const HelpText = styled(Text)`
  display: block;
  font-weight: normal;
`
