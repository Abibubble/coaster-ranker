import styled from 'styled-components'
import { spacing } from '../../theme'
import { Text } from '../Text'

export const ControlsContainer = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: center;
  margin: ${spacing.small} 0;
`

export const HelpText = styled(Text).withConfig({
  shouldForwardProp: prop => {
    const customProps = ['colour', 'fontSize', 'mt']
    return !customProps.includes(prop)
  },
})`
  display: block;
  font-weight: normal;
`
