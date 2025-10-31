import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const ControlsContainer = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: center;
  margin: ${spacing.small} 0;
`

export const UndoButton = styled.button<{ $canUndo?: boolean }>`
  padding: ${spacing.tiny} ${spacing.small};
  background: ${props =>
    !props.$canUndo ? colours.slateGrey : colours.yellow};
  color: ${props => (!props.$canUndo ? colours.white : colours.black)};
  border: none;
  border-radius: ${spacing.tiny};
  cursor: ${props => (!props.$canUndo ? 'not-allowed' : 'pointer')};
  font-weight: 500;
  transition: background-color 0.2s ease;
  opacity: 1;

  &:hover {
    background: ${props =>
      !props.$canUndo ? colours.mutedGrey : colours.orange};
  }
`

export const HelpText = styled.span`
  display: block;
  font-size: ${fonts.small};
  font-weight: normal;
  margin-top: ${spacing.fine};
  color: ${colours.white};
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
