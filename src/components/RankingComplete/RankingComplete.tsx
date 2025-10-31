import React from 'react'
import { Coaster } from '../../types/data'
import * as Styled from '../../pages/Rank/Rank.styled'
import * as LocalStyled from './RankingComplete.styled'

interface RankingCompleteProps {
  rankedCoasters: Coaster[]
  onRankAgain: () => void
}

export default function RankingComplete({
  rankedCoasters,
  onRankAgain,
}: RankingCompleteProps) {
  return (
    <Styled.RankingComplete>
      <h2>Ranking Complete!</h2>
      <p>
        Your coasters have been ranked based on your preferences! Here's your
        final ranking:
      </p>
      <LocalStyled.ResultsList>
        <ol>
          {rankedCoasters.slice(0, 5).map((coaster, _index) => (
            <li key={coaster.id}>
              <LocalStyled.BoldText>{coaster.name}</LocalStyled.BoldText> at{' '}
              {coaster.park}
            </li>
          ))}
          {rankedCoasters.length > 5 && (
            <LocalStyled.MoreCoastersText>
              ...and {rankedCoasters.length - 5} more
            </LocalStyled.MoreCoastersText>
          )}
        </ol>
      </LocalStyled.ResultsList>
      <LocalStyled.Instructions>
        This ranking order will be used when you download your coaster
        collection.
      </LocalStyled.Instructions>
      <Styled.RestartButton onClick={onRankAgain}>
        Rank Again
      </Styled.RestartButton>
    </Styled.RankingComplete>
  )
}
