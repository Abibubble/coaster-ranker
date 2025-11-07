import { MainContent, Title, Text, Card, Button } from '../../components'
import * as Styled from './Home.styled'

function Home() {
  return (
    <MainContent>
      <Styled.HeroSection>
        <Styled.HeroContent>
          <Title>Coaster Ranker</Title>
          <Text as='p' fontSize='large' center mb='medium' colour='white'>
            Create your own personalized ranking of roller coasters. Compare
            coasters head-to-head to build your ultimate coaster tier list.
          </Text>
          <Styled.CTAButtonGroup>
            <Button as='link' to='/upload' variant='success'>
              Get Started
            </Button>
            <Button as='link' to='/upload-csv' variant='default'>
              Try Example Data
            </Button>
          </Styled.CTAButtonGroup>
        </Styled.HeroContent>
        <Styled.HeroImage />
      </Styled.HeroSection>

      <Styled.FeaturesSection>
        <Text as='h2' center fontSize='large'>
          Why Choose Coaster Ranker?
        </Text>

        <Styled.FeatureGrid>
          <Styled.FeatureCard>
            <Styled.FeatureContent>
              <Text as='h3' bold fontSize='medium' colour='darkGrey' mb='small'>
                Privacy First
              </Text>
              <Text as='p' colour='mediumGrey' fontSize='body'>
                <Text bold>We store nothing on our servers.</Text> All your data
                stays securely in your browser's local storage. Your rankings
                are completely private and only accessible to you.
              </Text>
            </Styled.FeatureContent>
          </Styled.FeatureCard>

          <Styled.FeatureCard>
            <Styled.FeatureContent>
              <Text as='h3' bold fontSize='medium' colour='darkGrey' mb='small'>
                Quick & Easy
              </Text>
              <Text as='p' colour='mediumGrey' fontSize='body'>
                Simple head-to-head comparisons make ranking effortless. Just
                pick your favorite between two coasters and let our algorithm
                build your personalized tier list.
              </Text>
            </Styled.FeatureContent>
          </Styled.FeatureCard>

          <Styled.FeatureCard>
            <Styled.FeatureContent>
              <Text as='h3' bold fontSize='medium' colour='darkGrey' mb='small'>
                Export Rankings
              </Text>
              <Text as='p' colour='mediumGrey' fontSize='body'>
                Download your completed rankings as JSON or view them anytime.
                Keep your lists safe by exporting them before clearing browser
                data.
              </Text>
            </Styled.FeatureContent>
          </Styled.FeatureCard>
        </Styled.FeatureGrid>
      </Styled.FeaturesSection>

      <Styled.Section>
        <Card title='How to Get Started' variant='outlined' maxWidth='800px'>
          <Styled.StepsList>
            <Styled.Step>
              <Styled.StepNumber>1</Styled.StepNumber>
              <div>
                <Text as='h3' bold mb='tiny'>
                  Add Your Coasters
                </Text>
                <Text as='p' colour='mediumGrey'>
                  Upload your coaster list via CSV, JSON, or enter them
                  manually. New users can try our example data to see how it
                  works.
                </Text>
              </div>
            </Styled.Step>

            <Styled.Step>
              <Styled.StepNumber>2</Styled.StepNumber>
              <div>
                <Text as='h3' bold mb='tiny'>
                  Start Ranking
                </Text>
                <Text as='p' colour='mediumGrey'>
                  Compare coasters head-to-head in simple matchups. Just pick
                  your favorite between two options.
                </Text>
              </div>
            </Styled.Step>

            <Styled.Step>
              <Styled.StepNumber>3</Styled.StepNumber>
              <div>
                <Text as='h3' bold mb='tiny'>
                  Build Your List
                </Text>
                <Text as='p' colour='mediumGrey'>
                  The app intelligently sorts your coasters based on your
                  preferences using advanced ranking algorithms.
                </Text>
              </div>
            </Styled.Step>

            <Styled.Step>
              <Styled.StepNumber>4</Styled.StepNumber>
              <div>
                <Text as='h3' bold mb='tiny'>
                  Download Results
                </Text>
                <Text as='p' colour='mediumGrey'>
                  Save your final ranking as a downloadable file to keep your
                  personalized tier list forever.
                </Text>
              </div>
            </Styled.Step>
          </Styled.StepsList>
        </Card>
      </Styled.Section>

      <Styled.CTASection>
        <Card variant='elevated' maxWidth='600px'>
          <Text as='h2' center mb='small'>
            Ready to Rank Your Coasters?
          </Text>
          <Text as='p' center mb='medium' colour='mediumGrey'>
            Join thousands of coaster enthusiasts creating their perfect
            rankings. Start building your ultimate coaster tier list today!
          </Text>
          <Styled.CTAButtonGroup>
            <Button as='a' href='/upload' variant='success'>
              Start Ranking Now
            </Button>
          </Styled.CTAButtonGroup>
        </Card>
      </Styled.CTASection>
    </MainContent>
  )
}
export default Home
