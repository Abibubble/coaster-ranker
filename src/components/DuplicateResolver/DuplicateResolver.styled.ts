import { breakpoints, colours, fonts, spacing, textSpacing } from '../../theme'
import styled from 'styled-components'
import { Button } from '../Button'

export const DuplicateContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${textSpacing.medium};

  @media (max-width: ${breakpoints.tabletLarge}) {
    padding: ${textSpacing.small};
  }
`

export const DuplicateHeader = styled.div`
  text-align: center;
  margin-bottom: ${textSpacing.large};
  padding: ${textSpacing.medium};
  background: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.small};
`

export const DuplicateItem = styled.div`
  background: ${colours.white};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.small};
  padding: ${textSpacing.medium};
  margin-bottom: ${textSpacing.large};
  box-shadow: 0 2px 4px ${colours.shadowLight};

  @media (max-width: ${breakpoints.tabletLarge}) {
    padding: ${textSpacing.small};
    margin-bottom: ${textSpacing.medium};
  }
`

export const MatchInfo = styled.div`
  background: ${colours.veryLightGrey};
  border: ${spacing.micro} solid ${colours.lightGrey};
  border-radius: ${spacing.fine};
  padding: ${textSpacing.small};
  margin-bottom: ${textSpacing.medium};
  text-align: center;

  @media (max-width: ${breakpoints.mobileLarge}) {
    font-size: ${fonts.small};
    padding: ${textSpacing.tiny};
  }
`

export const ComparisonWrapper = styled.div`
  margin: ${textSpacing.medium} 0;

  @media (max-width: ${breakpoints.mobileLarge}) {
    margin: ${textSpacing.small} 0;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${textSpacing.small};
  margin-top: ${textSpacing.medium};
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
    gap: ${textSpacing.tiny};
  }
`

export const DuplicateButton = styled(Button)<{
  $isSelected?: boolean
}>`
  padding: ${spacing.small} ${spacing.medium};
  font-size: ${fonts.body};
  min-height: 44px;
  min-width: 120px;
  opacity: ${props => (props.$isSelected ? 1 : 0.8)};
  font-weight: ${props => (props.$isSelected ? 'bold' : 'normal')};
  border: 2px solid
    ${props => (props.$isSelected ? colours.blue : 'transparent')};

  @media (max-width: ${breakpoints.mobileLarge}) {
    width: 100%;
    margin-bottom: ${textSpacing.tiny};
  }
`

export const ActionButtons = styled.div`
  display: flex;
  gap: ${textSpacing.medium};
  margin-top: ${textSpacing.large};
  justify-content: center;
  align-items: flex-start;

  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    gap: ${textSpacing.small};
  }
`

export const ProgressInfo = styled.div`
  background: ${colours.warningBg};
  border: ${spacing.micro} solid ${colours.yellow};
  border-radius: ${spacing.fine};
  padding: ${textSpacing.small};
  font-size: ${fonts.body};
  color: ${colours.darkGrey};
  text-align: center;
  max-width: 400px;
  word-wrap: break-word;

  @media (max-width: ${breakpoints.tablet}) {
    max-width: 100%;
    margin-bottom: ${textSpacing.small};
  }
`

export const ActionButtonsRow = styled.div`
  display: flex;
  gap: ${textSpacing.medium};
  justify-content: center;

  @media (max-width: ${breakpoints.mobileLarge}) {
    flex-direction: column;
    gap: ${textSpacing.small};
    width: 100%;

    ${DuplicateButton} {
      width: 100%;
    }
  }
`
