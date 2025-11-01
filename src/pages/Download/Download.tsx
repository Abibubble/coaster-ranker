import { useState } from 'react'
import { MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import {
  generateCSV,
  generateJSON,
  downloadFile,
  hasRankingDataForExport,
} from '../../utils/dataExport'
import * as Styled from './Download.styled'

export default function Download() {
  const { uploadedData } = useData()
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)
  const [includeRanking, setIncludeRanking] = useState(false)

  const coasters = uploadedData?.coasters || []

  // Check if ranking data exists - either in individual coasters or in ranking metadata
  const hasRankingData = hasRankingDataForExport(uploadedData)

  const generateFilename = (
    basename: string,
    format: 'csv' | 'json'
  ): string => {
    const timestamp = new Date().toISOString().split('T')[0]
    return `${basename}-${timestamp}.${format}`
  }

  const handleDownload = (format: 'csv' | 'json') => {
    try {
      let result
      let contentType: string

      if (format === 'csv') {
        result = generateCSV({
          coasters,
          includeRanking: includeRanking && hasRankingData,
          rankingMetadata: uploadedData?.rankingMetadata,
        })
        contentType = 'text/csv'
      } else {
        result = generateJSON({
          coasters,
          includeRanking: includeRanking && hasRankingData,
          rankingMetadata: uploadedData?.rankingMetadata,
        })
        contentType = 'application/json'
      }

      if (result.content && !result.isEmpty) {
        const filename = generateFilename('coaster-collection', format)
        const downloadResult = downloadFile({
          content: result.content,
          filename,
          contentType,
        })

        if (downloadResult.success) {
          setDownloadStatus(`${format.toUpperCase()} downloaded successfully!`)
        } else {
          setDownloadStatus(
            downloadResult.error ||
              `Error downloading ${format.toUpperCase()} file`
          )
        }

        setTimeout(() => setDownloadStatus(null), 3000)
      }
    } catch {
      setDownloadStatus(`Error generating ${format.toUpperCase()} file`)
      setTimeout(() => setDownloadStatus(null), 3000)
    }
  }

  if (coasters.length === 0) {
    return (
      <MainContent>
        <Title>Download Your Collection</Title>
        <section>
          <Styled.EmptyState>
            <h2>No Coasters Yet</h2>
            <p>
              Upload some coasters to download your collection in CSV or JSON
              format.
            </p>
            <Styled.UploadLink href='/upload'>
              Upload Coasters
            </Styled.UploadLink>
          </Styled.EmptyState>
        </section>
      </MainContent>
    )
  }

  return (
    <MainContent>
      <Title>Download Your Collection</Title>

      <section>
        <Styled.DownloadContent>
          <Styled.Section>
            <h2>Your Coaster Collection</h2>
            <p>
              You have <Styled.BoldText>{coasters.length}</Styled.BoldText>{' '}
              coaster
              {coasters.length === 1 ? '' : 's'} in your collection.
            </p>
            {uploadedData?.uploadedAt && (
              <Styled.LastUpdatedText>
                Last updated: {uploadedData.uploadedAt.toLocaleDateString()}
              </Styled.LastUpdatedText>
            )}
          </Styled.Section>

          <Styled.Section>
            <h3>Choose your format:</h3>

            {hasRankingData && (
              <Styled.RankingOption>
                <label>
                  <input
                    type='checkbox'
                    checked={includeRanking}
                    onChange={e => setIncludeRanking(e.target.checked)}
                  />
                  Include ranking positions (adds "rank" field with current
                  rankings)
                </label>
              </Styled.RankingOption>
            )}

            <Styled.DownloadButton
              onClick={() => handleDownload('csv')}
              aria-describedby='csv-description'
            >
              <Styled.FileIcon aria-hidden='true'>📊</Styled.FileIcon>
              <Styled.ButtonContent>
                <Styled.ButtonTitle>Download as CSV</Styled.ButtonTitle>
                <Styled.ButtonDescription id='csv-description'>
                  For Excel, Google Sheets, and other spreadsheet apps
                  {includeRanking &&
                    hasRankingData &&
                    ' (includes rank column)'}
                </Styled.ButtonDescription>
              </Styled.ButtonContent>
            </Styled.DownloadButton>

            <Styled.DownloadButton
              onClick={() => handleDownload('json')}
              aria-describedby='json-description'
            >
              <Styled.FileIcon aria-hidden='true'>📄</Styled.FileIcon>
              <Styled.ButtonContent>
                <Styled.ButtonTitle>Download as JSON</Styled.ButtonTitle>
                <Styled.ButtonDescription id='json-description'>
                  Developer-friendly format for importing into other apps
                  {includeRanking && hasRankingData && ' (includes rank field)'}
                </Styled.ButtonDescription>
              </Styled.ButtonContent>
            </Styled.DownloadButton>
          </Styled.Section>

          {downloadStatus && (
            <Styled.StatusMessage
              role='status'
              aria-live='polite'
              $isSuccess={downloadStatus.includes('successfully')}
            >
              {downloadStatus}
            </Styled.StatusMessage>
          )}

          <Styled.InfoSection>
            <p>
              Files are generated locally in your browser - your data stays
              private.
            </p>
          </Styled.InfoSection>

          <Styled.BackLink href='/view-coasters'>
            Back to View Coasters
          </Styled.BackLink>
        </Styled.DownloadContent>
      </section>
    </MainContent>
  )
}
