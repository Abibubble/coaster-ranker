import { Card, MainContent, Title } from '../../components'
import { useData } from '../../contexts/DataContext'

function Rank() {
  const { uploadedData } = useData()

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
            to upload your coaster experiences.
          </p>
        </Card>
      </MainContent>
    )
  }

  const { coasters, filename, uploadedAt } = uploadedData

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
                <strong>{coaster.name}</strong> at {coaster.park}
                {coaster.country && ` (${coaster.country})`}
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
            <p>
              <em>
                Ranking functionality coming soon! Start by uploading your
                coaster experiences above.
              </em>
            </p>
          </div>
        )}
      </Card>
    </MainContent>
  )
}

export default Rank
