import React, { useState } from 'react'
import { Card, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import { Coaster } from '../../types/data'
import { colours } from '../../theme'
import * as Styled from './Download.styled'

export default function Download() {
  const { uploadedData } = useData()
  const [downloadStatus, setDownloadStatus] = useState<string | null>(null)

  const coasters = uploadedData?.coasters || []

  const generateCSV = (coasters: Coaster[]): string => {
    if (coasters.length === 0) return ''

    // Create headers from all possible coaster properties
    const headers = [
      'id',
      'name',
      'park',
      'country',
      'manufacturer',
      'model',
      'type',
      'location',
      'height',
      'speed',
      'inversions',
      'year',
    ]

    // Create CSV content
    const csvHeaders = headers.join(',')
    const csvRows = coasters.map(coaster => {
      return headers
        .map(header => {
          const value = coaster[header as keyof Coaster]
          if (value === undefined || value === null) return ''
          // Escape commas and quotes in values
          const stringValue = String(value)
          if (
            stringValue.includes(',') ||
            stringValue.includes('"') ||
            stringValue.includes('\n')
          ) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        })
        .join(',')
    })

    return [csvHeaders, ...csvRows].join('\n')
  }

  const generateJSON = (coasters: Coaster[]): string => {
    return JSON.stringify(
      {
        coasters,
        exportedAt: new Date().toISOString(),
        totalCount: coasters.length,
        source: 'Coaster Ranker',
      },
      null,
      2
    )
  }

  const downloadFile = (
    content: string,
    filename: string,
    contentType: string
  ) => {
    const blob = new Blob([content], { type: contentType })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleDownload = (format: 'csv' | 'json') => {
    try {
      const timestamp = new Date().toISOString().slice(0, 10)
      const content =
        format === 'csv' ? generateCSV(coasters) : generateJSON(coasters)
      const contentType = format === 'csv' ? 'text/csv' : 'application/json'

      if (content) {
        downloadFile(
          content,
          `coaster-collection-${timestamp}.${format}`,
          contentType
        )
        setDownloadStatus(`${format.toUpperCase()} downloaded successfully!`)
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
        <Card>
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
        </Card>
      </MainContent>
    )
  }

  return (
    <MainContent>
      <Title>Download Your Collection</Title>

      <Card>
        <Styled.DownloadContent>
          <Styled.Section>
            <h2>Your Coaster Collection</h2>
            <p>
              You have <Styled.BoldText>{coasters.length}</Styled.BoldText>{' '}
              coaster
              {coasters.length === 1 ? '' : 's'} in your collection.
            </p>
            {uploadedData?.uploadedAt && (
              <p
                style={{
                  fontSize: '0.9rem',
                  color: colours.lightTextGrey,
                  fontStyle: 'italic',
                }}
              >
                Last updated: {uploadedData.uploadedAt.toLocaleDateString()}
              </p>
            )}
          </Styled.Section>

          <Styled.Section>
            <h3>Choose your format:</h3>

            <Styled.DownloadButton
              onClick={() => handleDownload('csv')}
              aria-describedby='csv-description'
            >
              <Styled.FileIcon aria-hidden='true'>📊</Styled.FileIcon>
              <Styled.ButtonContent>
                <Styled.ButtonTitle>Download as CSV</Styled.ButtonTitle>
                <Styled.ButtonDescription id='csv-description'>
                  For Excel, Google Sheets, and other spreadsheet apps
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
            ← Back to View Coasters
          </Styled.BackLink>
        </Styled.DownloadContent>
      </Card>
    </MainContent>
  )
}
