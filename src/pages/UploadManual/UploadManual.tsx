import React, { useState } from 'react'
import {
  Button,
  CurrentDataInfo,
  DuplicateResolver,
  InfoMessage,
  MainContent,
  Title,
  Text,
} from '../../components'
import { useData } from '../../contexts/DataContext'
import { Coaster } from '../../types/data'
import { detectDuplicates, DuplicateMatch, formatString } from '../../utils'
import type { DuplicateResolution } from '../../components/DuplicateResolver'
import * as Styled from './UploadManual.styled'

interface CoasterFormData {
  name: string
  park: string
  manufacturer: string
  model?: string
  material?: string
  thrillLevel?: string
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
    material: '',
    thrillLevel: '',
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
      material: '',
      thrillLevel: '',
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
    ]
    const missingFields = requiredFields.filter(
      field => !formData[field]?.trim()
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
      name: formatString(formData.name.trim(), 'space', 'first-word', false),
      park: formatString(formData.park.trim(), 'space', 'first-word', false),
      manufacturer: formatString(
        formData.manufacturer.trim(),
        'space',
        'first-word',
        false
      ),
      model: formData.model?.trim()
        ? formatString(formData.model.trim(), 'space', 'first-word', false)
        : undefined,
      material: formData.material?.trim()
        ? formatString(formData.material.trim(), 'space', 'first-word', false)
        : undefined,
      thrillLevel: formData.thrillLevel?.trim()
        ? formatString(
            formData.thrillLevel.trim(),
            'space',
            'first-word',
            false
          )
        : undefined,
      country: formatString(
        formData.country.trim(),
        'space',
        'first-word',
        false
      ),
      isNewCoaster: true,
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
      material: '',
      thrillLevel: '',
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
        {coasterCount > 0 && (
          <>
            <CurrentDataInfo coasterCount={coasterCount} />
            <Text as='h2' colour='charcoal' fontSize='medium' mb='small'>
              Enter Coaster Details
            </Text>
          </>
        )}
        <Text as='p' colour='mediumGrey' mb='small'>
          Add a single coaster to your collection by filling out the form below.
          You can add multiple coasters by submitting the form multiple times.
        </Text>

        <section>
          <Styled.Form onSubmit={handleSubmit}>
            <div>
              {/* <Styled.FormTitle as='h3' colour='charcoal' mb='small'>
                Required Information
              </Styled.FormTitle> */}

              <Styled.FormRow>
                <Styled.FormGroup>
                  <Text
                    as='label'
                    bold
                    colour='charcoal'
                    fontSize='small'
                    htmlFor='name'
                  >
                    Name *
                  </Text>
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
                  <Text
                    as='label'
                    bold
                    colour='charcoal'
                    fontSize='small'
                    htmlFor='park'
                  >
                    Theme Park *
                  </Text>
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
                  <Text
                    as='label'
                    bold
                    colour='charcoal'
                    fontSize='small'
                    htmlFor='manufacturer'
                  >
                    Manufacturer *
                  </Text>
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
                  <Text
                    as='label'
                    bold
                    colour='charcoal'
                    fontSize='small'
                    htmlFor='model'
                  >
                    Model
                  </Text>
                  <Styled.Input
                    type='text'
                    id='model'
                    name='model'
                    value={formData.model || ''}
                    onChange={handleInputChange}
                    placeholder='e.g. Euro-Fighter'
                  />
                </Styled.FormGroup>
              </Styled.FormRow>

              <Styled.FormGroup>
                <Text
                  as='label'
                  bold
                  colour='charcoal'
                  fontSize='small'
                  htmlFor='material'
                >
                  Material
                </Text>
                <Styled.Select
                  id='material'
                  name='material'
                  value={formData.material || ''}
                  onChange={handleInputChange}
                >
                  <option value=''>Select material...</option>
                  <option value='Steel'>Steel</option>
                  <option value='Wood'>Wood</option>
                  <option value='Hybrid'>Hybrid</option>
                </Styled.Select>
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Text
                  as='label'
                  bold
                  colour='charcoal'
                  fontSize='small'
                  htmlFor='thrillLevel'
                >
                  Thrill Level
                </Text>
                <Styled.Select
                  id='thrillLevel'
                  name='thrillLevel'
                  value={formData.thrillLevel || ''}
                  onChange={handleInputChange}
                >
                  <option value=''>Select thrill level...</option>
                  <option value='Kiddie'>Kiddie</option>
                  <option value='Family'>Family</option>
                  <option value='Family Thrill'>Family Thrill</option>
                  <option value='Thrill'>Thrill</option>
                </Styled.Select>
              </Styled.FormGroup>

              <Styled.FormGroup>
                <Text
                  as='label'
                  bold
                  colour='charcoal'
                  fontSize='small'
                  htmlFor='country'
                >
                  Country
                </Text>
                <Styled.Input
                  type='text'
                  id='country'
                  name='country'
                  value={formData.country || ''}
                  onChange={handleInputChange}
                  placeholder='e.g. United Kingdom'
                />
              </Styled.FormGroup>
            </div>

            <Button type='submit'>Add Coaster to Collection</Button>
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
            <InfoMessage variant='error' role='alert' aria-live='assertive'>
              <Text as='span' bold colour='errorText' fontSize='small'>
                ERROR:
              </Text>
              <Text as='span' colour='errorText' fontSize='small'>
                {error}
              </Text>
            </InfoMessage>
          )}

          {success && (
            <InfoMessage variant='success' role='status' aria-live='polite'>
              <Text as='span' bold colour='successGreen' fontSize='small'>
                SUCCESS:
              </Text>
              <Text as='span' colour='successGreen' fontSize='small'>
                {success}
              </Text>
            </InfoMessage>
          )}
        </section>
      </section>
    </MainContent>
  )
}
