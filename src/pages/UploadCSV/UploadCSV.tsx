import React, { useState } from 'react'
import { Card, CodeBlock, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import { processUploadedFile } from '../../utils/fileParser'
import * as Styled from './UploadCSV.styled'

export default function UploadCSV() {
  const { uploadedData, setUploadedData, isLoading, setIsLoading } = useData()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const existingCoasterCount = uploadedData?.coasters?.length || 0

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

        // Combine with existing data
        const existingCoasters = uploadedData?.coasters || []
        const combinedData = {
          coasters: [...existingCoasters, ...newData.coasters],
          uploadedAt: newData.uploadedAt,
          filename: uploadedData?.filename
            ? `${uploadedData.filename}, ${newData.filename}`
            : newData.filename,
        }
        setUploadedData(combinedData)

        const newCoasterCount = newData.coasters?.length || 0
        const totalCount = combinedData.coasters?.length || 0
        setSuccess(
          `Successfully processed CSV file! Added ${newCoasterCount} new coasters. You now have ${totalCount} coasters total.`
        )
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
              <strong>{existingCoasterCount} coasters</strong> in your
              collection.{' '}
              <Styled.ViewLink href='/view-coasters'>
                View all coasters
              </Styled.ViewLink>
            </Styled.CurrentDataInfo>
          )}
        </Styled.Instructions>

        {/* Required Fields Info */}
        <Styled.RequiredFields>
          <h3>Required Fields:</h3>
          <ul>
            <li>
              <strong>name:</strong> Coaster name
            </li>
            <li>
              <strong>park:</strong> Theme park
            </li>
            <li>
              <strong>manufacturer:</strong> Builder company
            </li>
            <li>
              <strong>model:</strong> Model name
            </li>
            <li>
              <strong>type:</strong> Steel/Wood/Hybrid
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
