import { ChangeEvent, FormEvent, useState } from 'react'
import {
  Button,
  CodeBlock,
  CurrentDataInfo,
  DuplicateResolver,
  InfoMessage,
  MainContent,
  PreRankingQuestion,
  ScreenReaderOnly,
  Title,
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
        <Styled.Section>
          {existingCoasterCount > 0 && (
            <>
              <CurrentDataInfo coasterCount={existingCoasterCount} />
              <Text as='h2' colour='charcoal' fontSize='medium' mb='small'>
                Import JSON Data
              </Text>
            </>
          )}
          <Text as='p' colour='mediumGrey' mb='small'>
            Paste your coaster data as JSON or upload a JSON file. Your data
            should be an array of coaster objects.
          </Text>
        </Styled.Section>

        {/* Required Fields Info */}
        <Styled.RequiredFields>
          <Text as='h3' colour='darkBlue' mb='small'>
            Required Fields:
          </Text>
          <ul>
            <Text as='li' colour='slateGrey'>
              <Text bold colour='charcoal'>
                name:
              </Text>{' '}
              Coaster name
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold colour='charcoal'>
                park:
              </Text>{' '}
              Theme park
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold colour='charcoal'>
                manufacturer:
              </Text>{' '}
              Builder company
            </Text>
          </ul>

          <Text as='h3' colour='darkBlue' mb='small' mt='medium'>
            Optional Fields:
          </Text>
          <ul>
            <Text as='li' colour='slateGrey'>
              <Text bold colour='charcoal'>
                model:
              </Text>{' '}
              Model name
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold colour='charcoal'>
                material:
              </Text>{' '}
              Steel/Wood/Hybrid
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold colour='charcoal'>
                thrillLevel:
              </Text>{' '}
              Kiddie/Family/Family Thrill/Thrill
            </Text>
            <Text as='li' colour='slateGrey'>
              <Text bold colour='charcoal'>
                country:
              </Text>{' '}
              Country location
            </Text>
          </ul>
        </Styled.RequiredFields>

        {/* JSON Format Example */}
        <Styled.ExampleFiles>
          <details>
            <Text as='summary' bold colour='orange'>
              JSON Format Example
            </Text>

            <CodeBlock>
              {`[
  {
    "name": "The Smiler",
    "park": "Alton Towers",
    "manufacturer": "Gerstlauer",
    "model": "Euro-Fighter",
    "material": "Steel",
    "thrillLevel": "Thrill",
    "country": "United Kingdom"
  },
  {
    "name": "Nemesis",
    "park": "Alton Towers",
    "manufacturer": "Bolliger & Mabillard",
    "model": "Inverted Coaster",
    "material": "Steel",
    "thrillLevel": "Family Thrill",
    "country": "United Kingdom"
  }
]`}
            </CodeBlock>
          </details>
        </Styled.ExampleFiles>

        {/* JSON Paste Area */}
        <Styled.Section>
          <Text as='h3' colour='charcoal' mb='small'>
            Paste JSON Data
          </Text>
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
        </Styled.Section>

        <Styled.Divider>
          <Text colour='mediumGrey' italic>
            or
          </Text>
        </Styled.Divider>

        {/* File Upload */}
        <Styled.Section>
          <Text as='h3' colour='charcoal' mb='small'>
            Upload JSON File
          </Text>
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
          <Text as='p' center colour='mutedGrey' fontSize='small' mt='tiny'>
            Only JSON files are accepted. File should contain an array of
            coaster objects.
          </Text>
        </Styled.Section>

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
