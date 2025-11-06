import { breakpoints, colours, fonts, spacing, textSpacing } from '../../theme'
import styled from 'styled-components'
import { Text } from '../Text'
import { Button } from '../Button'

export const DuplicateContainer = styled.div`
  background: ${colours.successBg};
  border: ${spacing.micro} solid ${colours.yellow};
  border-radius: ${spacing.tiny};
  padding: ${textSpacing.small};
  margin: ${textSpacing.small} 0;
`

export const DuplicateHeader = styled.div`
  margin-bottom: ${textSpacing.small};
`

export const DuplicateItem = styled.div`
  background: ${colours.white};
  border: ${spacing.micro} solid ${colours.yellow};
  border-radius: ${spacing.tiny};
  padding: ${textSpacing.small};
  margin: ${textSpacing.small} 0;

  @media (max-width: ${breakpoints.tabletLarge}) {
    padding: ${textSpacing.tiny};
    margin: ${textSpacing.tiny} 0;
  }
`

export const MatchInfo = styled(Text)`
  background: ${colours.veryLightBlue};
  border: ${spacing.micro} solid ${colours.lightBlue};
  border-radius: ${spacing.fine};
  padding: ${textSpacing.tiny};
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${textSpacing.tiny};
  margin-top: ${textSpacing.medium};
  flex-wrap: wrap;
`

export const DuplicateButton = styled(Button)<{
  $isSelected?: boolean
}>`
  padding: ${spacing.tiny} ${spacing.small};
  font-size: ${fonts.small};
  min-height: auto;
  opacity: ${props => (props.$isSelected ? 1 : 0.7)};
  font-weight: ${props => (props.$isSelected ? 'bold' : 'normal')};
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${textSpacing.medium};
  margin-top: ${textSpacing.large};
  flex-wrap: wrap;
  align-items: center;
`

export const ProgressInfo = styled.div`
  background: ${colours.veryLightBlue};
  border: ${spacing.micro} solid ${colours.lightBlue};
  border-radius: ${spacing.fine};
  padding: ${textSpacing.tiny};
  font-size: ${fonts.small};
  color: ${colours.darkerBlue};
  flex: 1;
  min-width: ${breakpoints.mobileMedium};
`
