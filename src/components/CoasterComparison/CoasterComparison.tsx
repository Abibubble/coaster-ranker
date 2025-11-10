import { Coaster } from '../../types/data'
import { formatCountry } from '../../utils/ranking/rankingUtils'
import * as Styled from './CoasterComparison.styled'
import { Card } from '../Card'
import { Text } from '../Text'

interface CoasterComparisonProps {
  coaster1: Coaster
  coaster2: Coaster
  onChoose1?: () => void
  onChoose2?: () => void
  clickable?: boolean
  coaster1Label?: string
  coaster2Label?: string
}

// Helper function to check if a value exists and is not empty
const hasValue = (value: string | undefined): boolean => {
  return value !== undefined && value !== null && value.trim() !== ''
}

// Helper function to render a field only if it has a value
const renderField = (label: string, value: string | undefined) => {
  if (!hasValue(value)) {
    return null
  }
  return (
    <p>
      <Text bold>{label}:</Text> {value}
    </p>
  )
}

export default function CoasterComparison({
  coaster1,
  coaster2,
  onChoose1,
  onChoose2,
  clickable = true,
  coaster1Label,
  coaster2Label,
}: CoasterComparisonProps) {
  // Ensure we have labels for the cards, fallback to coaster name or a generic label
  const coaster1DisplayLabel =
    coaster1Label || (hasValue(coaster1.name) ? coaster1.name : 'Coaster 1')
  const coaster2DisplayLabel =
    coaster2Label || (hasValue(coaster2.name) ? coaster2.name : 'Coaster 2')

  return (
    <Styled.ComparisonArea>
      <Card
        title={coaster1DisplayLabel}
        subtitle={`${coaster1.park}${formatCountry(coaster1.country)}`}
        clickable={clickable}
        aria-label={
          clickable
            ? `Choose ${coaster1DisplayLabel} as your favorite`
            : undefined
        }
        onClick={clickable ? onChoose1 : undefined}
      >
        {renderField('Manufacturer', coaster1.manufacturer)}
        {renderField('Model', coaster1.model)}
        {renderField('Material', coaster1.material)}
        {renderField('Thrill Level', coaster1.thrillLevel)}
        {renderField('Country', coaster1.country)}
      </Card>

      <Styled.VersusText>VS</Styled.VersusText>

      <Card
        title={coaster2DisplayLabel}
        subtitle={`${coaster2.park}${formatCountry(coaster2.country)}`}
        clickable={clickable}
        aria-label={
          clickable
            ? `Choose ${coaster2DisplayLabel} as your favorite`
            : undefined
        }
        onClick={clickable ? onChoose2 : undefined}
      >
        {renderField('Manufacturer', coaster2.manufacturer)}
        {renderField('Model', coaster2.model)}
        {renderField('Material', coaster2.material)}
        {renderField('Thrill Level', coaster2.thrillLevel)}
        {renderField('Country', coaster2.country)}
      </Card>
    </Styled.ComparisonArea>
  )
}
