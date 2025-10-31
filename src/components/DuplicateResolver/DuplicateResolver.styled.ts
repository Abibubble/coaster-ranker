import { breakpoints, colours, fonts, spacing, textSpacing } from '../../theme'
import styled from 'styled-components'

export const DuplicateContainer = styled.div`
  background: ${colours.successBg};
  border: ${spacing.micro} solid ${colours.yellow};
  border-radius: ${spacing.tiny};
  padding: ${textSpacing.small};
  margin: ${textSpacing.small} 0;
`

export const BoldText = styled.span`
  font-weight: bold;
`

export const DuplicateHeader = styled.div`
  margin-bottom: ${textSpacing.small};
`

export const DuplicateTitle = styled.h3`
  color: ${colours.warningYellow};
  margin: 0 0 ${textSpacing.tiny} 0;
  font-size: ${fonts.large};
`

export const DuplicateDescription = styled.p`
  color: ${colours.warningYellow};
  margin: 0;
  font-size: ${fonts.small};
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

export const CoasterComparison = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${textSpacing.small};
  align-items: start;
  margin: ${textSpacing.small} 0;

  @media (max-width: ${breakpoints.tabletLarge}) {
    grid-template-columns: 1fr;
    gap: ${textSpacing.tiny};
  }
`

export const CoasterCard = styled.div`
  background: ${colours.paleGrey};
  border: ${spacing.micro} solid ${colours.borderGrey};
  border-radius: ${spacing.fine};
  padding: ${textSpacing.small};
`

export const CoasterTitle = styled.h4`
  margin: 0 0 ${textSpacing.tiny} 0;
  font-size: ${fonts.body};
  color: ${colours.darkGrey};
`

export const CoasterDetails = styled.div`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};

  p {
    margin: ${textSpacing.fine} 0;
  }
`

export const VersusText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${colours.warningYellow};

  @media (max-width: ${breakpoints.tabletLarge}) {
    display: none;
  }
`

export const MatchInfo = styled.div`
  background: ${colours.veryLightBlue};
  border: ${spacing.micro} solid ${colours.lightBlue};
  border-radius: ${spacing.fine};
  padding: ${textSpacing.tiny};
  margin: ${textSpacing.small} 0;
  font-size: ${fonts.small};

  strong {
    color: ${colours.darkerBlue};
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${textSpacing.tiny};
  margin-top: ${textSpacing.medium};
  flex-wrap: wrap;
`

export const DuplicateButton = styled.button<{
  variant: 'existing' | 'new' | 'both'
}>`
  padding: ${spacing.tiny} ${spacing.small};
  border: none;
  border-radius: ${spacing.fine};
  cursor: pointer;
  font-size: ${fonts.small};
  font-weight: 500;
  transition: all 0.2s ease;

  ${props => {
    switch (props.variant) {
      case 'existing':
        return `
          background: ${colours.red};
          color: ${colours.white};
          &:hover {
            background: ${colours.darkRed};
          }
        `
      case 'new':
        return `
          background: ${colours.lightGreen};
          color: ${colours.white};
          &:hover {
            background: ${colours.green};
          }
        `
      case 'both':
        return `
          background: ${colours.lightBlue};
          color: ${colours.white};
          &:hover {
            background: ${colours.darkerBlue};
          }
        `
    }
  }}
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

export const ActionButton = styled.button<{ primary?: boolean }>`
  padding: ${spacing.small} ${spacing.medium};
  border: none;
  border-radius: ${spacing.fine};
  cursor: pointer;
  font-size: ${fonts.body};
  font-weight: 500;
  transition: all 0.2s ease;

  ${props =>
    props.primary
      ? `
    background: ${colours.lightBlue};
    color: ${colours.white};
    &:hover {
      background: ${colours.darkerBlue};
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `
      : `
    background: ${colours.mutedGrey};
    color: ${colours.white};
    &:hover {
      background: ${colours.slateGrey};
    }
  `}
`
