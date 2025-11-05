import styled from 'styled-components'
import { colours, fonts, shadows, spacing, textSpacing } from '../../theme'
import { Text } from '../'

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

export const HierarchicalHeader = styled.div`
  margin-bottom: ${textSpacing.medium};
`

export const CompletionContainer = styled.div`
  margin: ${textSpacing.medium} 0;
`

export const GroupOrderItem = styled.li`
  margin-bottom: ${textSpacing.tiny};
`

export const GroupCount = styled(Text)`
  font-size: ${fonts.small};
  color: ${colours.mediumGrey};
  margin-left: ${textSpacing.tiny};
`
