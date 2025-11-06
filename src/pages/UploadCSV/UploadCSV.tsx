import React from 'react'
import {
  CodeBlock,
  DuplicateResolver,
  InfoMessage,
  MainContent,
  PreRankingQuestion,
  Title,
  Link,
  Text,
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
          <Text as='h2' colour='charcoal' fontSize='large' mb='small'>
            Import from CSV Spreadsheet
          </Text>
          <Text as='p' colour='mediumGrey' mb='small'>
            Upload a CSV file containing your coaster data. Each row should
            represent one coaster with the required fields.
          </Text>
          {existingCoasterCount > 0 && (
            <Styled.CurrentDataInfo>
              You currently have{' '}
              <Text bold>{existingCoasterCount} coasters</Text> in your
              collection.{' '}
              <Link href='/view-coasters' variant='button'>
                View all coasters
              </Link>
            </Styled.CurrentDataInfo>
          )}
        </Styled.Instructions>

        {/* Required Fields Info */}
        <Styled.RequiredFields>
          <Text as='h3' colour='darkBlue' mb='small'>
            Required Fields:
          </Text>
          <ul>
            <Text as='li' colour='slateGrey'>
              <Text bold>Name:</Text> Coaster name
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold>Park:</Text> Theme park
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold>Manufacturer:</Text> Builder company
            </Text>
          </ul>

          <Text as='h3' colour='darkBlue' mb='small' mt='medium'>
            Optional Fields:
          </Text>
          <ul>
            <Text as='li' colour='slateGrey'>
              <Text bold>Model:</Text> Model name
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold>Material:</Text> Steel/Wood/Hybrid
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold>ThrillLevel:</Text> Kiddie/Family/Family Thrill/Thrill
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold>Country:</Text> Country location
            </Text>
          </ul>
        </Styled.RequiredFields>

        {/* CSV Format Example */}
        <Styled.ExampleFiles>
          <details>
            <Text as='summary' bold colour='orange'>
              CSV Format Example
            </Text>

            <CodeBlock>
              {`name,park,manufacturer,model,material,thrillLevel,country
The Smiler,Alton Towers,Gerstlauer,Euro-Fighter,Steel,Thrill,United Kingdom
Nemesis,Alton Towers,Bolliger & Mabillard,Inverted Coaster,Steel,Thrill,United Kingdom
Stealth,Thorpe Park,Intamin,Accelerator Coaster,Steel,Family Thrill,United Kingdom`}
            </CodeBlock>
          </details>
        </Styled.ExampleFiles>

        {/* File Upload */}
        <Styled.FileSection>
          <Text as='h3' colour='charcoal' mb='small'>
            Select CSV File
          </Text>
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
          <Text
            as='p'
            center
            colour='mutedGrey'
            fontSize='small'
            id='file-status'
            mt='tiny'
          >
            {isLoading
              ? 'Please wait while your file is being processed...'
              : 'Only CSV files are accepted. File should have headers in the first row.'}
          </Text>
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
          <InfoMessage variant='error' role='alert' aria-live='assertive'>
            <Text as='span' bold colour='errorText' fontSize='small'>
              ERROR:
            </Text>
            <Text as='span' colour='errorText' fontSize='small'>
              {uploadState.error}
            </Text>
          </InfoMessage>
        )}

        {uploadState.success && (
          <InfoMessage variant='success' role='status' aria-live='polite'>
            <Text as='span' bold colour='successGreen' fontSize='small'>
              SUCCESS:
            </Text>
            <Text as='span' colour='successGreen' fontSize='small'>
              {uploadState.success}
            </Text>
          </InfoMessage>
        )}

        <Link href='/upload' variant='back'>
          Back to Upload Options
        </Link>
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
