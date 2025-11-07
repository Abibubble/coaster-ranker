import styled from 'styled-components'
import { breakpoints, colours, spacing, textSpacing } from '../../theme'

export const HierarchicalFallbackNotice = styled.div`
  margin-top: ${textSpacing.small};
  padding: ${textSpacing.small};
  background: ${colours.warningBg};
  border-radius: ${spacing.tiny};
  border-left: ${spacing.fine} solid ${colours.yellow};
`

export const RankingContainer = styled.div`
  margin: 0 0 ${spacing.small};

  @media (min-width: ${breakpoints.tablet}) {
    margin: ${spacing.medium} 0;
  }
`

export const PreparingContainer = styled.div`
  text-align: center;
  padding: ${textSpacing.large};
`

export const UploadSummary = styled.div`
  margin-bottom: ${textSpacing.medium};
`

export const CoasterList = styled.div`
  margin: ${textSpacing.medium} 0;

  ul {
    list-style-type: decimal;
    padding-left: ${textSpacing.medium};
  }

  li {
    margin-bottom: ${textSpacing.tiny};
    line-height: 1.4;
  }
`

export const RankingInstructions = styled.div`
  margin-top: ${textSpacing.large};
  padding: ${textSpacing.small};
  background: ${colours.paleGrey};
  border-radius: ${spacing.tiny};

  p {
    margin: 0;
  }
`

export const NoDataSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: ${textSpacing.large} ${textSpacing.medium};
  margin: ${textSpacing.large} 0;
  background: ${colours.veryLightBlue};
  border: ${spacing.mini} solid ${colours.lightBlue};
  border-radius: ${spacing.small};

  @media (max-width: ${breakpoints.mobileSmall}) {
    padding: ${textSpacing.medium} ${textSpacing.small};
    margin: ${textSpacing.medium} 0;
  }

  @media (min-width: ${breakpoints.mobileSmall}) and (max-width: ${breakpoints.mobileMedium}) {
    padding: ${textSpacing.large} ${textSpacing.small};
  }

  @media (min-width: ${breakpoints.tablet}) {
    padding: ${textSpacing.huge} ${textSpacing.large};
    max-width: 600px;
    margin: ${textSpacing.large} auto;
  }
`
