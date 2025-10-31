import { useState } from 'react'
import { Card, MainContent, Title, ViewLink } from '../../components'
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

    setUploadedData({
      ...uploadedData,
      coasters: updatedCoasters,
    })

    // Announce removal to screen readers
    setStatusMessage(`${coasterName} has been removed from your collection.`)
    setTimeout(() => setStatusMessage(''), 3000)
  }

  if (coasters.length === 0) {
    return (
      <MainContent>
        <Title>Your Coasters</Title>
        <Card>
          <Styled.EmptyState>
            <h2>No Coasters Yet</h2>
            <p>
              You haven't uploaded any coasters yet. Use one of the upload
              methods to add some coasters to your collection.
            </p>
            <Styled.UploadLink href='/upload'>
              Go to Upload Page
            </Styled.UploadLink>
          </Styled.EmptyState>
        </Card>
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

      <Card>
        <Styled.CoastersSummary>
          <h2>Your Collection</h2>
          <p>
            You have <Styled.BoldText>{coasters.length}</Styled.BoldText>{' '}
            coaster
            {coasters.length === 1 ? '' : 's'} in your collection.
          </p>
          {uploadedData?.uploadedAt && (
            <Styled.UploadInfo>
              Last updated: {uploadedData.uploadedAt.toLocaleDateString()}
            </Styled.UploadInfo>
          )}
        </Styled.CoastersSummary>

        <Styled.ActionsBar>
          <ViewLink href='/upload'>Add More Coasters</ViewLink>
          <ViewLink href='/rank'>Start Ranking</ViewLink>
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

          <Styled.TableBody role='rowgroup'>
            {coasters.map(coaster => (
              <Styled.TableRow key={coaster.id} role='row'>
                <Styled.TableCell role='cell'>
                  <Styled.CoasterName>{coaster.name}</Styled.CoasterName>
                </Styled.TableCell>
                <Styled.TableCell role='cell'>{coaster.park}</Styled.TableCell>
                <Styled.TableCell role='cell'>
                  {coaster.manufacturer}
                </Styled.TableCell>
                <Styled.TableCell role='cell'>{coaster.model}</Styled.TableCell>
                <Styled.TableCell role='cell'>{coaster.type}</Styled.TableCell>
                <Styled.TableCell role='cell'>
                  <Styled.RemoveButton
                    onClick={() => handleRemoveCoaster(coaster.id)}
                    aria-label={`Remove ${coaster.name} from collection`}
                  >
                    Remove
                  </Styled.RemoveButton>
                </Styled.TableCell>
              </Styled.TableRow>
            ))}
          </Styled.TableBody>
        </Styled.CoastersTable>

        <Styled.CoasterCount>
          Showing {coasters.length} coaster{coasters.length === 1 ? '' : 's'}
        </Styled.CoasterCount>
      </Card>
    </MainContent>
  )
}
