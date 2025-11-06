import styled from 'styled-components'
import { colours, fonts, spacing, shadows } from '../../theme'
import { Text } from '../Text'
import { Button } from '../Button'

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

export const QuestionContent = styled.div`
  padding: ${spacing.medium} ${spacing.large};
`

export const ExplanationText = styled(Text)`
  line-height: 1.5;
`

export const ButtonContainer = styled.div`
  padding: ${spacing.medium} ${spacing.large} ${spacing.large};
  display: flex;
  flex-direction: column;
  gap: ${spacing.small};
`

export const ActionButton = styled(Button)`
  width: 100%;
`
