import * as Styled from './RankingControls.styled'

interface RankingControlsProps {
  onReset: () => void
  canUndo?: boolean
  onUndo?: () => void
}

export default function RankingControls({
  onReset,
  canUndo = false,
  onUndo,
}: RankingControlsProps) {
  return (
    <Styled.ControlsContainer>
      {onUndo && (
        <Styled.UndoButton
          onClick={onUndo}
          $canUndo={canUndo}
          aria-label={
            canUndo
              ? 'Undo last choice'
              : 'No choices to undo - make some comparisons first'
          }
        >
          {canUndo ? 'Undo last choice' : 'No choices to undo'}
          {!canUndo && (
            <Styled.HelpText>Make some comparisons first</Styled.HelpText>
          )}
        </Styled.UndoButton>
      )}
      <Styled.ResetButton onClick={onReset} aria-label='Reset all rankings'>
        Reset all rankings
      </Styled.ResetButton>
    </Styled.ControlsContainer>
  )
}
