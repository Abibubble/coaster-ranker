import React, { useState } from 'react'
import {
  BackLink,
  DuplicateResolver,
  MainContent,
  Title,
  ViewLink,
} from '../../components'
import { useData } from '../../contexts/DataContext'
import { Coaster } from '../../types/data'
import {
  detectDuplicates,
  DuplicateMatch,
} from '../../utils/duplicateDetection'
import type { DuplicateResolution } from '../../components/DuplicateResolver'
import * as Styled from './UploadManual.styled'

interface CoasterFormData {
  name: string
  park: string
  manufacturer: string
  model: string
  type: string
  country: string
}

export default function UploadManual() {
  const { uploadedData, setUploadedData } = useData()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<DuplicateMatch[]>([])
  const [pendingCoaster, setPendingCoaster] = useState<Coaster | null>(null)
  const [showDuplicateResolver, setShowDuplicateResolver] = useState(false)

  const [formData, setFormData] = useState<CoasterFormData>({
    name: '',
    park: '',
    manufacturer: '',
    model: '',
    type: '',
    country: '',
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

  const addCoasterToCollection = (coasterToAdd: Coaster) => {
    // Add to existing data
    const existingCoasters = uploadedData?.coasters || []
    const updatedData = {
      coasters: [...existingCoasters, coasterToAdd],
      uploadedAt: uploadedData?.uploadedAt || new Date(),
      filename: uploadedData?.filename || 'manual-entry',
      rankingMetadata: uploadedData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        totalWins: new Map<string, number>(),
        rankedCoasters: [],
        isRanked: false,
      },
    }

    setUploadedData(updatedData)
    setSuccess(`Successfully added "${coasterToAdd.name}" to your collection!`)

    // Reset form
    setFormData({
      name: '',
      park: '',
      manufacturer: '',
      model: '',
      type: '',
      country: '',
    })
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
      isNewCoaster: true,
      wins: 0,
    }

    // Check for duplicates
    const existingCoasters = uploadedData?.coasters || []
    const duplicateCheck = detectDuplicates(existingCoasters, [newCoaster])

    if (duplicateCheck.hasDuplicates) {
      setDuplicates(duplicateCheck.duplicates)
      setPendingCoaster(newCoaster)
      setShowDuplicateResolver(true)
    } else {
      addCoasterToCollection(newCoaster)
    }
  }

  const handleDuplicateResolution = (resolutions: DuplicateResolution[]) => {
    if (!pendingCoaster) return

    const existingCoasters = uploadedData?.coasters || []
    let updatedCoasters = [...existingCoasters]

    // Process each resolution
    resolutions.forEach((resolution, index) => {
      const duplicate = duplicates[index]

      switch (resolution.action) {
        case 'keep-existing':
          // Do nothing - new coaster is not added
          break
        case 'keep-new':
          // Remove existing coaster and add new one
          updatedCoasters = updatedCoasters.filter(
            c => c.id !== duplicate.existingCoaster.id
          )
          updatedCoasters.push(pendingCoaster)
          break
        case 'keep-both':
          // Add new coaster alongside existing one
          updatedCoasters.push(pendingCoaster)
          break
      }
    })

    // If all resolutions were "keep-existing", add new coaster if it wasn't already processed
    const hasNewCoaster = resolutions.some(
      r => r.action === 'keep-new' || r.action === 'keep-both'
    )
    if (
      !hasNewCoaster &&
      resolutions.length > 0 &&
      resolutions[0].action === 'keep-existing'
    ) {
      // Only the first duplicate matters for single coaster addition
      // Don't add the new coaster
    } else if (!hasNewCoaster) {
      updatedCoasters.push(pendingCoaster)
    }

    const updatedData = {
      coasters: updatedCoasters,
      uploadedAt: uploadedData?.uploadedAt || new Date(),
      filename: uploadedData?.filename || 'manual-entry',
      rankingMetadata: uploadedData?.rankingMetadata || {
        completedComparisons: new Set<string>(),
        totalWins: new Map<string, number>(),
        rankedCoasters: [],
        isRanked: false,
      },
    }

    setUploadedData(updatedData)
    setSuccess(`Successfully processed coaster: "${pendingCoaster.name}"!`)

    // Reset states
    setShowDuplicateResolver(false)
    setDuplicates([])
    setPendingCoaster(null)

    // Reset form
    setFormData({
      name: '',
      park: '',
      manufacturer: '',
      model: '',
      type: '',
      country: '',
    })
  }

  const handleDuplicateCancel = () => {
    setShowDuplicateResolver(false)
    setDuplicates([])
    setPendingCoaster(null)
    setError('Upload cancelled due to potential duplicates.')
  }

  const coasterCount = uploadedData?.coasters?.length || 0

  return (
    <MainContent>
      <Title>Add Coaster Manually</Title>

      <section>
        <Styled.Instructions>
          <h2>Enter Coaster Details</h2>
          <p>
            Add a single coaster to your collection by filling out the form
            below. You can add multiple coasters by submitting the form multiple
            times.
          </p>
          {coasterCount > 0 && (
            <Styled.CurrentDataInfo>
              You currently have{' '}
              <Styled.BoldText>{coasterCount} coasters</Styled.BoldText> in your
              collection.{' '}
              <ViewLink href='/view-coasters'>View all coasters</ViewLink>
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
              <Styled.Label htmlFor='country'>Country</Styled.Label>
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

          <Styled.SubmitButton type='submit'>
            Add Coaster to Collection
          </Styled.SubmitButton>
        </Styled.Form>

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
    </MainContent>
  )
}
