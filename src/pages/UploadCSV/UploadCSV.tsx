import React from 'react'
import {
  BackLink,
  CodeBlock,
  DuplicateResolver,
  MainContent,
  PreRankingQuestion,
  Title,
  ViewLink,
} from '../../components'
import { useData } from '../../contexts/DataContext'
import {
  useUploadState,
  handlePreRankingAnswer as handlePreRankingAnswerUtil,
  handlePreRankingCancel as handlePreRankingCancelUtil,
  handleUploadDuplicateResolution,
  processUploadWorkflow,
} from '../../utils/uploadState'
import type { DuplicateResolution } from '../../components/DuplicateResolver'
import * as Styled from './UploadCSV.styled'

export default function UploadCSV() {
  const { uploadedData, setUploadedData, isLoading, setIsLoading } = useData()
  const uploadState = useUploadState()

  const existingCoasterCount = uploadedData?.coasters?.length || 0

  const handleDuplicateResolution = (resolutions: DuplicateResolution[]) => {
    handleUploadDuplicateResolution({
      resolutions,
      duplicates: uploadState.duplicates,
      pendingCoasters: uploadState.pendingCoasters,
      pendingFilename: uploadState.pendingFilename,
      uploadedData,
      uploadStateActions: uploadState,
      setUploadedData,
      successMessagePrefix: 'Successfully processed CSV file!',
    })
  }

  const handleDuplicateCancel = () => {
    uploadState.clearPendingData()
    uploadState.setError('Upload cancelled.')
  }

  const handlePreRankingAnswer = (isPreRanked: boolean) => {
    handlePreRankingAnswerUtil({
      isPreRanked,
      pendingCoasters: uploadState.pendingCoasters,
      pendingFilename: uploadState.pendingFilename,
      uploadedData,
      uploadStateActions: uploadState,
      setUploadedData,
      successMessagePrefix: 'Successfully processed CSV file!',
    })
  }

  const handlePreRankingCancel = () => {
    handlePreRankingCancelUtil({ uploadStateActions: uploadState })
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) {
      event.preventDefault()
      return
    }

    const file = event.target.files?.[0]
    if (!file) return

    uploadState.setError('')
    uploadState.setSuccess('')
    setIsLoading(true)

    const reader = new FileReader()
    reader.onload = async e => {
      try {
        const csvContent = e.target?.result as string
        await processUploadWorkflow({
          fileContent: csvContent,
          filename: file.name,
          uploadedData,
          uploadStateActions: uploadState,
          setUploadedData,
          setIsLoading,
          successMessagePrefix: 'Successfully processed CSV file!',
        })

        // processUploadWorkflow now handles all state updates internally
        // No need to call processUploadResult separately
      } catch (err) {
        uploadState.setError(
          err instanceof Error ? err.message : 'Failed to process file'
        )
      } finally {
        setIsLoading(false)
      }
    }

    reader.onerror = () => {
      uploadState.setError('Failed to read file')
      setIsLoading(false)
    }

    reader.readAsText(file)
  }

  return (
    <MainContent>
      <Title>Upload CSV File</Title>

      <section>
        <Styled.Instructions>
          <h2>Import from CSV Spreadsheet</h2>
          <p>
            Upload a CSV file containing your coaster data. Each row should
            represent one coaster with the required fields.
          </p>
          {existingCoasterCount > 0 && (
            <Styled.CurrentDataInfo>
              You currently have{' '}
              <Styled.BoldText>{existingCoasterCount} coasters</Styled.BoldText>{' '}
              in your collection.{' '}
              <ViewLink href='/view-coasters'>View all coasters</ViewLink>
            </Styled.CurrentDataInfo>
          )}
        </Styled.Instructions>

        {/* Required Fields Info */}
        <Styled.RequiredFields>
          <h3>Required Fields:</h3>
          <ul>
            <li>
              <Styled.BoldText>name:</Styled.BoldText> Coaster name
            </li>
            <li>
              <Styled.BoldText>park:</Styled.BoldText> Theme park
            </li>
            <li>
              <Styled.BoldText>manufacturer:</Styled.BoldText> Builder company
            </li>
            <li>
              <Styled.BoldText>model:</Styled.BoldText> Model name
            </li>
            <li>
              <Styled.BoldText>type:</Styled.BoldText> Steel/Wood/Hybrid
            </li>
          </ul>
        </Styled.RequiredFields>

        {/* CSV Format Example */}
        <Styled.ExampleFiles>
          <details>
            <summary>CSV Format Example</summary>

            <CodeBlock>
              {`name,park,manufacturer,model,type,country
The Smiler,Alton Towers,Gerstlauer,Euro-Fighter,Steel,United Kingdom
Nemesis,Alton Towers,Bolliger & Mabillard,Inverted Coaster,Steel,United Kingdom
Stealth,Thorpe Park,Intamin,Accelerator Coaster,Steel,United Kingdom`}
            </CodeBlock>
          </details>
        </Styled.ExampleFiles>

        {/* File Upload */}
        <Styled.FileSection>
          <h3>Select CSV File</h3>
          <Styled.FileInputWrapper>
            <Styled.FileInput
              type='file'
              id='csv-file-upload'
              accept='.csv,text/csv'
              onChange={handleFileInput}
              aria-describedby='file-status'
            />
            <Styled.FileLabel
              htmlFor='csv-file-upload'
              $isLoading={isLoading}
              tabIndex={0}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ' ') && isLoading) {
                  e.preventDefault()
                }
              }}
            >
              {isLoading ? 'Processing File...' : 'Choose CSV File'}
            </Styled.FileLabel>
          </Styled.FileInputWrapper>
          <Styled.FileInfo id='file-status'>
            {isLoading
              ? 'Please wait while your file is being processed...'
              : 'Only CSV files are accepted. File should have headers in the first row.'}
          </Styled.FileInfo>
        </Styled.FileSection>

        {/* Duplicate Resolution */}
        {uploadState.showDuplicateResolver &&
          uploadState.duplicates.length > 0 && (
            <DuplicateResolver
              duplicates={uploadState.duplicates}
              onResolve={handleDuplicateResolution}
              onCancel={handleDuplicateCancel}
            />
          )}

        {/* Status Messages */}
        {uploadState.error && (
          <Styled.ErrorMessage role='alert' aria-live='assertive'>
            <Styled.ErrorIcon aria-hidden='true'>ERROR:</Styled.ErrorIcon>
            {uploadState.error}
          </Styled.ErrorMessage>
        )}

        {uploadState.success && (
          <Styled.SuccessMessage role='status' aria-live='polite'>
            <Styled.SuccessIcon aria-hidden='true'>SUCCESS:</Styled.SuccessIcon>
            {uploadState.success}
          </Styled.SuccessMessage>
        )}

        <BackLink href='/upload'>Back to Upload Options</BackLink>
      </section>

      {/* Pre-ranking Question Modal */}
      {uploadState.showPreRankingQuestion && (
        <PreRankingQuestion
          coasterCount={uploadState.pendingCoasters.length}
          existingCoasterCount={existingCoasterCount}
          filename={uploadState.pendingFilename}
          hasExistingRankedData={
            uploadedData?.rankingMetadata?.isRanked || false
          }
          onAnswer={handlePreRankingAnswer}
          onCancel={handlePreRankingCancel}
        />
      )}
    </MainContent>
  )
}
