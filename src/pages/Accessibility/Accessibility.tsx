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
          comply with WCAG 2.2 Level AA standards and work seamlessly with
          screen readers, keyboard navigation, and other assistive technologies.
        </Text>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Accessibility standards
          </Text>
          <Styled.List>
            <Text as='li'>
              <Text bold>WCAG 2.2 Level AA Compliance:</Text> We meet the latest
              international accessibility guidelines
            </Text>
            <Text as='li'>
              <Text bold>Responsive Design:</Text> Fully accessible across all
              devices, from 320px mobile screens to desktop
            </Text>
            <Text as='li'>
              <Text bold>Component Architecture:</Text> Reusable, accessible
              components ensure consistency throughout the application
            </Text>
            <Text as='li'>
              <Text bold>Mobile-First Approach:</Text> Touch targets and
              interactions optimized for all screen sizes
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Using Coaster Ranker
          </Text>

          <Text as='h3' bold colour='darkGrey' mb='small' mt='medium'>
            Keyboard navigation
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
            Screen reader support
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
            Visual features
          </Text>
          <Styled.List>
            <Text as='li'>
              WCAG 2.2 AA compliant color contrast ratios throughout
            </Text>
            <Text as='li'>
              Responsive typography that maintains proper heading hierarchy at
              all screen sizes
            </Text>
            <Text as='li'>Text remains readable when zoomed up to 200%</Text>
            <Text as='li'>
              Clear focus indicators show where you are on the page
            </Text>
            <Text as='li'>No information is conveyed by color alone</Text>
            <Text as='li'>
              Optimized touch targets (44px minimum) for mobile accessibility
            </Text>
          </Styled.List>

          <Text as='h3' bold colour='darkGrey' mb='small' mt='medium'>
            Collection management
          </Text>
          <Styled.List>
            <Text as='li'>
              Real-time status displays for uploaded coaster collections
            </Text>
            <Text as='li'>
              Consistent interface components across all upload methods
            </Text>
            <Text as='li'>
              Clear progress indicators and success/error messages
            </Text>
            <Text as='li'>
              Duplicate detection with accessible resolution interface
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Supported assistive technologies
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
            Browser compatibility
          </Text>
          <Text as='p' mb='small'>
            This application works best with recent versions of:
          </Text>
          <Styled.List>
            <Text as='li'>Chrome (recommended for full feature support)</Text>
            <Text as='li'>Firefox</Text>
            <Text as='li'>Safari</Text>
            <Text as='li'>Edge</Text>
          </Styled.List>
          <Text as='p' mt='small'>
            <Text bold>Note:</Text> The application is optimized for modern
            browsers and requires an internet connection to load.
          </Text>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Need help?
          </Text>
          <Text as='p' mb='small'>
            If you encounter any accessibility issues or have suggestions for
            improvement, please let us know. We're committed to making this
            application work for everyone.
          </Text>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Learn more About web accessibility
          </Text>
          <Styled.List>
            <Text as='li'>
              <Link
                dark
                href='https://www.w3.org/WAI/WCAG22/quickref/'
                external
              >
                WCAG 2.2 Guidelines (Quick Reference)
              </Link>
            </Text>
            <Text as='li'>
              <Link dark href='https://www.w3.org/WAI/' external>
                Web Accessibility Initiative (WAI)
              </Link>
            </Text>
            <Text as='li'>
              <Link dark href='https://webaim.org/' external>
                WebAIM - Web Accessibility In Mind
              </Link>
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.FooterText as='p' italic mt='large'>
          Last updated: November 6, 2025
        </Styled.FooterText>
      </Styled.PageContent>
    </MainContent>
  )
}

export default Accessibility
