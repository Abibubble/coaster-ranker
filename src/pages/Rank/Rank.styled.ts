import styled from 'styled-components'
import { colours, spacing, textSpacing } from '../../theme'

export const HierarchicalFallbackNotice = styled.div`
  margin-top: ${textSpacing.small};
  padding: ${textSpacing.small};
  background: ${colours.warningBg};
  border-radius: ${spacing.tiny};
  border-left: ${spacing.fine} solid ${colours.yellow};
`

export const RankingContainer = styled.div`
  margin-top: ${spacing.large};
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
