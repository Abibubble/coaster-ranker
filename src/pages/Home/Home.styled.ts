import styled from 'styled-components'
import { spacing, textSpacing } from '../../theme'
import { Text } from '../../components'

export const Section = styled.section`
  margin-bottom: ${spacing.large};
`

export const SubSectionTitle = styled(Text)`
  margin-top: ${textSpacing.medium};
`

export const OrderedList = styled.ol`
  margin: ${textSpacing.small} 0;
  padding-left: ${textSpacing.medium};
`
