import { ChangeEvent, FormEvent, useState } from 'react'
import {
  BackLink,
  Button,
  CodeBlock,
  DuplicateResolver,
  MainContent,
  PreRankingQuestion,
  ScreenReaderOnly,
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
import * as Styled from './UploadJSON.styled'

export default function UploadJSON() {
  const { uploadedData, setUploadedData, isLoading, setIsLoading } = useData()
  const uploadState = useUploadState()
  const [jsonInput, setJsonInput] = useState('')

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
      successMessagePrefix: 'Successfully processed JSON data!',
      onAdditionalCleanup: () => setJsonInput(''),
    })
  }

  const handleDuplicateCancel = () => {
    uploadState.clearPendingData()
    uploadState.setError('Upload cancelled.')
    setJsonInput('')
  }

  const handlePreRankingAnswer = (isPreRanked: boolean) => {
    handlePreRankingAnswerUtil({
      isPreRanked,
      pendingCoasters: uploadState.pendingCoasters,
      pendingFilename: uploadState.pendingFilename,
      uploadedData,
      uploadStateActions: uploadState,
      setUploadedData,
      successMessagePrefix: 'Successfully processed JSON data!',
      onAdditionalCleanup: () => setJsonInput(''),
    })
  }

  const handlePreRankingCancel = () => {
    handlePreRankingCancelUtil({ uploadStateActions: uploadState })
    setJsonInput('')
  }

  const processJsonData = async (
    jsonString: string,
    filename = 'pasted-data.json'
  ) => {
    uploadState.setError('')
    uploadState.setSuccess('')
    setIsLoading(true)

    try {
      await processUploadWorkflow({
        fileContent: jsonString,
        filename,
        uploadedData,
        uploadStateActions: uploadState,
        setUploadedData,
        setIsLoading,
        successMessagePrefix: 'Successfully processed JSON data!',
        onAdditionalCleanup: () => setJsonInput(''),
      })
    } catch (err) {
      uploadState.setError(
        `Error processing JSON: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`
      )
      setIsLoading(false)
    }
  }

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (!file.name.toLowerCase().endsWith('.json')) {
        uploadState.setError('Please select a JSON file.')
        return
      }

      try {
        const content = await file.text()
        await processJsonData(content, file.name)
      } catch {
        uploadState.setError('Error reading file.')
      }
    }
  }

  const handleJsonSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (jsonInput.trim()) {
      processJsonData(jsonInput.trim())
    }
  }

  return (
    <MainContent>
      <Title>Upload JSON Data</Title>

      <section>
        <Styled.Instructions>
          <h2>Import JSON Data</h2>
          <p>
            Paste your coaster data as JSON or upload a JSON file. Your data
            should be an array of coaster objects.
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

        {/* JSON Format Example */}
        <Styled.ExampleFiles>
          <details>
            <summary>JSON Format Example</summary>

            <CodeBlock>
              {`[
  {
    "name": "The Smiler",
    "park": "Alton Towers",
    "manufacturer": "Gerstlauer",
    "model": "Euro-Fighter",
    "type": "Steel",
    "country": "United Kingdom"
  },
  {
    "name": "Nemesis",
    "park": "Alton Towers",
    "manufacturer": "Bolliger & Mabillard",
    "model": "Inverted Coaster",
    "type": "Steel",
    "country": "United Kingdom"
  }
]`}
            </CodeBlock>
          </details>
        </Styled.ExampleFiles>

        {/* JSON Paste Area */}
        <Styled.JsonSection>
          <h3>Paste JSON Data</h3>
          <form onSubmit={handleJsonSubmit}>
            <ScreenReaderOnly as='label' htmlFor='json-textarea'>
              JSON data input area
            </ScreenReaderOnly>
            <Styled.JsonTextarea
              id='json-textarea'
              value={jsonInput}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setJsonInput(e.target.value)
              }
              placeholder='Paste your JSON data here...'
              disabled={isLoading}
            />
            <Button type='submit' variant={isLoading ? 'disabled' : 'default'}>
              {isLoading ? 'Processing...' : 'Process JSON'}
            </Button>
          </form>
        </Styled.JsonSection>

        <Styled.Divider>
          <span>or</span>
        </Styled.Divider>

        {/* File Upload */}
        <Styled.FileSection>
          <h3>Upload JSON File</h3>
          <Styled.FileInputWrapper>
            <Styled.FileInput
              type='file'
              id='json-file-upload'
              accept='.json,application/json'
              onChange={handleFileInput}
              disabled={isLoading}
            />
            <Styled.FileLabel htmlFor='json-file-upload' $disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Choose JSON File'}
            </Styled.FileLabel>
          </Styled.FileInputWrapper>
          <Styled.FileInfo>
            Only JSON files are accepted. File should contain an array of
            coaster objects.
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
