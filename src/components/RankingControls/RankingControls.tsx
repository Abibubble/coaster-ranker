import { Button } from '../'
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
  const handleUndoClick = () => {
    if (canUndo && onUndo) {
      onUndo()
    }
  }

  return (
    <Styled.ControlsContainer>
      {onUndo && (
        <Button
          onClick={handleUndoClick}
          variant={canUndo ? 'warning' : 'disabled'}
          aria-label={
            canUndo
              ? 'Undo last choice'
              : 'No choices to undo - make some comparisons first'
          }
        >
          {canUndo ? 'Undo last choice' : 'No choices to undo'}
          {!canUndo && (
            <Styled.HelpText colour='white' fontSize='small' mt='fine'>
              Make some comparisons first
            </Styled.HelpText>
          )}
        </Button>
      )}
      <Button
        onClick={onReset}
        variant='destructive'
        aria-label='Reset all rankings'
      >
        Reset all rankings
      </Button>
    </Styled.ControlsContainer>
  )
}
