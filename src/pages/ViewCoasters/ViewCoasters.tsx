import { useState } from 'react'
import { Button, MainContent, Title, Text, Link } from '../../components'
import { useData } from '../../contexts/DataContext'
import * as Styled from './ViewCoasters.styled'

export default function ViewCoasters() {
  const { uploadedData, setUploadedData } = useData()
  const [statusMessage, setStatusMessage] = useState<string>('')
  const coasters = uploadedData?.coasters || []

  const handleRemoveCoaster = (coasterId: string) => {
    if (!uploadedData) return

    const coasterToRemove = uploadedData.coasters.find(c => c.id === coasterId)
    const coasterName = coasterToRemove ? coasterToRemove.name : 'this coaster'

    const confirmRemove = window.confirm(
      `Are you sure you want to remove "${coasterName}" from your collection? This action cannot be undone.`
    )
    if (!confirmRemove) return

    const updatedCoasters = uploadedData.coasters.filter(
      coaster => coaster.id !== coasterId
    )

    // Update ranking metadata to remove references to the deleted coaster
    let updatedRankingMetadata = uploadedData.rankingMetadata
    if (updatedRankingMetadata && updatedRankingMetadata.rankedCoasters) {
      // Remove the coaster from the ranked list and update positions
      const filteredRankedCoasters =
        updatedRankingMetadata.rankedCoasters.filter(id => id !== coasterId)

      // If ranking exists and we removed a coaster, mark as incomplete
      updatedRankingMetadata = {
        ...updatedRankingMetadata,
        rankedCoasters: filteredRankedCoasters,
        isRanked:
          filteredRankedCoasters.length === updatedCoasters.length &&
          updatedCoasters.length > 0,
        // Clear completed comparisons that involved the removed coaster
        completedComparisons: new Set(
          Array.from(updatedRankingMetadata.completedComparisons || []).filter(
            comparison => !comparison.includes(coasterId)
          )
        ),
      }
    }

    setUploadedData({
      ...uploadedData,
      coasters: updatedCoasters,
      rankingMetadata: updatedRankingMetadata,
    })

    // Announce removal to screen readers
    setStatusMessage(`${coasterName} has been removed from your collection.`)
    setTimeout(() => setStatusMessage(''), 3000)
  }

  const handleRemoveAllCoasters = () => {
    if (!uploadedData || coasters.length === 0) return

    const coasterCount = coasters.length
    const confirmRemove = window.confirm(
      `Are you sure you want to remove all ${coasterCount} coaster${
        coasterCount === 1 ? '' : 's'
      } from your collection? This action cannot be undone.`
    )

    if (!confirmRemove) return

    // Completely clear all data from localStorage by setting to null
    setUploadedData(null)

    // Announce removal to screen readers
    setStatusMessage(
      `All ${coasterCount} coaster${
        coasterCount === 1 ? '' : 's'
      } have been removed from your collection.`
    )
    setTimeout(() => setStatusMessage(''), 3000)
  }

  if (coasters.length === 0) {
    return (
      <MainContent>
        <Title>Your Coasters</Title>
        <section>
          <Styled.EmptyState>
            <Text as='h2' center colour='darkGrey' mb='medium' fontSize='large'>
              No Coasters Yet
            </Text>
            <Text as='p' center colour='mediumGrey' mb='large'>
              You haven't uploaded any coasters yet. Use one of the upload
              methods to add some coasters to your collection.
            </Text>
            <Link href='/upload' variant='button'>
              Go to Upload Page
            </Link>
          </Styled.EmptyState>
        </section>
      </MainContent>
    )
  }

  return (
    <MainContent>
      <Title>Your Coasters</Title>

      {statusMessage && (
        <div
          role='status'
          aria-live='polite'
          style={{
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          {statusMessage}
        </div>
      )}

      <section>
        <Styled.CoastersSummary>
          <Text as='h2' colour='charcoal' fontSize='large' mb='small'>
            Your Collection
          </Text>
          <Text as='p' colour='mediumGrey' mb='small'>
            You have <Text bold>{coasters.length}</Text> coaster
            {coasters.length === 1 ? '' : 's'} in your collection.
          </Text>
          {uploadedData?.uploadedAt && (
            <Text as='p' colour='mutedGrey' fontSize='small' italic>
              Last updated: {uploadedData.uploadedAt.toLocaleDateString()}
            </Text>
          )}
        </Styled.CoastersSummary>

        <Styled.ActionsBar>
          <Link href='/upload' variant='button'>
            Add More Coasters
          </Link>
          <Link href='/rank' variant='button'>
            Start Ranking
          </Link>
          <Button
            variant='destructive'
            onClick={handleRemoveAllCoasters}
            aria-label={`Remove all ${coasters.length} coaster${
              coasters.length === 1 ? '' : 's'
            } from collection`}
          >
            Remove All Coasters
          </Button>
        </Styled.ActionsBar>

        <Styled.CoastersTable role='table' aria-label='Coaster collection data'>
          <Styled.TableHeader role='row'>
            <Styled.HeaderCell role='columnheader'>Name</Styled.HeaderCell>
            <Styled.HeaderCell role='columnheader'>Park</Styled.HeaderCell>
            <Styled.HeaderCell role='columnheader'>
              Manufacturer
            </Styled.HeaderCell>
            <Styled.HeaderCell role='columnheader'>Model</Styled.HeaderCell>
            <Styled.HeaderCell role='columnheader'>Type</Styled.HeaderCell>
            <Styled.HeaderCell role='columnheader'>Actions</Styled.HeaderCell>
          </Styled.TableHeader>

          <div role='rowgroup'>
            {coasters.map(coaster => (
              <Styled.TableRow key={coaster.id} role='row'>
                <Styled.TableCell role='cell'>
                  <Text bold colour='charcoal' mb='tiny'>
                    {coaster.name}
                  </Text>
                </Styled.TableCell>
                <Styled.TableCell role='cell'>{coaster.park}</Styled.TableCell>
                <Styled.TableCell role='cell'>
                  {coaster.manufacturer}
                </Styled.TableCell>
                <Styled.TableCell role='cell'>{coaster.model}</Styled.TableCell>
                <Styled.TableCell role='cell'>{coaster.type}</Styled.TableCell>
                <Styled.TableCell role='cell'>
                  <Button
                    variant='destructive'
                    onClick={() => handleRemoveCoaster(coaster.id)}
                    aria-label={`Remove ${coaster.name} from collection`}
                  >
                    Remove
                  </Button>
                </Styled.TableCell>
              </Styled.TableRow>
            ))}
          </div>
        </Styled.CoastersTable>

        <Text
          as='div'
          center
          colour='mutedGrey'
          fontSize='small'
          italic
          mt='medium'
        >
          Showing {coasters.length} coaster{coasters.length === 1 ? '' : 's'}
        </Text>
      </section>
    </MainContent>
  )
}
