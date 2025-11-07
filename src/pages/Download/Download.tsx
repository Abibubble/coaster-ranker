import { useState } from 'react'
import {
  Link,
  Button,
  CurrentDataInfo,
  InfoMessage,
  MainContent,
  Text,
  Title,
} from '../../components'
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
          includeRanking: hasRankingData,
          rankingMetadata: uploadedData?.rankingMetadata,
        })
        contentType = 'text/csv'
      } else {
        result = generateJSON({
          coasters,
          includeRanking: hasRankingData,
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
            <Text as='h2' center colour='darkGrey' mb='small'>
              No Coasters Yet
            </Text>
            <Text as='p' center colour='mediumGrey' mb='large'>
              Upload some coasters to download your collection in CSV or JSON
              format.
            </Text>
            <Button as='a' href='/upload'>
              Upload Coasters
            </Button>
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
          <CurrentDataInfo coasterCount={coasters.length} />

          <Styled.Section>
            <Styled.SectionHeader>
              <Text as='h3' colour='darkGrey' mb='tiny'>
                Choose your format:
              </Text>
            </Styled.SectionHeader>

            <Styled.DownloadOptions>
              <Styled.DownloadButton
                onClick={() => handleDownload('csv')}
                aria-describedby='csv-description'
              >
                <Styled.ButtonContent>
                  <Text
                    as='h4'
                    bold
                    colour='darkGrey'
                    fontSize='large'
                    mb='fine'
                  >
                    Download as CSV
                  </Text>
                  <Styled.ButtonDescription
                    as='p'
                    colour='mediumGrey'
                    fontSize='small'
                    id='csv-description'
                  >
                    For Excel, Google Sheets, and other spreadsheet apps
                    {hasRankingData && ' (includes rank column)'}
                  </Styled.ButtonDescription>
                </Styled.ButtonContent>
              </Styled.DownloadButton>

              <Styled.DownloadButton
                onClick={() => handleDownload('json')}
                aria-describedby='json-description'
              >
                <Styled.ButtonContent>
                  <Text
                    as='h4'
                    bold
                    colour='darkGrey'
                    fontSize='large'
                    mb='fine'
                  >
                    Download as JSON
                  </Text>
                  <Styled.ButtonDescription
                    as='p'
                    colour='mediumGrey'
                    fontSize='small'
                    id='json-description'
                  >
                    Developer-friendly format for importing into other apps
                    {hasRankingData && ' (includes rank field)'}
                  </Styled.ButtonDescription>
                </Styled.ButtonContent>
              </Styled.DownloadButton>
            </Styled.DownloadOptions>
          </Styled.Section>

          {downloadStatus && (
            <InfoMessage
              variant={
                downloadStatus.includes('successfully') ? 'success' : 'error'
              }
              role='status'
              aria-live='polite'
            >
              {downloadStatus}
            </InfoMessage>
          )}

          <Styled.InfoSection>
            <Text as='p' colour='mediumGrey' fontSize='small'>
              Files are generated locally in your browser - your data stays
              private.
            </Text>
          </Styled.InfoSection>

          <Link href='/view-coasters' variant='back'>
            Back to View Coasters
          </Link>
        </Styled.DownloadContent>
      </section>
    </MainContent>
  )
}
