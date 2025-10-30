import React, { useState, useEffect } from 'react'
import { Card, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'
import { Coaster } from '../../types/data'
import * as Styled from './Rank.styled'

function Rank() {
  const { uploadedData, setUploadedData } = useData()
  const [currentPair, setCurrentPair] = useState<[Coaster, Coaster] | null>(
    null
  )
  const [remainingComparisons, setRemainingComparisons] = useState<
    [Coaster, Coaster][]
  >([])
  const [isRankingComplete, setIsRankingComplete] = useState(false)
  const [completedComparisons, setCompletedComparisons] = useState(0)
  const [totalComparisons, setTotalComparisons] = useState(0)
  const [rankings, setRankings] = useState<Map<string, number>>(new Map())
  const [rankedCoasters, setRankedCoasters] = useState<Coaster[]>([])

  console.log('Rank component state:', {
    hasUploadedData: !!uploadedData,
    coastersCount: uploadedData?.coasters.length || 0,
    isRankingComplete,
    currentPair: currentPair
      ? `${currentPair[0].name} vs ${currentPair[1].name}`
      : null,
    completedComparisons,
    totalComparisons,
  })

  // Generate all possible pairs for comparison
  const generateComparisons = (coasters: Coaster[]): [Coaster, Coaster][] => {
    const pairs: [Coaster, Coaster][] = []
    for (let i = 0; i < coasters.length - 1; i++) {
      for (let j = i + 1; j < coasters.length; j++) {
        pairs.push([coasters[i], coasters[j]])
      }
    }
    return pairs
  }

  // Initialize ranking when coasters are available
  useEffect(() => {
    if (
      uploadedData &&
      uploadedData.coasters.length >= 2 &&
      !isRankingComplete
    ) {
      console.log(
        'Initializing ranking with',
        uploadedData.coasters.length,
        'coasters'
      )
      const comparisons = generateComparisons(uploadedData.coasters)
      setRemainingComparisons(comparisons)
      setCurrentPair(comparisons[0] || null)
      setTotalComparisons(comparisons.length)
      setCompletedComparisons(0)

      // Initialize rankings map with wins count
      const initialRankings = new Map<string, number>()
      uploadedData.coasters.forEach(coaster => {
        initialRankings.set(coaster.id, 0)
      })
      setRankings(initialRankings)
    }
  }, [uploadedData, isRankingComplete])

  // Handle coaster selection (user picks their favorite)
  const handleCoasterChoice = (chosenCoaster: Coaster) => {
    if (!currentPair || !uploadedData) return

    console.log(`User chose: ${chosenCoaster.name}`)

    // Update rankings - increment wins for chosen coaster
    const newRankings = new Map(rankings)
    const currentWins = newRankings.get(chosenCoaster.id) || 0
    newRankings.set(chosenCoaster.id, currentWins + 1)
    setRankings(newRankings)

    // Move to next comparison
    const nextComparisons = remainingComparisons.slice(1)
    setRemainingComparisons(nextComparisons)
    setCompletedComparisons(prev => prev + 1)

    if (nextComparisons.length > 0) {
      setCurrentPair(nextComparisons[0])
    } else {
      // Ranking complete
      console.log('All comparisons complete! Setting completion state...')

      // Sort coasters by number of wins (descending), then by original ID
      const sortedCoasters = [...uploadedData.coasters].sort((a, b) => {
        const aWins = newRankings.get(a.id) || 0
        const bWins = newRankings.get(b.id) || 0

        if (aWins !== bWins) {
          return bWins - aWins // More wins = higher rank
        }
        return a.id.localeCompare(b.id) // Tie-breaker
      })

      console.log(
        'Ranked coasters:',
        sortedCoasters.map(c => `${c.name} (${newRankings.get(c.id)} wins)`)
      )

      // Store the ranked coasters for display
      setRankedCoasters(sortedCoasters)

      // Set completion state
      setCurrentPair(null)
      setIsRankingComplete(true)

      // Update the data context with new sequential IDs after a delay
      setTimeout(() => {
        const rerankedCoasters = sortedCoasters.map((coaster, index) => ({
          ...coaster,
          id: `${index + 1}`.padStart(3, '0'), // 001, 002, 003, etc.
        }))

        setUploadedData({
          ...uploadedData,
          coasters: rerankedCoasters,
        })

        console.log('Data updated with new IDs')
      }, 500) // Longer delay to ensure completion screen is visible
    }
  }

  // Restart ranking
  const restartRanking = () => {
    console.log('Restarting ranking...')
    if (uploadedData && uploadedData.coasters.length >= 2) {
      const comparisons = generateComparisons(uploadedData.coasters)
      setRemainingComparisons(comparisons)
      setCurrentPair(comparisons[0] || null)
      setCompletedComparisons(0)
      setTotalComparisons(comparisons.length)
      setIsRankingComplete(false)
      setRankedCoasters([])

      // Reset rankings
      const initialRankings = new Map<string, number>()
      uploadedData.coasters.forEach(coaster => {
        initialRankings.set(coaster.id, 0)
      })
      setRankings(initialRankings)

      console.log('Ranking restarted')
    }
  }

  if (!uploadedData) {
    return (
      <MainContent>
        <Title>Rank Your Coasters</Title>
        <Card>
          <p>
            No coaster data uploaded yet. Please visit the{' '}
            <a href='/upload' aria-label='Go to upload page'>
              Upload page
            </a>{' '}
            to upload your coaster experiences. You'll need at least 2 coasters
            to start ranking.
          </p>
        </Card>
      </MainContent>
    )
  }

  const { coasters, filename, uploadedAt } = uploadedData

  // Show ranking interface if 2+ coasters
  if (coasters.length >= 2) {
    return (
      <MainContent>
        <Title>Rank Your Coasters</Title>

        <Card>
          <h2>Coaster Ranking</h2>
          <div aria-label='Upload summary'>
            <p>
              <strong>File:</strong> {filename}
            </p>
            <p>
              <strong>Uploaded:</strong> {uploadedAt.toLocaleDateString()} at{' '}
              {uploadedAt.toLocaleTimeString()}
            </p>
            <p>
              <strong>Total Coasters:</strong> {coasters.length}
            </p>
          </div>

          <Styled.RankingContainer>
            {isRankingComplete ? (
              <Styled.RankingComplete>
                <h3>Ranking Complete!</h3>
                <p>
                  Your coasters have been ranked based on your preferences!
                  Here's your final ranking:
                </p>
                <div style={{ margin: '1.5rem 0', textAlign: 'left' }}>
                  <ol>
                    {rankedCoasters.slice(0, 5).map((coaster, _index) => (
                      <li key={coaster.id} style={{ marginBottom: '0.5rem' }}>
                        <strong>{coaster.name}</strong> at {coaster.park}
                      </li>
                    ))}
                    {rankedCoasters.length > 5 && (
                      <li style={{ fontStyle: 'italic', color: '#666' }}>
                        ...and {rankedCoasters.length - 5} more
                      </li>
                    )}
                  </ol>
                </div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#666',
                    marginBottom: '1rem',
                  }}
                >
                  This ranking order will be used when you download your coaster
                  collection.
                </p>
                <Styled.RestartButton onClick={restartRanking}>
                  Rank Again
                </Styled.RestartButton>
              </Styled.RankingComplete>
            ) : currentPair ? (
              <>
                <Styled.ProgressInfo>
                  <h4>Which coaster do you prefer?</h4>
                  <p>
                    Progress: {completedComparisons} of {totalComparisons}{' '}
                    comparisons
                  </p>
                </Styled.ProgressInfo>

                <Styled.ComparisonArea>
                  <Styled.CoasterCard
                    onClick={() => handleCoasterChoice(currentPair[0])}
                    aria-label={`Choose ${currentPair[0].name} as your favorite`}
                  >
                    <Styled.CoasterName>
                      {currentPair[0].name}
                    </Styled.CoasterName>
                    <Styled.CoasterPark>
                      {currentPair[0].park} ({currentPair[0].country})
                    </Styled.CoasterPark>
                    <Styled.CoasterDetails>
                      <p>
                        <strong>Manufacturer:</strong>{' '}
                        {currentPair[0].manufacturer}
                      </p>
                      <p>
                        <strong>Model:</strong> {currentPair[0].model}
                      </p>
                      <p>
                        <strong>Type:</strong> {currentPair[0].type}
                      </p>
                      {currentPair[0].height && (
                        <p>
                          <strong>Height:</strong> {currentPair[0].height}m
                        </p>
                      )}
                      {currentPair[0].speed && (
                        <p>
                          <strong>Speed:</strong> {currentPair[0].speed} km/h
                        </p>
                      )}
                    </Styled.CoasterDetails>
                  </Styled.CoasterCard>

                  <Styled.VersusText>VS</Styled.VersusText>

                  <Styled.CoasterCard
                    onClick={() => handleCoasterChoice(currentPair[1])}
                    aria-label={`Choose ${currentPair[1].name} as your favorite`}
                  >
                    <Styled.CoasterName>
                      {currentPair[1].name}
                    </Styled.CoasterName>
                    <Styled.CoasterPark>
                      {currentPair[1].park} ({currentPair[1].country})
                    </Styled.CoasterPark>
                    <Styled.CoasterDetails>
                      <p>
                        <strong>Manufacturer:</strong>{' '}
                        {currentPair[1].manufacturer}
                      </p>
                      <p>
                        <strong>Model:</strong> {currentPair[1].model}
                      </p>
                      <p>
                        <strong>Type:</strong> {currentPair[1].type}
                      </p>
                      {currentPair[1].height && (
                        <p>
                          <strong>Height:</strong> {currentPair[1].height}m
                        </p>
                      )}
                      {currentPair[1].speed && (
                        <p>
                          <strong>Speed:</strong> {currentPair[1].speed} km/h
                        </p>
                      )}
                    </Styled.CoasterDetails>
                  </Styled.CoasterCard>
                </Styled.ComparisonArea>
              </>
            ) : null}
          </Styled.RankingContainer>
        </Card>
      </MainContent>
    )
  }

  // Show coaster list if only 1 coaster
  return (
    <MainContent>
      <Title>Rank Your Coasters</Title>

      <Card>
        <h2>Your Coaster Collection</h2>
        <div aria-label='Upload summary'>
          <p>
            <strong>File:</strong> {filename}
          </p>
          <p>
            <strong>Uploaded:</strong> {uploadedAt.toLocaleDateString()} at{' '}
            {uploadedAt.toLocaleTimeString()}
          </p>
          <p>
            <strong>Total Coasters:</strong> {coasters.length}
          </p>
        </div>

        <h3>Coasters Ready for Ranking</h3>
        <div role='region' aria-label='Coaster list'>
          <ul>
            {coasters.slice(0, 10).map((coaster, _index) => (
              <li key={coaster.id}>
                <strong>{coaster.name}</strong> at {coaster.park} (
                {coaster.country})
                <span
                  aria-label={`Manufacturer: ${coaster.manufacturer}, Model: ${coaster.model}, Type: ${coaster.type}`}
                >
                  {' '}
                  — {coaster.manufacturer} {coaster.model} ({coaster.type})
                </span>
              </li>
            ))}
            {coasters.length > 10 && (
              <li>
                <em>
                  ...and {coasters.length - 10} more coaster
                  {coasters.length - 10 === 1 ? '' : 's'}
                </em>
              </li>
            )}
          </ul>
        </div>

        {coasters.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            {coasters.length >= 2 ? (
              <p>
                <em>
                  Ranking functionality is available! You can start ranking your{' '}
                  {coasters.length} coasters.
                </em>
              </p>
            ) : (
              <p>
                <em>
                  Upload at least one more coaster to start ranking. You need a
                  minimum of 2 coasters to compare and rank.
                </em>
              </p>
            )}
          </div>
        )}
      </Card>
    </MainContent>
  )
}

export default Rank
