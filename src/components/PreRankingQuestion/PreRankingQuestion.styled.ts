import styled from 'styled-components'
import { colours, fonts, spacing, shadows } from '../../theme'

export const OverlayContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${spacing.medium};
`

export const QuestionCard = styled.div`
  background: ${colours.white};
  border-radius: ${spacing.tiny};
  box-shadow: ${shadows.heavy};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
`

export const QuestionHeader = styled.div`
  padding: ${spacing.large} ${spacing.large} ${spacing.medium};
  border-bottom: ${spacing.micro} solid ${colours.borderGrey};
`

export const QuestionTitle = styled.h2`
  margin: 0 0 ${spacing.tiny};
  color: ${colours.charcoal};
  font-size: ${fonts.large};
  font-weight: 600;
`

export const QuestionSubtitle = styled.p`
  margin: 0;
  color: ${colours.mediumGrey};
  font-size: ${fonts.small};
`

export const QuestionContent = styled.div`
  padding: ${spacing.medium} ${spacing.large};
`

export const QuestionText = styled.p`
  margin: 0 0 ${spacing.medium};
  color: ${colours.charcoal};
  font-size: ${fonts.body};
  font-weight: 500;
`

export const ExplanationText = styled.p`
  margin: 0 0 ${spacing.small};
  color: ${colours.mediumGrey};
  font-size: ${fonts.small};
  line-height: 1.5;

  strong {
    color: ${colours.charcoal};
    font-weight: 600;
  }
`

export const ButtonContainer = styled.div`
  padding: ${spacing.medium} ${spacing.large} ${spacing.large};
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
`

export const ActionButton = styled.button<{ $primary?: boolean }>`
  padding: ${spacing.small} ${spacing.medium};
  border: none;
  border-radius: ${spacing.fine};
  cursor: pointer;
  font-size: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease;

  ${props =>
    props.$primary
      ? `
    background: ${colours.green};
    color: ${colours.white};
    &:hover {
      background: ${colours.darkBlue};
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `
      : `
    background: ${colours.lightBlue};
    color: ${colours.white};
    &:hover {
      background: ${colours.darkerBlue};
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `}

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }
`

export const CancelButton = styled.button`
  padding: ${spacing.small} ${spacing.medium};
  border: ${spacing.micro} solid ${colours.mutedGrey};
  border-radius: ${spacing.fine};
  background: ${colours.white};
  color: ${colours.mutedGrey};
  cursor: pointer;
  font-size: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${colours.darkGrey};
    color: ${colours.darkGrey};
  }

  &:focus {
    outline: ${spacing.mini} solid ${colours.blue};
    outline-offset: ${spacing.mini};
  }
`
