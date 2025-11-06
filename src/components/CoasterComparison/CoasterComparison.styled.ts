import styled from 'styled-components'
import { breakpoints, colours, fonts, spacing } from '../../theme'

export const ComparisonArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: ${spacing.small};
  margin: ${spacing.medium} 0;
  padding: 0 ${spacing.tiny};

  @media (min-width: ${breakpoints.mobileLarge}) {
    padding: 0;
    margin: ${spacing.large} 0;
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    flex-direction: row;
    gap: ${spacing.medium};
  }
`

export const VersusText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: ${colours.mediumGrey};
  margin: ${spacing.tiny} 0;
  font-size: ${fonts.medium};

  @media (min-width: ${breakpoints.mobileLarge}) {
    margin: ${spacing.small} 0;
    font-size: ${fonts.large};
  }

  @media (min-width: ${breakpoints.tabletLarge}) {
    margin: 0 ${spacing.small};
  }
`
