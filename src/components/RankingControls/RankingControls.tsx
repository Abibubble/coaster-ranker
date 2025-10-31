import React from 'react'
import * as Styled from './RankingControls.styled'

interface RankingControlsProps {
  onUndo?: () => void
  onReset: () => void
  canUndo?: boolean
}

export default function RankingControls({
  onUndo,
  onReset,
  canUndo = false,
}: RankingControlsProps) {
  return (
    <Styled.ControlsContainer>
      {onUndo && (
        <Styled.UndoButton
          onClick={onUndo}
          disabled={!canUndo}
          aria-label='Undo last choice'
        >
          Undo Last Choice
        </Styled.UndoButton>
      )}
      <Styled.ResetButton onClick={onReset} aria-label='Reset all rankings'>
        Reset All Rankings
      </Styled.ResetButton>
    </Styled.ControlsContainer>
  )
}
