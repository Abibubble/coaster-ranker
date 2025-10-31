import React, { useState } from 'react'
import {
  BackLink,
  Card,
  CodeBlock,
  DuplicateResolver,
  MainContent,
  Title,
  ViewLink,
} from '../../components'
import { useData } from '../../contexts/DataContext'
import { processUploadedFile } from '../../utils/fileParser'
import {
  detectDuplicates,
  DuplicateMatch,
} from '../../utils/duplicateDetection'
import type { DuplicateResolution } from '../../components/DuplicateResolver'
import { Coaster } from '../../types/data'
import * as Styled from './UploadJSON.styled'

export default function UploadJSON() {
  const { uploadedData, setUploadedData, isLoading, setIsLoading } = useData()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [jsonInput, setJsonInput] = useState('')
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([])
  const [pendingCoasters, setPendingCoasters] = useState<Coaster[]>([])
  const [pendingFilename, setPendingFilename] = useState<string>('')
  const [showDuplicateResolver, setShowDuplicateResolver] = useState(false)

  const existingCoasterCount = uploadedData?.coasters?.length || 0

  const finalizeCombinedData = (newCoasters: Coaster[], filename: string) => {
    const existingCoasters = uploadedData?.coasters || []

    // Mark new coasters
    const markedNewCoasters = newCoasters.map(coaster => ({
      ...coaster,
      isNewCoaster: true,
      wins: 0,
    }))

    const combinedData = {
      coasters: [...existingCoasters, ...markedNewCoasters],
      uploadedAt: new Date(),
      filename: uploadedData?.filename
        ? `${uploadedData.filename}, ${filename}`
        : filename,
      rankingMetadata: uploadedData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        totalWins: new Map<string, number>(),
        isRanked: false,
      },
    }

    setUploadedData(combinedData)

    const newCoasterCount = newCoasters.length
    const totalCount = combinedData.coasters.length
    setSuccess(
      `Successfully processed JSON data! Added ${newCoasterCount} new coasters. You now have ${totalCount} coasters total.`
    )
    setJsonInput('')
  }

  const processJsonData = async (
    jsonString: string,
    filename = 'pasted-data.json'
  ) => {
    setIsLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const fakeFile = new File([jsonString], filename, {
        type: 'application/json',
      })
      const newData = await processUploadedFile(fakeFile, jsonString)

      // Check for duplicates
      const existingCoasters = uploadedData?.coasters || []
      const duplicateCheck = detectDuplicates(
        existingCoasters,
        newData.coasters
      )

      if (duplicateCheck.hasDuplicates) {
        setDuplicates(duplicateCheck.duplicates)
        setPendingCoasters(newData.coasters)
        setPendingFilename(newData.filename)
        setShowDuplicateResolver(true)
      } else {
        finalizeCombinedData(newData.coasters, newData.filename)
      }
    } catch (err) {
      setError(
        `Error processing JSON: ${
          err instanceof Error ? err.message : 'Unknown error'
        }`
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleDuplicateResolution = (resolutions: DuplicateResolution[]) => {
    if (!pendingCoasters.length) return

    const existingCoasters = uploadedData?.coasters || []
    let updatedCoasters = [...existingCoasters]
    let coastersToAdd: Coaster[] = []

    // Build a map of which coasters to process
    const coastersToProcess = new Set(pendingCoasters)

    // Process each resolution
    resolutions.forEach((resolution, index) => {
      const duplicate = duplicates[index]

      switch (resolution.action) {
        case 'keep-existing':
          // Remove the new coaster from processing
          coastersToProcess.delete(duplicate.newCoaster)
          break
        case 'keep-new':
          // Remove existing coaster and mark new one for addition
          updatedCoasters = updatedCoasters.filter(
            c => c.id !== duplicate.existingCoaster.id
          )
          if (coastersToProcess.has(duplicate.newCoaster)) {
            coastersToAdd.push(duplicate.newCoaster)
            coastersToProcess.delete(duplicate.newCoaster)
          }
          break
        case 'keep-both':
          // Mark new coaster for addition
          if (coastersToProcess.has(duplicate.newCoaster)) {
            coastersToAdd.push(duplicate.newCoaster)
            coastersToProcess.delete(duplicate.newCoaster)
          }
          break
      }
    })

    // Add any remaining coasters that weren't involved in duplicates
    coastersToAdd.push(...Array.from(coastersToProcess))

    // Mark all new coasters
    const markedNewCoasters = coastersToAdd.map(coaster => ({
      ...coaster,
      isNewCoaster: true,
      wins: 0,
    }))

    const combinedData = {
      coasters: [...updatedCoasters, ...markedNewCoasters],
      uploadedAt: new Date(),
      filename: uploadedData?.filename
        ? `${uploadedData.filename}, ${pendingFilename}`
        : pendingFilename,
      rankingMetadata: uploadedData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        totalWins: new Map<string, number>(),
        isRanked: false,
      },
    }

    setUploadedData(combinedData)

    const addedCount = markedNewCoasters.length
    const totalCount = combinedData.coasters.length
    setSuccess(
      `Successfully processed JSON data! Added ${addedCount} new coasters. You now have ${totalCount} coasters total.`
    )

    // Reset states
    setShowDuplicateResolver(false)
    setDuplicates([])
    setPendingCoasters([])
    setPendingFilename('')
    setJsonInput('')
  }

  const handleDuplicateCancel = () => {
    setShowDuplicateResolver(false)
    setDuplicates([])
    setPendingCoasters([])
    setPendingFilename('')
    setError('Upload cancelled due to potential duplicates.')
  }

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      if (!file.name.toLowerCase().endsWith('.json')) {
        setError('Please select a JSON file.')
        return
      }

      try {
        const content = await file.text()
        await processJsonData(content, file.name)
      } catch {
        setError('Error reading file.')
      }
    }
  }

  const handleJsonSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (jsonInput.trim()) {
      processJsonData(jsonInput.trim())
    }
  }

  return (
    <MainContent>
      <Title>Upload JSON Data</Title>

      <Card>
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
    "country": "United Kingdom",
    "year": 2013
  },
  {
    "name": "Nemesis",
    "park": "Alton Towers",
    "manufacturer": "Bolliger & Mabillard",
    "model": "Inverted Coaster",
    "type": "Steel",
    "country": "United Kingdom",
    "year": 1994
  }
]`}
            </CodeBlock>
          </details>
        </Styled.ExampleFiles>

        {/* JSON Paste Area */}
        <Styled.JsonSection>
          <h3>Paste JSON Data</h3>
          <form onSubmit={handleJsonSubmit}>
            <label htmlFor='json-textarea' className='sr-only'>
              JSON data input area
            </label>
            <Styled.JsonTextarea
              id='json-textarea'
              value={jsonInput}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setJsonInput(e.target.value)
              }
              placeholder='Paste your JSON data here...'
              disabled={isLoading}
            />
            <Styled.SubmitButton
              type='submit'
              disabled={isLoading || !jsonInput.trim()}
            >
              {isLoading ? 'Processing...' : 'Process JSON'}
            </Styled.SubmitButton>
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
        {showDuplicateResolver && duplicates.length > 0 && (
          <DuplicateResolver
            duplicates={duplicates}
            onResolve={handleDuplicateResolution}
            onCancel={handleDuplicateCancel}
          />
        )}

        {/* Status Messages */}
        {error && (
          <Styled.ErrorMessage role='alert' aria-live='assertive'>
            <Styled.ErrorIcon aria-hidden='true'>ERROR:</Styled.ErrorIcon>
            {error}
          </Styled.ErrorMessage>
        )}

        {success && (
          <Styled.SuccessMessage role='status' aria-live='polite'>
            <Styled.SuccessIcon aria-hidden='true'>SUCCESS:</Styled.SuccessIcon>
            {success}
          </Styled.SuccessMessage>
        )}

        <BackLink href='/upload'>Back to Upload Options</BackLink>
      </Card>
    </MainContent>
  )
}
