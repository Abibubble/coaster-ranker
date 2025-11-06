import { Coaster } from '../../types/data'
import { formatCountry } from '../../utils/ranking/rankingUtils'
import * as Styled from './CoasterComparison.styled'
import { Card, Text } from '../'

interface CoasterComparisonProps {
  coaster1: Coaster
  coaster2: Coaster
  onChoose1?: () => void
  onChoose2?: () => void
  clickable?: boolean
  coaster1Label?: string
  coaster2Label?: string
}

export default function CoasterComparison({
  coaster1,
  coaster2,
  onChoose1,
  onChoose2,
  clickable = true,
  coaster1Label = coaster1.name,
  coaster2Label = coaster2.name,
}: CoasterComparisonProps) {
  return (
    <Styled.ComparisonArea>
      <Card
        title={coaster1Label}
        subtitle={`${coaster1.park}${formatCountry(coaster1.country)}`}
        clickable={clickable}
        aria-label={
          clickable ? `Choose ${coaster1.name} as your favorite` : undefined
        }
        onClick={clickable ? onChoose1 : undefined}
      >
        <p>
          <Text bold>Manufacturer:</Text> {coaster1.manufacturer}
        </p>
        <p>
          <Text bold>Model:</Text> {coaster1.model}
        </p>
        <p>
          <Text bold>Material:</Text> {coaster1.material}
        </p>
        <p>
          <Text bold>Country:</Text> {coaster1.country || 'Not specified'}
        </p>
      </Card>

      <Styled.VersusText>VS</Styled.VersusText>

      <Card
        title={coaster2Label}
        subtitle={`${coaster2.park}${formatCountry(coaster2.country)}`}
        clickable={clickable}
        aria-label={
          clickable ? `Choose ${coaster2.name} as your favorite` : undefined
        }
        onClick={clickable ? onChoose2 : undefined}
      >
        <p>
          <Text bold>Manufacturer:</Text> {coaster2.manufacturer}
        </p>
        <p>
          <Text bold>Model:</Text> {coaster2.model}
        </p>
        <p>
          <Text bold>Material:</Text> {coaster2.material}
        </p>
        <p>
          <Text bold>Country:</Text> {coaster2.country || 'Not specified'}
        </p>
      </Card>
    </Styled.ComparisonArea>
  )
}
