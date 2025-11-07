import styled from 'styled-components'
import { colours, shadows, spacing, textSpacing } from '../../theme'
import { Text } from '../Text'

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

export const ProgressStats = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${textSpacing.small};
  margin-bottom: ${textSpacing.small};
  flex-wrap: wrap;
`

export const ProgressStat = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${textSpacing.tiny};
`

export const ProgressNumber = styled(Text)`
  line-height: 1;
`

export const ProgressLabel = styled(Text)`
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
