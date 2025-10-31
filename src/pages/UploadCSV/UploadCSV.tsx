import React, { useState } from 'react'
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
  const [showPreRankingQuestion, setShowPreRankingQuestion] = useState(false)

  const existingCoasterCount = uploadedData?.coasters?.length || 0

  const finalizeCombinedData = (
    newCoasters: Coaster[],
    filename: string,
    isPreRanked: boolean = false
  ) => {
    const existingCoasters = uploadedData?.coasters || []
    const uploadId = Date.now().toString() // Unique identifier for this upload batch

    // Mark new coasters with pre-ranking information
    const markedNewCoasters = newCoasters.map((coaster, index) => ({
      ...coaster,
      isNewCoaster: true,
      wins: 0,
      ...(isPreRanked && {
        originalRankPosition: index,
        isPreRanked: true,
      }),
    }))

    const existingRankingMetadata = uploadedData?.rankingMetadata || {
      completedComparisons: new Set<string>(),
      totalWins: new Map<string, number>(),
      rankedCoasters: [],
      isRanked: false,
    }

    const combinedData = {
      coasters: [...existingCoasters, ...markedNewCoasters],
      uploadedAt: new Date(),
      filename: uploadedData?.filename
        ? `${uploadedData.filename}, ${filename}`
        : filename,
      rankingMetadata: {
        ...existingRankingMetadata,
        hasPreRankedCoasters:
          ('hasPreRankedCoasters' in existingRankingMetadata
            ? existingRankingMetadata.hasPreRankedCoasters
            : false) || isPreRanked,
        preRankedGroups: isPreRanked
          ? [
              ...(('preRankedGroups' in existingRankingMetadata
                ? existingRankingMetadata.preRankedGroups
                : []) || []),
              uploadId,
            ]
          : ('preRankedGroups' in existingRankingMetadata
              ? existingRankingMetadata.preRankedGroups
              : []) || [],
        rankedCoasters:
          existingRankingMetadata.rankedCoasters.length > 0
            ? existingRankingMetadata.rankedCoasters
            : [...existingCoasters, ...markedNewCoasters].map(c => c.id),
      },
    }

    setUploadedData(combinedData)

    const newCoasterCount = newCoasters.length
    const totalCount = combinedData.coasters.length
    const rankingStatus = isPreRanked ? ' (marked as pre-ranked)' : ''
    setSuccess(
      `Successfully processed CSV file! Added ${newCoasterCount} new coasters${rankingStatus}. You now have ${totalCount} coasters total.`
    )
  }

  const handleDuplicateResolution = (resolutions: DuplicateResolution[]) => {
    if (!pendingCoasters.length) return

    // Get the pre-ranking decision from session storage
    const isPreRanked = sessionStorage.getItem('pendingPreRanked') === 'true'
    sessionStorage.removeItem('pendingPreRanked') // Clean up

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

    // Use the finalizeCombinedData function with pre-ranking info
    const uploadId = Date.now().toString()
    const markedNewCoasters = coastersToAdd.map(coaster => ({
      ...coaster,
      isNewCoaster: true,
      wins: 0,
      ...(isPreRanked && {
        originalRankPosition: pendingCoasters.indexOf(coaster),
        isPreRanked: true,
      }),
    }))

    const existingRankingMetadata = uploadedData?.rankingMetadata || {
      completedComparisons: new Set<string>(),
      totalWins: new Map<string, number>(),
      rankedCoasters: [],
      isRanked: false,
    }

    const combinedData = {
      coasters: [...updatedCoasters, ...markedNewCoasters],
      uploadedAt: new Date(),
      filename: uploadedData?.filename
        ? `${uploadedData.filename}, ${pendingFilename}`
        : pendingFilename,
      rankingMetadata: {
        ...existingRankingMetadata,
        hasPreRankedCoasters:
          ('hasPreRankedCoasters' in existingRankingMetadata
            ? existingRankingMetadata.hasPreRankedCoasters
            : false) || isPreRanked,
        preRankedGroups: isPreRanked
          ? [
              ...(('preRankedGroups' in existingRankingMetadata
                ? existingRankingMetadata.preRankedGroups
                : []) || []),
              uploadId,
            ]
          : ('preRankedGroups' in existingRankingMetadata
              ? existingRankingMetadata.preRankedGroups
              : []) || [],
        rankedCoasters:
          existingRankingMetadata.rankedCoasters.length > 0
            ? existingRankingMetadata.rankedCoasters
            : [...updatedCoasters, ...markedNewCoasters].map(c => c.id),
      },
    }

    setUploadedData(combinedData)

    const addedCount = markedNewCoasters.length
    const totalCount = combinedData.coasters.length
    const rankingStatus = isPreRanked ? ' (marked as pre-ranked)' : ''
    setSuccess(
      `Successfully processed CSV file! Added ${addedCount} new coasters${rankingStatus}. You now have ${totalCount} coasters total.`
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

  const handlePreRankingAnswer = (isPreRanked: boolean) => {
    setShowPreRankingQuestion(false)

    if (pendingCoasters.length > 0) {
      const existingCoasters = uploadedData?.coasters || []
      const detectedDuplicates = detectDuplicates(
        existingCoasters,
        pendingCoasters
      )

      if (detectedDuplicates.duplicates.length > 0) {
        setDuplicates(detectedDuplicates.duplicates)
        setShowDuplicateResolver(true)
        // Store the pre-ranking decision for later use
        sessionStorage.setItem('pendingPreRanked', isPreRanked.toString())
      } else {
        finalizeCombinedData(pendingCoasters, pendingFilename, isPreRanked)
        setPendingCoasters([])
        setPendingFilename('')
      }
    }
  }

  const handlePreRankingCancel = () => {
    setShowPreRankingQuestion(false)
    setPendingCoasters([])
    setPendingFilename('')
    setError('Upload cancelled.')
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoading) {
      event.preventDefault()
      return
    }

    const file = event.target.files?.[0]
    if (!file) return

    setError('')
    setSuccess('')
    setIsLoading(true)

    const reader = new FileReader()
    reader.onload = async e => {
      try {
        const csvContent = e.target?.result as string
        const result = await processUploadedFile(file, csvContent)

        // Store pending coasters and show pre-ranking question
        setPendingCoasters(result.coasters)
        setPendingFilename(file.name)
        setShowPreRankingQuestion(true)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to process file')
      } finally {
        setIsLoading(false)
      }
    }

    reader.onerror = () => {
      setError('Failed to read file')
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
      </section>

      {/* Pre-ranking Question Modal */}
      {showPreRankingQuestion && (
        <PreRankingQuestion
          coasterCount={pendingCoasters.length}
          filename={pendingFilename}
          onAnswer={handlePreRankingAnswer}
          onCancel={handlePreRankingCancel}
        />
      )}
    </MainContent>
  )
}
