import styled from 'styled-components'
import { colours, spacing } from '../../theme'

export const ControlsContainer = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: center;
  margin: ${spacing.small} 0;
`

export const UndoButton = styled.button<{ disabled?: boolean }>`
  padding: ${spacing.tiny} ${spacing.small};
  background: ${props => (props.disabled ? colours.mutedGrey : colours.yellow)};
  color: ${props => (props.disabled ? colours.white : colours.charcoal)};
  border: none;
  border-radius: ${spacing.tiny};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  transition: background-color 0.2s ease;
  opacity: ${props => (props.disabled ? 0.6 : 1)};

  &:hover {
    background: ${props =>
      props.disabled ? colours.mutedGrey : colours.darkerYellow};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${spacing.fine} rgba(255, 193, 7, 0.25);
  }
`

export const ResetButton = styled.button`
  padding: ${spacing.tiny} ${spacing.small};
  background: ${colours.red};
  color: ${colours.white};
  border: none;
  border-radius: ${spacing.tiny};
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${colours.darkRed};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 ${spacing.fine} rgba(220, 53, 69, 0.25);
  }
`
