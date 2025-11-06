import styled from 'styled-components'
import { colours, spacing, textSpacing } from '../../theme'

export const ProgressContainer = styled.div`
  text-align: center;
  margin-bottom: ${spacing.medium};
  padding: ${spacing.small} ${spacing.medium};
  background: ${colours.paleGrey};
  border-radius: ${spacing.tiny};
  border: ${spacing.micro} solid ${colours.softGrey};
`

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${colours.borderGrey};
  border-radius: ${spacing.tiny};
  margin: ${textSpacing.small} 0 0 0;
  height: ${spacing.tiny};
`

export const ProgressBar = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  background-color: ${colours.blue};
  height: 100%;
  border-radius: ${spacing.tiny};
  transition: width 0.3s ease;
`
