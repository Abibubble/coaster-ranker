import React from 'react'
import { Card, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import * as Styled from './Upload.styled'

function Upload() {
  const { uploadedData } = useData()
  const coasterCount = uploadedData?.coasters?.length || 0

  const handleNavigation = (path: string) => {
    window.location.href = path
  }

  return (
    <MainContent>
      <Title>Upload Your Coaster Data</Title>

      <Card>
        <Styled.Instructions>
          <h2>Choose Your Upload Method</h2>
          <p>
            Select how you'd like to add coasters to your collection. You can
            use multiple methods - all data will be combined together.
          </p>
          {coasterCount > 0 && (
            <Styled.CurrentDataInfo>
              You currently have <strong>{coasterCount} coasters</strong> in
              your collection.{' '}
              <Styled.ViewLink href='/view-coasters'>
                View all coasters
              </Styled.ViewLink>
            </Styled.CurrentDataInfo>
          )}
        </Styled.Instructions>

        <Styled.UploadOptions>
          <Styled.UploadOption>
            <Styled.UploadButton
              onClick={() => handleNavigation('/upload-csv')}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleNavigation('/upload-csv')
                }
              }}
            >
              <Styled.UploadIcon>CSV</Styled.UploadIcon>
              <h3>Upload CSV File</h3>
              <p>Import coaster data from a CSV spreadsheet file</p>
            </Styled.UploadButton>
          </Styled.UploadOption>

          <Styled.UploadOption>
            <Styled.UploadButton
              onClick={() => handleNavigation('/upload-json')}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleNavigation('/upload-json')
                }
              }}
            >
              <Styled.UploadIcon>JSON</Styled.UploadIcon>
              <h3>Upload JSON Data</h3>
              <p>Paste JSON data or upload a JSON file</p>
            </Styled.UploadButton>
          </Styled.UploadOption>

          <Styled.UploadOption>
            <Styled.UploadButton
              onClick={() => handleNavigation('/upload-manual')}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleNavigation('/upload-manual')
                }
              }}
            >
              <Styled.UploadIcon>FORM</Styled.UploadIcon>
              <h3>Enter Manually</h3>
              <p>Add coasters one at a time using a form</p>
            </Styled.UploadButton>
          </Styled.UploadOption>
        </Styled.UploadOptions>
      </Card>
    </MainContent>
  )
}

export default Upload
