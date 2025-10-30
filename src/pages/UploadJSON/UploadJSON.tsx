import React, { useState } from 'react'
import { Card, CodeBlock, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import { processUploadedFile } from '../../utils/fileParser'
import * as Styled from './UploadJSON.styled'

export default function UploadJSON() {
  const { uploadedData, setUploadedData, isLoading, setIsLoading } = useData()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [jsonInput, setJsonInput] = useState('')

  const existingCoasterCount = uploadedData?.coasters?.length || 0

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
      const data = await processUploadedFile(fakeFile, jsonString)
      setUploadedData(data)

      const coasterCount = data.coasters?.length || 0
      setSuccess(
        `Successfully processed JSON data! Found ${coasterCount} coasters.`
      )
      setJsonInput('')
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
