import styled from 'styled-components'
import {
  breakpoints,
  colours,
  fonts,
  shadows,
  spacing,
  textSpacing,
} from '../../theme'

export const BoldText = styled.span`
  font-weight: bold;
`

export const ComparisonArea = styled.div`
  display: flex;
  gap: ${spacing.medium};
  justify-content: center;
  margin: ${spacing.large} 0;

  @media (max-width: ${breakpoints.tabletLarge}) {
    flex-direction: column;
    gap: ${spacing.small};
  }
`

export const CoasterCard = styled.button`
  flex: 1;
  max-width: 300px;
  padding: ${spacing.medium};
  background: ${colours.paleGrey};
  border: ${spacing.mini} solid ${colours.softGrey};
  border-radius: ${spacing.small};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;

  &:hover {
    background: ${colours.softGrey};
    border-color: ${colours.blue};
    transform: translateY(-${spacing.mini});
    box-shadow: 0 ${spacing.fine} ${spacing.small} ${colours.shadowLight};
  }

  &:focus {
    outline: none;
    border-color: ${colours.blue};
    box-shadow: 0 0 0 ${spacing.fine} rgba(0, 123, 255, 0.25);
  }

  &:active {
    transform: translateY(0);
  }
`

export const CoasterName = styled.h3`
  margin: 0 0 ${spacing.tiny} 0;
  color: ${colours.darkGrey};
  font-size: ${fonts.large};
  font-weight: 600;
`

export const CoasterPark = styled.p`
  margin: 0 0 ${spacing.small} 0;
  color: ${colours.mediumGrey};
  font-weight: 500;
`

export const CoasterDetails = styled.div`
  margin-top: ${spacing.small};
  font-size: ${fonts.small};
  color: ${colours.textGrey};

  p {
    margin: ${spacing.fine} 0;
  }
`

export const VersusText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${fonts.large};
  font-weight: bold;
  color: ${colours.mediumGrey};
  margin: 0 ${spacing.small};

  @media (max-width: ${breakpoints.tabletLarge}) {
    margin: ${spacing.tiny} 0;
    font-size: ${fonts.large};
  }
`

export const ComparisonProgress = styled.div`
  text-align: center;
  margin-bottom: ${textSpacing.large};
  padding: ${textSpacing.medium};
  background: linear-gradient(
    135deg,
    ${colours.paleGrey} 0%,
    ${colours.softGrey} 100%
  );
  border-radius: ${spacing.small};
  border: ${spacing.micro} solid ${colours.borderGrey};
  box-shadow: ${shadows.light};
`

export const ProgressTitle = styled.h4`
  margin: 0 0 ${textSpacing.small} 0;
  color: ${colours.navyBlue};
  font-size: ${fonts.large};
  font-weight: 600;
`

export const ProgressStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${textSpacing.small};
  margin-bottom: ${textSpacing.small};
  flex-wrap: wrap;
`

export const ProgressStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${textSpacing.tiny};
`

export const ProgressNumber = styled.span`
  font-size: ${fonts.large};
  font-weight: bold;
  color: ${colours.lightBlue};
  line-height: 1;
`

export const ProgressLabel = styled.span`
  font-size: ${fonts.small};
  color: ${colours.mutedGrey};
  margin-top: ${textSpacing.fine};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const ProgressBarContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  background: ${colours.softGrey};
  border-radius: ${spacing.tiny};
  height: ${spacing.tiny};
  overflow: hidden;
  position: relative;
`

export const ProgressBar = styled.div<{ $progress: number }>`
  width: ${props => props.$progress}%;
  height: 100%;
  background: linear-gradient(
    90deg,
    ${colours.lightBlue} 0%,
    ${colours.darkerBlue} 100%
  );
  border-radius: ${spacing.tiny};
  transition: width 0.3s ease;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`

export const ProgressPercentage = styled.div`
  margin-top: ${textSpacing.tiny};
  font-size: ${fonts.small};
  color: ${colours.slateGrey};
  font-weight: 500;
`

export const HierarchicalHeader = styled.div`
  margin-bottom: ${textSpacing.medium};
`

export const CompletionContainer = styled.div`
  margin: ${textSpacing.medium} 0;
`

export const GroupOrderItem = styled.li`
  margin-bottom: ${textSpacing.tiny};
`

export const GroupCount = styled.span`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};
  margin-left: ${textSpacing.tiny};
`
