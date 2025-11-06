import { Link, MainContent, Title, Text } from '../../components'
import * as Styled from './Accessibility.styled'

function Accessibility() {
  return (
    <MainContent>
      <Styled.PageContent>
        <Title>Accessibility Statement</Title>

        <Text as='p' mb='medium'>
          Coaster Ranker is committed to being accessible to all users,
          including those with disabilities. We've built this application to
          work with screen readers, keyboard navigation, and other assistive
          technologies.
        </Text>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            How to Use Coaster Ranker Accessibly
          </Text>

          <Text as='h3' bold colour='darkGrey' mb='small' mt='medium'>
            Keyboard Navigation
          </Text>
          <Text as='p' mb='small'>
            You can navigate the entire application using only your keyboard:
          </Text>
          <Styled.List>
            <Text as='li'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Tab
              </Styled.KeyboardShortcut>{' '}
              - Move to the next button, link, or form field
            </Text>
            <Text as='li'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Shift + Tab
              </Styled.KeyboardShortcut>{' '}
              - Move to the previous element
            </Text>
            <Text as='li'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Enter
              </Styled.KeyboardShortcut>{' '}
              - Activate buttons and links
            </Text>
            <Text as='li'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Space
              </Styled.KeyboardShortcut>{' '}
              - Activate buttons and checkboxes
            </Text>
            <Text as='li'>
              <Styled.KeyboardShortcut as='code' colour='white'>
                Arrow Keys
              </Styled.KeyboardShortcut>{' '}
              - Navigate dropdown menus
            </Text>
          </Styled.List>

          <Text as='h3' bold colour='darkGrey' mb='small' mt='medium'>
            Screen Reader Support
          </Text>
          <Styled.List>
            <Text as='li'>All images have descriptive alternative text</Text>
            <Text as='li'>Form fields are clearly labeled</Text>
            <Text as='li'>Error messages are announced when they appear</Text>
            <Text as='li'>
              Page structure uses proper headings for easy navigation
            </Text>
            <Text as='li'>Skip link available to jump to main content</Text>
          </Styled.List>

          <Text as='h3' bold colour='darkGrey' mb='small' mt='medium'>
            Visual Features
          </Text>
          <Styled.List>
            <Text as='li'>High contrast colors for better readability</Text>
            <Text as='li'>Text remains readable when zoomed up to 200%</Text>
            <Text as='li'>
              Clear focus indicators show where you are on the page
            </Text>
            <Text as='li'>No information is conveyed by color alone</Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Supported Assistive Technologies
          </Text>
          <Text as='p' mb='small'>
            Coaster Ranker works with:
          </Text>
          <Styled.List>
            <Text as='li'>
              Screen readers (JAWS, NVDA, VoiceOver, TalkBack)
            </Text>
            <Text as='li'>Voice control software</Text>
            <Text as='li'>Screen magnification tools</Text>
            <Text as='li'>Switch navigation devices</Text>
            <Text as='li'>Eye tracking systems</Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Browser Compatibility
          </Text>
          <Text as='p' mb='small'>
            This application works best with recent versions of:
          </Text>
          <Styled.List>
            <Text as='li'>Chrome</Text>
            <Text as='li'>Firefox</Text>
            <Text as='li'>Safari</Text>
            <Text as='li'>Edge</Text>
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
            <Text as='li'>
              <Link dark href='https://www.w3.org/WAI/'>
                Web Accessibility Initiative (WAI)
              </Link>
            </Text>
            <Text as='li'>
              <Link dark href='https://webaim.org/'>
                WebAIM - Web Accessibility In Mind
              </Link>
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.FooterText as='p' italic mt='large'>
          Last updated: October 30, 2025
        </Styled.FooterText>
      </Styled.PageContent>
    </MainContent>
  )
}

export default Accessibility
