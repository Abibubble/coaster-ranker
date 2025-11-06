import { useState, useMemo } from 'react'
import { Button, MainContent, Title, Text, Link } from '../../components'
import { useData } from '../../contexts/DataContext'
import * as Styled from './ViewCoasters.styled'

interface FilterOptions {
  park: string
  manufacturer: string
  model: string
  material: string
  thrillLevel: string
  country: string
}

export default function ViewCoasters() {
  const { uploadedData, setUploadedData } = useData()
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [filters, setFilters] = useState<FilterOptions>({
    park: '',
    manufacturer: '',
    model: '',
    material: '',
    thrillLevel: '',
    country: '',
  })

  const allCoasters = useMemo(
    () => uploadedData?.coasters || [],
    [uploadedData?.coasters]
  )

  // Sort and filter coasters
  const coasters = useMemo(() => {
    let filteredCoasters = [...allCoasters]

    // Apply filters
    if (filters.park) {
      filteredCoasters = filteredCoasters.filter(coaster =>
        coaster.park.toLowerCase().includes(filters.park.toLowerCase())
      )
    }
    if (filters.manufacturer) {
      filteredCoasters = filteredCoasters.filter(coaster =>
        coaster.manufacturer
          .toLowerCase()
          .includes(filters.manufacturer.toLowerCase())
      )
    }
    if (filters.model) {
      filteredCoasters = filteredCoasters.filter(coaster =>
        coaster.model?.toLowerCase().includes(filters.model.toLowerCase())
      )
    }
    if (filters.material) {
      filteredCoasters = filteredCoasters.filter(coaster =>
        coaster.material?.toLowerCase().includes(filters.material.toLowerCase())
      )
    }
    if (filters.thrillLevel) {
      filteredCoasters = filteredCoasters.filter(coaster =>
        coaster.thrillLevel
          ?.toLowerCase()
          .includes(filters.thrillLevel.toLowerCase())
      )
    }
    if (filters.country) {
      filteredCoasters = filteredCoasters.filter(coaster =>
        coaster.country.toLowerCase().includes(filters.country.toLowerCase())
      )
    }

    // Sort by ranking if available, otherwise maintain original order
    const isRanked =
      uploadedData?.rankingMetadata?.isRanked &&
      uploadedData?.rankingMetadata?.rankedCoasters

    if (isRanked) {
      // Sort by rank position (lower numbers = better rank)
      filteredCoasters.sort((a, b) => {
        const rankA = a.rankPosition || Number.MAX_SAFE_INTEGER
        const rankB = b.rankPosition || Number.MAX_SAFE_INTEGER
        return rankA - rankB
      })
    }

    return filteredCoasters
  }, [allCoasters, filters, uploadedData?.rankingMetadata])

  // Get unique values for filter dropdowns
  const filterOptions = useMemo(() => {
    return {
      parks: [...new Set(allCoasters.map(c => c.park))].sort(),
      manufacturers: [...new Set(allCoasters.map(c => c.manufacturer))].sort(),
      models: [
        ...new Set(allCoasters.map(c => c.model).filter(Boolean)),
      ].sort(),
      materials: [
        ...new Set(allCoasters.map(c => c.material).filter(Boolean)),
      ].sort(),
      thrillLevels: [
        ...new Set(allCoasters.map(c => c.thrillLevel).filter(Boolean)),
      ].sort(),
      countries: [...new Set(allCoasters.map(c => c.country))].sort(),
    }
  }, [allCoasters])

  // Check if any coasters have values for optional fields (use allCoasters for this check)
  const hasModel = allCoasters.some(
    coaster => coaster.model && coaster.model.trim() !== ''
  )
  const hasMaterial = allCoasters.some(
    coaster => coaster.material && coaster.material.trim() !== ''
  )
  const hasThrillLevel = allCoasters.some(
    coaster => coaster.thrillLevel && coaster.thrillLevel.trim() !== ''
  )

  const handleFilterChange = (field: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      park: '',
      manufacturer: '',
      model: '',
      material: '',
      thrillLevel: '',
      country: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '')

  const handleFieldClick = (field: keyof FilterOptions, value: string) => {
    // Only apply filter if the value exists and is not empty
    if (value && value.trim()) {
      setFilters(prev => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleRemoveCoaster = (coasterId: string) => {
    if (!uploadedData) return

    const coasterToRemove = uploadedData.coasters.find(c => c.id === coasterId)
    const coasterName = coasterToRemove ? coasterToRemove.name : 'this coaster'

    const confirmRemove = window.confirm(
      `Are you sure you want to remove "${coasterName}" from your collection? This action cannot be undone.`
    )
    if (!confirmRemove) return

    const updatedCoasters = uploadedData.coasters.filter(
      coaster => coaster.id !== coasterId
    )

    // Update ranking metadata to remove references to the deleted coaster
    let updatedRankingMetadata = uploadedData.rankingMetadata
    if (updatedRankingMetadata && updatedRankingMetadata.rankedCoasters) {
      // Remove the coaster from the ranked list and update positions
      const filteredRankedCoasters =
        updatedRankingMetadata.rankedCoasters.filter(id => id !== coasterId)

      // If ranking exists and we removed a coaster, mark as incomplete
      updatedRankingMetadata = {
        ...updatedRankingMetadata,
        rankedCoasters: filteredRankedCoasters,
        isRanked:
          filteredRankedCoasters.length === updatedCoasters.length &&
          updatedCoasters.length > 0,
        // Clear completed comparisons that involved the removed coaster
        completedComparisons: new Set(
          Array.from(updatedRankingMetadata.completedComparisons || []).filter(
            comparison => !comparison.includes(coasterId)
          )
        ),
      }
    }

    setUploadedData({
      ...uploadedData,
      coasters: updatedCoasters,
      rankingMetadata: updatedRankingMetadata,
    })

    // Announce removal to screen readers
    setStatusMessage(`${coasterName} has been removed from your collection.`)
    setTimeout(() => setStatusMessage(''), 3000)
  }

  const handleRemoveAllCoasters = () => {
    if (!uploadedData || allCoasters.length === 0) return

    const coasterCount = allCoasters.length
    const confirmRemove = window.confirm(
      `Are you sure you want to remove all ${coasterCount} coaster${
        coasterCount === 1 ? '' : 's'
      } from your collection? This action cannot be undone.`
    )

    if (!confirmRemove) return

    // Completely clear all data from localStorage by setting to null
    setUploadedData(null)

    // Announce removal to screen readers
    setStatusMessage(
      `All ${coasterCount} coaster${
        coasterCount === 1 ? '' : 's'
      } have been removed from your collection.`
    )
    setTimeout(() => setStatusMessage(''), 3000)
  }

  if (allCoasters.length === 0) {
    return (
      <MainContent>
        <Title>Your Coasters</Title>
        <section>
          <Styled.EmptyState>
            <Text as='h2' center colour='darkGrey' mb='medium' fontSize='large'>
              No Coasters Yet
            </Text>
            <Text as='p' center colour='mediumGrey' mb='large'>
              You haven't uploaded any coasters yet. Use one of the upload
              methods to add some coasters to your collection.
            </Text>
            <Link href='/upload' variant='button'>
              Go to Upload Page
            </Link>
          </Styled.EmptyState>
        </section>
      </MainContent>
    )
  }

  return (
    <MainContent>
      <Title>Your Coasters</Title>

      {statusMessage && (
        <div
          role='status'
          aria-live='polite'
          style={{
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          {statusMessage}
        </div>
      )}

      <section>
        <Styled.CoastersSummary>
          <Text as='h2' colour='charcoal' fontSize='large' mb='small'>
            Your Collection
          </Text>
          <Text as='p' colour='mediumGrey' mb='small'>
            You have <Text bold>{allCoasters.length}</Text> coaster
            {allCoasters.length === 1 ? '' : 's'} in your collection.
            {coasters.length !== allCoasters.length && (
              <Text colour='darkGrey'>
                {' '}
                (Showing {coasters.length} after filtering)
              </Text>
            )}
          </Text>
          {uploadedData?.uploadedAt && (
            <Text as='p' colour='mutedGrey' fontSize='small' italic>
              Last updated: {uploadedData.uploadedAt.toLocaleDateString()}
            </Text>
          )}
        </Styled.CoastersSummary>

        <Styled.FiltersSection>
          <Text as='h3' colour='charcoal' fontSize='medium' mb='small'>
            Filter Coasters
          </Text>
          <Styled.FiltersGrid>
            <Styled.FilterGroup>
              <Styled.FilterLabel>Park</Styled.FilterLabel>
              <Styled.FilterSelect
                value={filters.park}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange('park', e.target.value)
                }
              >
                <option value=''>All Parks</option>
                {filterOptions.parks.map(park => (
                  <option key={park} value={park}>
                    {park}
                  </option>
                ))}
              </Styled.FilterSelect>
            </Styled.FilterGroup>

            <Styled.FilterGroup>
              <Styled.FilterLabel>Manufacturer</Styled.FilterLabel>
              <Styled.FilterSelect
                value={filters.manufacturer}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange('manufacturer', e.target.value)
                }
              >
                <option value=''>All Manufacturers</option>
                {filterOptions.manufacturers.map(manufacturer => (
                  <option key={manufacturer} value={manufacturer}>
                    {manufacturer}
                  </option>
                ))}
              </Styled.FilterSelect>
            </Styled.FilterGroup>

            <Styled.FilterGroup>
              <Styled.FilterLabel>Country</Styled.FilterLabel>
              <Styled.FilterSelect
                value={filters.country}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  handleFilterChange('country', e.target.value)
                }
              >
                <option value=''>All Countries</option>
                {filterOptions.countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Styled.FilterSelect>
            </Styled.FilterGroup>

            {hasModel && (
              <Styled.FilterGroup>
                <Styled.FilterLabel>Model</Styled.FilterLabel>
                <Styled.FilterSelect
                  value={filters.model}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange('model', e.target.value)
                  }
                >
                  <option value=''>All Models</option>
                  {filterOptions.models.map(model => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </Styled.FilterSelect>
              </Styled.FilterGroup>
            )}

            {hasMaterial && (
              <Styled.FilterGroup>
                <Styled.FilterLabel>Material</Styled.FilterLabel>
                <Styled.FilterSelect
                  value={filters.material}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange('material', e.target.value)
                  }
                >
                  <option value=''>All Materials</option>
                  {filterOptions.materials.map(material => (
                    <option key={material} value={material}>
                      {material}
                    </option>
                  ))}
                </Styled.FilterSelect>
              </Styled.FilterGroup>
            )}

            {hasThrillLevel && (
              <Styled.FilterGroup>
                <Styled.FilterLabel>Thrill Level</Styled.FilterLabel>
                <Styled.FilterSelect
                  value={filters.thrillLevel}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleFilterChange('thrillLevel', e.target.value)
                  }
                >
                  <option value=''>All Thrill Levels</option>
                  {filterOptions.thrillLevels.map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Styled.FilterSelect>
              </Styled.FilterGroup>
            )}
          </Styled.FiltersGrid>

          {hasActiveFilters && (
            <Styled.FilterActions>
              <Button variant='default' onClick={clearAllFilters}>
                Clear All Filters
              </Button>
            </Styled.FilterActions>
          )}
        </Styled.FiltersSection>

        <Styled.ActionsBar>
          <Link href='/upload' variant='button'>
            Add More Coasters
          </Link>
          <Link href='/rank' variant='button'>
            Start Ranking
          </Link>
          <Button
            variant='destructive'
            onClick={handleRemoveAllCoasters}
            aria-label={`Remove all ${coasters.length} coaster${
              coasters.length === 1 ? '' : 's'
            } from collection`}
          >
            Remove All Coasters
          </Button>
        </Styled.ActionsBar>

        <Styled.TableHelpText>
          <Text as='p' colour='mediumGrey' fontSize='small' italic>
            Tip: Click on any park, manufacturer, model, material, or thrill
            level to filter by that value (keyboard: Tab to navigate,
            Enter/Space to activate)
          </Text>
          <Styled.SkipTableLink
            href='#table-end'
            onKeyDown={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                document.getElementById('table-end')?.focus()
              }
            }}
          >
            Skip table navigation
          </Styled.SkipTableLink>
        </Styled.TableHelpText>

        <Styled.CoastersTable role='table' aria-label='Coaster collection data'>
          <Styled.TableHeader
            role='row'
            hasRank={uploadedData?.rankingMetadata?.isRanked}
          >
            {uploadedData?.rankingMetadata?.isRanked && (
              <Styled.HeaderCell role='columnheader'>Rank</Styled.HeaderCell>
            )}
            <Styled.HeaderCell role='columnheader'>Name</Styled.HeaderCell>
            <Styled.HeaderCell role='columnheader'>Park</Styled.HeaderCell>
            <Styled.HeaderCell role='columnheader' isHiddenOnTablet>
              Manufacturer
            </Styled.HeaderCell>
            {hasModel && (
              <Styled.HeaderCell role='columnheader' isHiddenOnTablet>
                Model
              </Styled.HeaderCell>
            )}
            {hasMaterial && (
              <Styled.HeaderCell role='columnheader' isHiddenOnTablet>
                Material
              </Styled.HeaderCell>
            )}
            {hasThrillLevel && (
              <Styled.HeaderCell role='columnheader' isHiddenOnTablet>
                Thrill Level
              </Styled.HeaderCell>
            )}
            <Styled.HeaderCell role='columnheader'>Actions</Styled.HeaderCell>
          </Styled.TableHeader>

          <div role='rowgroup'>
            {coasters.map(coaster => (
              <Styled.TableRow
                key={coaster.id}
                role='row'
                hasRank={uploadedData?.rankingMetadata?.isRanked}
              >
                {uploadedData?.rankingMetadata?.isRanked && (
                  <Styled.TableCell role='cell'>
                    {coaster.rankPosition && (
                      <Text bold colour='charcoal'>
                        #{coaster.rankPosition}
                      </Text>
                    )}
                  </Styled.TableCell>
                )}
                <Styled.TableCell role='cell'>
                  <Text bold colour='charcoal' mb='tiny'>
                    {coaster.name}
                  </Text>
                </Styled.TableCell>
                <Styled.ClickableTableCell
                  role='button'
                  onClick={() => handleFieldClick('park', coaster.park)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleFieldClick('park', coaster.park)
                    }
                  }}
                  tabIndex={0}
                  title={`Filter by park: ${coaster.park}`}
                  aria-label={`Filter by park: ${coaster.park}`}
                >
                  {coaster.park}
                </Styled.ClickableTableCell>
                <Styled.ClickableTableCell
                  role='button'
                  isHiddenOnTablet
                  onClick={() =>
                    handleFieldClick('manufacturer', coaster.manufacturer)
                  }
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      handleFieldClick('manufacturer', coaster.manufacturer)
                    }
                  }}
                  tabIndex={0}
                  title={`Filter by manufacturer: ${coaster.manufacturer}`}
                  aria-label={`Filter by manufacturer: ${coaster.manufacturer}`}
                >
                  {coaster.manufacturer}
                </Styled.ClickableTableCell>
                {hasModel && (
                  <Styled.ClickableTableCell
                    role='button'
                    isHiddenOnTablet
                    onClick={() =>
                      coaster.model && handleFieldClick('model', coaster.model)
                    }
                    onKeyDown={e => {
                      if (
                        (e.key === 'Enter' || e.key === ' ') &&
                        coaster.model
                      ) {
                        e.preventDefault()
                        handleFieldClick('model', coaster.model)
                      }
                    }}
                    tabIndex={0}
                    title={
                      coaster.model
                        ? `Filter by model: ${coaster.model}`
                        : undefined
                    }
                    aria-label={
                      coaster.model
                        ? `Filter by model: ${coaster.model}`
                        : undefined
                    }
                  >
                    {coaster.model}
                  </Styled.ClickableTableCell>
                )}
                {hasMaterial && (
                  <Styled.ClickableTableCell
                    role='button'
                    isHiddenOnTablet
                    onClick={() =>
                      coaster.material &&
                      handleFieldClick('material', coaster.material)
                    }
                    onKeyDown={e => {
                      if (
                        (e.key === 'Enter' || e.key === ' ') &&
                        coaster.material
                      ) {
                        e.preventDefault()
                        handleFieldClick('material', coaster.material)
                      }
                    }}
                    tabIndex={0}
                    title={
                      coaster.material
                        ? `Filter by material: ${coaster.material}`
                        : undefined
                    }
                    aria-label={
                      coaster.material
                        ? `Filter by material: ${coaster.material}`
                        : undefined
                    }
                  >
                    {coaster.material}
                  </Styled.ClickableTableCell>
                )}
                {hasThrillLevel && (
                  <Styled.ClickableTableCell
                    role='button'
                    isHiddenOnTablet
                    onClick={() =>
                      coaster.thrillLevel &&
                      handleFieldClick('thrillLevel', coaster.thrillLevel)
                    }
                    onKeyDown={e => {
                      if (
                        (e.key === 'Enter' || e.key === ' ') &&
                        coaster.thrillLevel
                      ) {
                        e.preventDefault()
                        handleFieldClick('thrillLevel', coaster.thrillLevel)
                      }
                    }}
                    tabIndex={0}
                    title={
                      coaster.thrillLevel
                        ? `Filter by thrill level: ${coaster.thrillLevel}`
                        : undefined
                    }
                    aria-label={
                      coaster.thrillLevel
                        ? `Filter by thrill level: ${coaster.thrillLevel}`
                        : undefined
                    }
                  >
                    {coaster.thrillLevel}
                  </Styled.ClickableTableCell>
                )}
                <Styled.TableCell role='cell'>
                  <Button
                    variant='destructive'
                    onClick={() => handleRemoveCoaster(coaster.id)}
                    aria-label={`Remove ${coaster.name} from collection`}
                  >
                    Remove
                  </Button>
                </Styled.TableCell>
              </Styled.TableRow>
            ))}
          </div>
        </Styled.CoastersTable>

        <div id='table-end' tabIndex={-1}>
          <Text
            as='div'
            center
            colour='mutedGrey'
            fontSize='small'
            italic
            mt='medium'
          >
            Showing {coasters.length} coaster{coasters.length === 1 ? '' : 's'}
          </Text>
        </div>
      </section>
    </MainContent>
  )
}
