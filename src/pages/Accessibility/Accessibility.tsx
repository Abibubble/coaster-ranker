import { Link, MainContent, Title, Text } from '../../components'
import * as Styled from './Accessibility.styled'

function Accessibility() {
  return (
    <MainContent>
      <Styled.PageContent>
        <Title>Accessibility Statement</Title>

        <Text as='p'>
          Coaster Ranker is committed to being accessible to all users,
          including those with disabilities. We've built this application to
          work with screen readers, keyboard navigation, and other assistive
          technologies.
        </Text>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            How to Use Coaster Ranker Accessibly
          </Text>

          <Styled.SubsectionTitle as='h3' bold colour='darkGrey'>
            Keyboard Navigation
          </Styled.SubsectionTitle>
          <Text as='p'>
            You can navigate the entire application using only your keyboard:
          </Text>
          <Styled.List>
            <Text as='li' mb='tiny'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Tab
              </Styled.KeyboardShortcut>{' '}
              - Move to the next button, link, or form field
            </Text>
            <Text as='li' mb='tiny'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Shift + Tab
              </Styled.KeyboardShortcut>{' '}
              - Move to the previous element
            </Text>
            <Text as='li' mb='tiny'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Enter
              </Styled.KeyboardShortcut>{' '}
              - Activate buttons and links
            </Text>
            <Text as='li' mb='tiny'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Space
              </Styled.KeyboardShortcut>{' '}
              - Activate buttons and checkboxes
            </Text>
            <Text as='li' mb='tiny'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Arrow Keys
              </Styled.KeyboardShortcut>{' '}
              - Navigate dropdown menus
            </Text>
          </Styled.List>

          <Styled.SubsectionTitle>Screen Reader Support</Styled.SubsectionTitle>
          <Styled.List>
            <Text as='li' mb='tiny'>
              All images have descriptive alternative text
            </Text>
            <Text as='li' mb='tiny'>
              Form fields are clearly labeled
            </Text>
            <Text as='li' mb='tiny'>
              Error messages are announced when they appear
            </Text>
            <Text as='li' mb='tiny'>
              Page structure uses proper headings for easy navigation
            </Text>
            <Text as='li' mb='tiny'>
              Skip link available to jump to main content
            </Text>
          </Styled.List>

          <Styled.SubsectionTitle>Visual Features</Styled.SubsectionTitle>
          <Styled.List>
            <Text as='li' mb='tiny'>
              High contrast colors for better readability
            </Text>
            <Text as='li' mb='tiny'>
              Text remains readable when zoomed up to 200%
            </Text>
            <Text as='li' mb='tiny'>
              Clear focus indicators show where you are on the page
            </Text>
            <Text as='li' mb='tiny'>
              No information is conveyed by color alone
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Supported Assistive Technologies
          </Text>
          <Text as='p'>Coaster Ranker works with:</Text>
          <Styled.List>
            <Text as='li' mb='tiny'>
              Screen readers (JAWS, NVDA, VoiceOver, TalkBack)
            </Text>
            <Text as='li' mb='tiny'>
              Voice control software
            </Text>
            <Text as='li' mb='tiny'>
              Screen magnification tools
            </Text>
            <Text as='li' mb='tiny'>
              Switch navigation devices
            </Text>
            <Text as='li' mb='tiny'>
              Eye tracking systems
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Browser Compatibility
          </Text>
          <Text as='p'>
            This application works best with recent versions of:
          </Text>
          <Styled.List>
            <Text as='li' mb='tiny'>
              Chrome
            </Text>
            <Text as='li' mb='tiny'>
              Firefox
            </Text>
            <Text as='li' mb='tiny'>
              Safari
            </Text>
            <Text as='li' mb='tiny'>
              Edge
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Need Help?
          </Text>
          <Text as='p'>
            If you encounter any accessibility issues or have suggestions for
            improvement, please let us know. We're committed to making this
            application work for everyone.
          </Text>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Learn More About Web Accessibility
          </Text>
          <Styled.List>
            <Text as='li' mb='tiny'>
              <Link dark href='https://www.w3.org/WAI/'>
                Web Accessibility Initiative (WAI)
              </Link>
            </Text>
            <Text as='li' mb='tiny'>
              <Link dark href='https://webaim.org/'>
                WebAIM - Web Accessibility In Mind
              </Link>
            </Text>
          </Styled.List>
        </Styled.Section>

        <Text as='p'>
          <Text italic>Last updated: October 30, 2025</Text>
        </Text>
      </Styled.PageContent>
    </MainContent>
  )
}

export default Accessibility
