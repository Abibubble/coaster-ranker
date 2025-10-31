import styled from 'styled-components'
import { colours, fonts, spacing, textSpacing } from '../../theme'

export const ProgressContainer = styled.div`
  text-align: center;
  margin-bottom: ${spacing.medium};
  padding: ${spacing.small} ${spacing.medium};
  background: ${colours.paleGrey};
  border-radius: ${spacing.tiny};
  border: ${spacing.micro} solid ${colours.softGrey};
`

export const ProgressTitle = styled.h4`
  margin: 0 0 ${textSpacing.small} 0 !important;
  color: ${colours.slateGrey} !important;
  font-size: ${fonts.large} !important;
  font-weight: 600 !important;
`

export const ProgressText = styled.div`
  margin: 0 !important;
  font-size: ${fonts.body} !important;
  color: ${colours.mutedGrey} !important;
  font-weight: 500 !important;
`

export const BoldText = styled.span`
  font-weight: 700 !important;
  color: ${colours.blue} !important;
  font-size: ${fonts.large} !important;
`

export const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: ${colours.progressBarBg};
  border-radius: ${spacing.tiny};
  margin: ${textSpacing.small} 0 0 0;
  height: ${spacing.tiny};
`

export const ProgressBar = styled.div<{ progress: number }>`
  width: ${props => props.progress}%;
  background-color: ${colours.blue};
  height: 100%;
  border-radius: ${spacing.tiny};
  transition: width 0.3s ease;
`
