import React from "react";
import { ComparisonResult } from "../../utils/ranking/newRankingEngine";
import * as Styled from "./UndoLastChoice.styled";

export interface UndoLastChoiceProps {
  lastComparison: ComparisonResult | null;
  canUndo: boolean;
  onUndo: () => void;
}

/**
 * Component that displays the last choice made and provides an undo button
 * Meets WCAG 2.2 Level AA accessibility standards
 */
export default function UndoLastChoice({
  lastComparison,
  canUndo,
  onUndo,
}: UndoLastChoiceProps) {
  if (!lastComparison || !canUndo) {
    return null;
  }

  const winner = lastComparison.winner;
  const loser = lastComparison.loser;

  return (
    <Styled.UndoContainer role="region" aria-labelledby="undo-heading">
      <Styled.LastChoiceInfo>
        <Styled.LastChoiceText
          id="undo-heading"
          as="h3"
          colour="slateGrey"
          fontSize="small"
          aria-live="polite"
        >
          {winner.name} was ranked above {loser.name}
        </Styled.LastChoiceText>
      </Styled.LastChoiceInfo>

      <Styled.UndoButtonContainer>
        <Styled.UndoButton
          onClick={onUndo}
          aria-label="Undo your last choice"
          aria-describedby="undo-heading"
          type="button"
        >
          Undo last choice
        </Styled.UndoButton>
      </Styled.UndoButtonContainer>
    </Styled.UndoContainer>
  );
}
