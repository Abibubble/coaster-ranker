import { MainContent, Title, Link, Text } from '../../components'
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

      <section>
        <Styled.Instructions>
          <Text as='h2' colour='charcoal' fontSize='large' mb='small'>
            Choose Your Upload Method
          </Text>
          <Text as='p' colour='mediumGrey' mb='small'>
            Select how you'd like to add coasters to your collection. You can
            use multiple methods - all data will be combined together.
          </Text>
          {coasterCount > 0 && (
            <Styled.CurrentDataInfo>
              You currently have{' '}
              <Text bold colour='blue'>
                {coasterCount} coasters
              </Text>{' '}
              in your collection.{' '}
              <Link href='/view-coasters' variant='button'>
                View all coasters
              </Link>
            </Styled.CurrentDataInfo>
          )}
        </Styled.Instructions>

        <Styled.UploadOptions>
          <div>
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
              <Text as='h3' colour='charcoal'>
                Upload CSV File
              </Text>
              <Text as='p' colour='mediumGrey' fontSize='small'>
                Import coaster data from a CSV spreadsheet file
              </Text>
            </Styled.UploadButton>
          </div>

          <div>
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
              <Text as='h3' colour='charcoal'>
                Upload JSON Data
              </Text>
              <Text as='p' colour='mediumGrey' fontSize='small'>
                Paste JSON data or upload a JSON file
              </Text>
            </Styled.UploadButton>
          </div>

          <div>
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
              <Text as='p'>Add coasters one at a time using a form</Text>
            </Styled.UploadButton>
          </div>
        </Styled.UploadOptions>
      </section>
    </MainContent>
  )
}

export default Upload
