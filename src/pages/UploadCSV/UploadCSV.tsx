import React, { useState } from 'react'
import {
  Card,
  CodeBlock,
  MainContent,
  Title,
  DuplicateResolver,
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
import * as Styled from './UploadCSV.styled'

export default function UploadCSV() {
  const { uploadedData, setUploadedData, isLoading, setIsLoading } = useData()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
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
      `Successfully processed CSV file! Added ${newCoasterCount} new coasters. You now have ${totalCount} coasters total.`
    )
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
      `Successfully processed CSV file! Added ${addedCount} new coasters. You now have ${totalCount} coasters total.`
    )

    // Reset states
    setShowDuplicateResolver(false)
    setDuplicates([])
    setPendingCoasters([])
    setPendingFilename('')
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

      if (!file.name.toLowerCase().endsWith('.csv')) {
        setError('Please select a CSV file.')
        return
      }

      setIsLoading(true)
      setError(null)
      setSuccess(null)

      try {
        const content = await file.text()
        const newData = await processUploadedFile(file, content)

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
          `Error processing CSV: ${
            err instanceof Error ? err.message : 'Unknown error'
          }`
        )
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <MainContent>
      <Title>Upload CSV File</Title>

      <Card>
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
              {`name,park,manufacturer,model,type,country,year
The Smiler,Alton Towers,Gerstlauer,Euro-Fighter,Steel,United Kingdom,2013
Nemesis,Alton Towers,Bolliger & Mabillard,Inverted Coaster,Steel,United Kingdom,1994
Stealth,Thorpe Park,Intamin,Accelerator Coaster,Steel,United Kingdom,2006`}
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
              disabled={isLoading}
            />
            <Styled.FileLabel htmlFor='csv-file-upload' $disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Choose CSV File'}
            </Styled.FileLabel>
          </Styled.FileInputWrapper>
          <Styled.FileInfo>
            Only CSV files are accepted. File should have headers in the first
            row.
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

        <Styled.BackLink href='/upload'>
          ← Back to Upload Options
        </Styled.BackLink>
      </Card>
    </MainContent>
  )
}
