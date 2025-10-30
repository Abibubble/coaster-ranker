import React, { useState } from 'react'
import { Card, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import { Coaster } from '../../types/data'
import * as Styled from './UploadManual.styled'

interface CoasterFormData {
  name: string
  park: string
  manufacturer: string
  model: string
  type: string
  country: string
  location: string
  height: string
  speed: string
  inversions: string
  year: string
}

export default function UploadManual() {
  const { uploadedData, setUploadedData } = useData()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [formData, setFormData] = useState<CoasterFormData>({
    name: '',
    park: '',
    manufacturer: '',
    model: '',
    type: '',
    country: '',
    location: '',
    height: '',
    speed: '',
    inversions: '',
    year: '',
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const generateId = () => {
    return Math.random().toString(36).substr(2, 9)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    // Validate required fields
    const requiredFields: (keyof CoasterFormData)[] = [
      'name',
      'park',
      'manufacturer',
      'model',
      'type',
      'country',
    ]
    const missingFields = requiredFields.filter(
      field => !formData[field].trim()
    )

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(', ')}`
      )
      return
    }

    // Create new coaster object
    const newCoaster: Coaster = {
      id: generateId(),
      name: formData.name.trim(),
      park: formData.park.trim(),
      manufacturer: formData.manufacturer.trim(),
      model: formData.model.trim(),
      type: formData.type.trim(),
      country: formData.country.trim(),
      location: formData.location.trim() || undefined,
      height: formData.height.trim()
        ? Number(formData.height.trim())
        : undefined,
      speed: formData.speed.trim() ? Number(formData.speed.trim()) : undefined,
      inversions: formData.inversions.trim()
        ? Number(formData.inversions.trim())
        : undefined,
      year: formData.year.trim() ? Number(formData.year.trim()) : undefined,
    }

    // Add to existing data
    const existingCoasters = uploadedData?.coasters || []
    const updatedData = {
      coasters: [...existingCoasters, newCoaster],
      uploadedAt: uploadedData?.uploadedAt || new Date(),
      filename: uploadedData?.filename || 'manual-entry',
    }

    setUploadedData(updatedData)
    setSuccess(`Successfully added "${newCoaster.name}" to your collection!`)

    // Reset form
    setFormData({
      name: '',
      park: '',
      manufacturer: '',
      model: '',
      type: '',
      country: '',
      location: '',
      height: '',
      speed: '',
      inversions: '',
      year: '',
    })
  }

  const coasterCount = uploadedData?.coasters?.length || 0

  return (
    <MainContent>
      <Title>Add Coaster Manually</Title>

      <Card>
        <Styled.Instructions>
          <h2>Enter Coaster Details</h2>
          <p>
            Add a single coaster to your collection by filling out the form
            below. You can add multiple coasters by submitting the form multiple
            times.
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

        <Styled.Form onSubmit={handleSubmit}>
          <Styled.FormSection>
            <h3>Required Information</h3>

            <Styled.FormRow>
              <Styled.FormGroup>
                <Styled.Label htmlFor='name'>Name *</Styled.Label>
                <Styled.Input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. The Smiler'
                  required
                />
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Styled.Label htmlFor='park'>Theme Park *</Styled.Label>
                <Styled.Input
                  type='text'
                  id='park'
                  name='park'
                  value={formData.park || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. Alton Towers'
                  required
                />
              </Styled.FormGroup>
            </Styled.FormRow>

            <Styled.FormRow>
              <Styled.FormGroup>
                <Styled.Label htmlFor='manufacturer'>
                  Manufacturer *
                </Styled.Label>
                <Styled.Input
                  type='text'
                  id='manufacturer'
                  name='manufacturer'
                  value={formData.manufacturer || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. Gerstlauer'
                  required
                />
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Styled.Label htmlFor='model'>Model *</Styled.Label>
                <Styled.Input
                  type='text'
                  id='model'
                  name='model'
                  value={formData.model || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. Euro-Fighter'
                  required
                />
              </Styled.FormGroup>
            </Styled.FormRow>

            <Styled.FormGroup>
              <Styled.Label htmlFor='type'>Type *</Styled.Label>
              <Styled.Select
                id='type'
                name='type'
                value={formData.type || ''}
                onChange={handleInputChange}
                required
              >
                <option value=''>Select type...</option>
                <option value='Steel'>Steel</option>
                <option value='Wood'>Wood</option>
                <option value='Hybrid'>Hybrid</option>
              </Styled.Select>
            </Styled.FormGroup>

            <Styled.FormGroup>
              <Styled.Label htmlFor='country'>Country *</Styled.Label>
              <Styled.Input
                type='text'
                id='country'
                name='country'
                value={formData.country || ''}
                onChange={handleInputChange}
                placeholder='e.g. United Kingdom'
                required
              />
            </Styled.FormGroup>
          </Styled.FormSection>

          <Styled.FormSection>
            <h3>Optional Information</h3>

            <Styled.FormRow>
              <Styled.FormGroup>
                <Styled.Label htmlFor='location'>Location</Styled.Label>
                <Styled.Input
                  type='text'
                  id='location'
                  name='location'
                  value={formData.location || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. Staffordshire'
                />
              </Styled.FormGroup>
            </Styled.FormRow>

            <Styled.FormRow>
              <Styled.FormGroup>
                <Styled.Label htmlFor='height'>Height</Styled.Label>
                <Styled.Input
                  type='text'
                  id='height'
                  name='height'
                  value={formData.height || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. 30m or 98ft'
                />
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Styled.Label htmlFor='speed'>Speed</Styled.Label>
                <Styled.Input
                  type='text'
                  id='speed'
                  name='speed'
                  value={formData.speed || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. 85 km/h or 53 mph'
                />
              </Styled.FormGroup>
            </Styled.FormRow>

            <Styled.FormRow>
              <Styled.FormGroup>
                <Styled.Label htmlFor='inversions'>Inversions</Styled.Label>
                <Styled.Input
                  type='text'
                  id='inversions'
                  name='inversions'
                  value={formData.inversions || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. 14'
                />
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Styled.Label htmlFor='year'>Year Opened</Styled.Label>
                <Styled.Input
                  type='text'
                  id='year'
                  name='year'
                  value={formData.year || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. 2013'
                />
              </Styled.FormGroup>
            </Styled.FormRow>
          </Styled.FormSection>

          <Styled.SubmitButton type='submit'>
            Add Coaster to Collection
          </Styled.SubmitButton>
        </Styled.Form>

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
