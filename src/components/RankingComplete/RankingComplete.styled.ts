import styled from 'styled-components'
import { colours, fonts, spacing } from '../../theme'

export const BoldText = styled.span`
  font-weight: bold;
`

export const ResultsList = styled.div`
  margin: ${spacing.medium} 0;
  text-align: left;

  ol {
    padding-left: ${spacing.medium};
  }

  li {
    margin-bottom: ${spacing.tiny};
    line-height: 1.4;
  }
`

export const MoreCoastersText = styled.li`
  font-style: italic;
  color: ${colours.mediumGrey};
`

export const Instructions = styled.p`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};
  margin-bottom: ${spacing.small};
`
