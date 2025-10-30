import React from 'react'
import { Card, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import * as Styled from './ViewCoasters.styled'

export default function ViewCoasters() {
  const { uploadedData } = useData()
  const coasters = uploadedData?.coasters || []

  const formatValue = (value: string | number | undefined | null): string => {
    if (value === undefined || value === null) return '-'
    return String(value)
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

      <Card>
        <Styled.CoastersSummary>
          <h2>Your Collection</h2>
          <p>
            You have <strong>{coasters.length}</strong> coaster
            {coasters.length === 1 ? '' : 's'} in your collection.
          </p>
          {uploadedData?.uploadedAt && (
            <Styled.UploadInfo>
              Last updated: {uploadedData.uploadedAt.toLocaleDateString()}
            </Styled.UploadInfo>
          )}
        </Styled.CoastersSummary>

        <Styled.ActionsBar>
          <Styled.ActionButton href='/upload'>
            Add More Coasters
          </Styled.ActionButton>
          <Styled.ActionButton href='/rank'>Start Ranking</Styled.ActionButton>
        </Styled.ActionsBar>

        <Styled.CoastersTable>
          <Styled.TableHeader>
            <Styled.HeaderCell>Name</Styled.HeaderCell>
            <Styled.HeaderCell>Park</Styled.HeaderCell>
            <Styled.HeaderCell>Country</Styled.HeaderCell>
            <Styled.HeaderCell>Manufacturer</Styled.HeaderCell>
            <Styled.HeaderCell>Type</Styled.HeaderCell>
            <Styled.HeaderCell>Year</Styled.HeaderCell>
            <Styled.HeaderCell>Height</Styled.HeaderCell>
            <Styled.HeaderCell>Speed</Styled.HeaderCell>
          </Styled.TableHeader>

          <Styled.TableBody>
            {coasters.map(coaster => (
              <Styled.TableRow key={coaster.id}>
                <Styled.TableCell>
                  <Styled.CoasterName>{coaster.name}</Styled.CoasterName>
                  <Styled.CoasterModel>
                    {coaster.manufacturer} - {coaster.model}
                  </Styled.CoasterModel>
                </Styled.TableCell>
                <Styled.TableCell>{coaster.park}</Styled.TableCell>
                <Styled.TableCell>{coaster.country}</Styled.TableCell>
                <Styled.TableCell>{coaster.manufacturer}</Styled.TableCell>
                <Styled.TableCell>
                  <Styled.TypeBadge $type={coaster.type}>
                    {coaster.type}
                  </Styled.TypeBadge>
                </Styled.TableCell>
                <Styled.TableCell>{formatValue(coaster.year)}</Styled.TableCell>
                <Styled.TableCell>
                  {coaster.height ? `${coaster.height}m` : '-'}
                </Styled.TableCell>
                <Styled.TableCell>
                  {coaster.speed ? `${coaster.speed} km/h` : '-'}
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
