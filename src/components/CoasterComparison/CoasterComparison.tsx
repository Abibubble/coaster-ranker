import { Coaster } from '../../types/data'
import { formatCountry } from '../../utils/rankingUtils'
import * as Styled from '../../pages/Rank/Rank.styled'

interface CoasterComparisonProps {
  coaster1: Coaster
  coaster2: Coaster
  onChoose1: () => void
  onChoose2: () => void
}

export default function CoasterComparison({
  coaster1,
  coaster2,
  onChoose1,
  onChoose2,
}: CoasterComparisonProps) {
  return (
    <Styled.ComparisonArea>
      <Styled.CoasterCard
        aria-label={`Choose ${coaster1.name} as your favorite`}
        onClick={onChoose1}
      >
        <Styled.CoasterName>{coaster1.name}</Styled.CoasterName>
        <Styled.CoasterPark>
          {coaster1.park}
          {formatCountry(coaster1.country)}
        </Styled.CoasterPark>
        <Styled.CoasterDetails>
          <p>
            <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
            {coaster1.manufacturer}
          </p>
          <p>
            <Styled.BoldText>Model:</Styled.BoldText> {coaster1.model}
          </p>
          <p>
            <Styled.BoldText>Type:</Styled.BoldText> {coaster1.type}
          </p>
        </Styled.CoasterDetails>
      </Styled.CoasterCard>

      <Styled.VersusText>VS</Styled.VersusText>

      <Styled.CoasterCard
        aria-label={`Choose ${coaster2.name} as your favorite`}
        onClick={onChoose2}
      >
        <Styled.CoasterName>{coaster2.name}</Styled.CoasterName>
        <Styled.CoasterPark>
          {coaster2.park}
          {formatCountry(coaster2.country)}
        </Styled.CoasterPark>
        <Styled.CoasterDetails>
          <p>
            <Styled.BoldText>Manufacturer:</Styled.BoldText>{' '}
            {coaster2.manufacturer}
          </p>
          <p>
            <Styled.BoldText>Model:</Styled.BoldText> {coaster2.model}
          </p>
          <p>
            <Styled.BoldText>Type:</Styled.BoldText> {coaster2.type}
          </p>
        </Styled.CoasterDetails>
      </Styled.CoasterCard>
    </Styled.ComparisonArea>
  )
}
