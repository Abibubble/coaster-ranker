import { Link, MainContent, Title } from '../../components'
import * as Styled from './Accessibility.styled'

function Accessibility() {
  return (
    <MainContent>
      <Styled.PageContent>
        <Title>Accessibility Statement</Title>

        <Styled.Paragraph>
          Coaster Ranker is committed to being accessible to all users,
          including those with disabilities. We've built this application to
          work with screen readers, keyboard navigation, and other assistive
          technologies.
        </Styled.Paragraph>

        <Styled.Section>
          <Styled.SectionTitle>
            How to Use Coaster Ranker Accessibly
          </Styled.SectionTitle>

          <Styled.SubsectionTitle>Keyboard Navigation</Styled.SubsectionTitle>
          <Styled.Paragraph>
            You can navigate the entire application using only your keyboard:
          </Styled.Paragraph>
          <Styled.List>
            <li>
              <Styled.KeyboardShortcut>Tab</Styled.KeyboardShortcut> - Move to
              the next button, link, or form field
            </li>
            <li>
              <Styled.KeyboardShortcut>Shift + Tab</Styled.KeyboardShortcut> -
              Move to the previous element
            </li>
            <li>
              <Styled.KeyboardShortcut>Enter</Styled.KeyboardShortcut> -
              Activate buttons and links
            </li>
            <li>
              <Styled.KeyboardShortcut>Space</Styled.KeyboardShortcut> -
              Activate buttons and checkboxes
            </li>
            <li>
              <Styled.KeyboardShortcut>Arrow Keys</Styled.KeyboardShortcut> -
              Navigate dropdown menus
            </li>
          </Styled.List>

          <Styled.SubsectionTitle>Screen Reader Support</Styled.SubsectionTitle>
          <Styled.List>
            <li>All images have descriptive alternative text</li>
            <li>Form fields are clearly labeled</li>
            <li>Error messages are announced when they appear</li>
            <li>Page structure uses proper headings for easy navigation</li>
            <li>Skip link available to jump to main content</li>
          </Styled.List>

          <Styled.SubsectionTitle>Visual Features</Styled.SubsectionTitle>
          <Styled.List>
            <li>High contrast colors for better readability</li>
            <li>Text remains readable when zoomed up to 200%</li>
            <li>Clear focus indicators show where you are on the page</li>
            <li>No information is conveyed by color alone</li>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Styled.SectionTitle>
            Supported Assistive Technologies
          </Styled.SectionTitle>
          <Styled.Paragraph>Coaster Ranker works with:</Styled.Paragraph>
          <Styled.List>
            <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
            <li>Voice control software</li>
            <li>Screen magnification tools</li>
            <li>Switch navigation devices</li>
            <li>Eye tracking systems</li>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Styled.SectionTitle>Browser Compatibility</Styled.SectionTitle>
          <Styled.Paragraph>
            This application works best with recent versions of:
          </Styled.Paragraph>
          <Styled.List>
            <li>Chrome</li>
            <li>Firefox</li>
            <li>Safari</li>
            <li>Edge</li>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Styled.SectionTitle>Need Help?</Styled.SectionTitle>
          <Styled.Paragraph>
            If you encounter any accessibility issues or have suggestions for
            improvement, please let us know. We're committed to making this
            application work for everyone.
          </Styled.Paragraph>
        </Styled.Section>

        <Styled.Section>
          <Styled.SectionTitle>
            Learn More About Web Accessibility
          </Styled.SectionTitle>
          <Styled.List>
            <li>
              <Link dark href='https://www.w3.org/WAI/'>
                Web Accessibility Initiative (WAI)
              </Link>
            </li>
            <li>
              <Link dark href='https://webaim.org/'>
                WebAIM - Web Accessibility In Mind
              </Link>
            </li>
          </Styled.List>
        </Styled.Section>

        <Styled.Paragraph>
          <Styled.ItalicText>Last updated: October 30, 2025</Styled.ItalicText>
        </Styled.Paragraph>
      </Styled.PageContent>
    </MainContent>
  )
}

export default Accessibility
