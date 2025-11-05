import { MainContent, Title, Text } from '../../components'
import * as Styled from './Home.styled'

function Home() {
  return (
    <MainContent>
      <Title>Coaster Ranker</Title>

      <Styled.Section>
        <Text as='h2' mb='small'>
          Welcome to Coaster Ranker!
        </Text>
        <Text as='p'>
          Create your own personalized ranking of roller coasters. Compare
          coasters head-to-head to build your ultimate coaster tier list.
        </Text>
      </Styled.Section>

      <Styled.Section>
        <Text as='h2' mb='small'>
          Your Privacy Matters
        </Text>
        <Text as='p'>
          <Text bold>We store nothing on our servers.</Text> All your data stays
          securely in your browser's local storage. This means your rankings are
          completely private and only accessible to you.
        </Text>
      </Styled.Section>

      <Styled.Section>
        <Text as='h2' mb='small'>
          Don't Lose Your Rankings!
        </Text>
        <Text as='p'>
          <Text bold>Remember to download your rankings!</Text> Since everything
          is stored locally in your browser, clearing your browser data or
          switching devices will remove your rankings. Always download your
          completed rankings to keep them safe.
        </Text>
      </Styled.Section>

      <Styled.Section>
        <Text as='h2' mb='small'>
          How to Use This Site
        </Text>
        <Styled.OrderedList>
          <Text as='li' mb='tiny'>
            <Text bold>Add Your Coasters:</Text> Upload your coaster list via
            CSV, JSON, or enter them manually
          </Text>
          <Text as='li' mb='tiny'>
            <Text bold>Start Ranking:</Text> Compare coasters head-to-head in
            simple matchups
          </Text>
          <Text as='li' mb='tiny'>
            <Text bold>Build Your List:</Text> The app will intelligently sort
            your coasters based on your preferences
          </Text>
          <Text as='li' mb='tiny'>
            <Text bold>Download Results:</Text> Save your final ranking as a
            downloadable file
          </Text>
        </Styled.OrderedList>

        <Styled.SubSectionTitle as='h3' mb='tiny'>
          Getting Started
        </Styled.SubSectionTitle>
        <Text as='p'>
          New to coaster ranking? Try uploading our example data to see how it
          works, or start fresh with your own coaster list. The ranking process
          is designed to be quick and intuitive - just pick your favorite
          between two coasters!
        </Text>
      </Styled.Section>
    </MainContent>
  )
}
export default Home
