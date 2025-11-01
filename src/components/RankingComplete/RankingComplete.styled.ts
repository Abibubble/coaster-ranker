import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const BoldText = styled.span`
  font-weight: bold;
`

export const ResultsList = styled.div`
  margin: ${spacing.medium} 0;
  text-align: left;

  ol {
    padding-left: ${spacing.medium};
  }

  li {
    margin-bottom: ${spacing.tiny};
    line-height: 1.4;
  }
`

export const MoreCoastersText = styled.li`
  font-style: italic;
  color: ${colours.mediumGrey};
`

export const Instructions = styled.p`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};
  margin-bottom: ${spacing.small};
`

export const ButtonContainer = styled.div`
  display: flex;
  gap: ${spacing.small};
  justify-content: center;
  margin: ${spacing.medium} 0;

  @media (max-width: 630px) {
    flex-direction: column;
    align-items: center;
    width: 100%;

    > * {
      width: 100%;
      max-width: 300px;
    }
  }
`

export const AdjustButton = styled.button`
  background: ${colours.blue};
  color: ${colours.white};
  border: 2px solid transparent;
  padding: ${spacing.small} ${spacing.medium};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background: ${colours.darkBlue};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${colours.shadowMedium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.darkBlue};
    box-shadow: 0 0 0 3px ${colours.veryLightBlue};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px ${colours.shadowMedium};
  }
`

export const SaveButton = styled.button`
  background: ${colours.green};
  color: ${colours.white};
  border: 2px solid transparent;
  padding: ${spacing.small} ${spacing.medium};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background: ${colours.successGreen};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${colours.shadowMedium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.successGreen};
    box-shadow: 0 0 0 3px ${colours.successBg};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px ${colours.shadowMedium};
  }
`

export const CancelButton = styled.button`
  background: ${colours.mediumGrey};
  color: ${colours.white};
  border: 2px solid transparent;
  padding: ${spacing.small} ${spacing.medium};
  border-radius: 6px;
  cursor: pointer;
  font-size: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background: ${colours.darkGrey};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${colours.shadowMedium};
  }

  &:focus {
    outline: none;
    border-color: ${colours.darkGrey};
    box-shadow: 0 0 0 3px ${colours.veryLightGrey};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 1px 2px ${colours.shadowMedium};
  }
`

export const EditInstructions = styled.p`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};
  margin: 0 0 ${spacing.medium} 0;
  text-align: center;
  background: ${colours.veryLightGrey};
  padding: ${spacing.small};
  border-radius: 4px;
  border: 1px solid ${colours.lightGrey};
`

export const EditableList = styled.div`
  margin: ${spacing.medium} 0;
  text-align: left;

  ol {
    padding-left: 0;
    list-style: none;
  }
`

export const EditableItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.small};
  padding: ${spacing.small} ${spacing.medium};
  border: 1px solid ${colours.lightGrey};
  border-radius: 6px;
  background: ${colours.white};
  box-shadow: 0 1px 3px ${colours.shadowLight};
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${colours.blue};
  }

  &:focus-within {
    border-color: ${colours.blue};
    box-shadow: 0 0 0 2px ${colours.veryLightBlue};
  }
`

export const Position = styled.span`
  font-weight: bold;
  min-width: 40px;
  margin-right: ${spacing.small};
  color: ${colours.darkGrey};
  font-size: ${fonts.body};
`

export const CoasterInfo = styled.div`
  flex: 1;
  line-height: 1.5;
  margin-right: ${spacing.small};
  min-width: 0; /* Allows text to wrap properly */
`

export const MoveButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`

export const MoveButton = styled.button`
  background: ${colours.darkGrey};
  color: ${colours.white};
  border: 2px solid transparent;
  width: 44px;
  height: 44px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;

  /* Ensure sufficient contrast ratio for WCAG 2.1 AA */
  &:hover:not(:disabled) {
    background: ${colours.blue};
    border-color: ${colours.darkBlue};
    transform: translateY(-1px);
    box-shadow: 0 2px 4px ${colours.shadowMedium};
  }

  &:focus:not(:disabled) {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 3px ${colours.veryLightBlue};
  }

  &:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 1px 2px ${colours.shadowMedium};
  }

  &:disabled {
    background: ${colours.lightGrey};
    color: ${colours.mediumGrey};
    cursor: not-allowed;
    opacity: 0.6;
    border-color: transparent;
  }

  /* Improve touch targets for mobile */
  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
`

export const RedButton = styled.button`
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
