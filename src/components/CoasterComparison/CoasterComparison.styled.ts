import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'

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
