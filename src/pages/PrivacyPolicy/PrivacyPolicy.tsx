import { MainContent, Title, Text } from '../../components'
import * as Styled from './PrivacyPolicy.styled'

function PrivacyPolicy() {
  return (
    <MainContent>
      <Styled.PageContent>
        <Title>Privacy Policy</Title>

        <Text as='p' mb='medium'>
          Coaster Ranker respects your privacy and is committed to protecting
          your personal information. This Privacy Policy explains how we handle
          your data when you use our application.
        </Text>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Data Collection
          </Text>
          <Text as='p' mb='small'>
            Coaster Ranker is designed to prioritize your privacy:
          </Text>
          <Styled.List>
            <Text as='li'>
              <Text bold>No personal information collected:</Text> We do not
              collect, store, or process any personal information such as names,
              email addresses, or contact details.
            </Text>
            <Text as='li'>
              <Text bold>Local data only:</Text> All coaster data you upload and
              rankings you create are stored locally in your browser. This data
              never leaves your device.
            </Text>
            <Text as='li'>
              <Text bold>No tracking:</Text> We do not use cookies, analytics,
              or tracking technologies to monitor your usage.
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            How Your Data is Used
          </Text>
          <Text as='p' mb='small'>
            Any data you provide to Coaster Ranker is used solely for:
          </Text>
          <Styled.List>
            <Text as='li'>Displaying your coaster information</Text>
            <Text as='li'>Enabling you to rank and compare coasters</Text>
            <Text as='li'>Generating downloadable rankings</Text>
          </Styled.List>
          <Text as='p' mb='medium'>
            Since all data is stored locally, you have complete control over
            your information and can clear it at any time by clearing your
            browser's local storage.
          </Text>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Data Storage and Security
          </Text>
          <Styled.List>
            <Text as='li'>
              <Text bold>Local storage:</Text> All data is stored in your
              browser's local storage and never transmitted to external servers.
            </Text>
            <Text as='li'>
              <Text bold>No server storage:</Text> We do not maintain any
              databases or servers that store your information.
            </Text>
            <Text as='li'>
              <Text bold>Browser security:</Text> Your data is protected by your
              browser's built-in security features.
            </Text>
          </Styled.List>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Third-Party Services
          </Text>
          <Text as='p' mb='medium'>
            Coaster Ranker does not integrate with any third-party services that
            would have access to your data. The application runs entirely in
            your browser without external dependencies that could compromise
            your privacy.
          </Text>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Your Rights
          </Text>
          <Text as='p' mb='small'>
            Since all data is stored locally on your device, you have complete
            control:
          </Text>
          <Styled.List>
            <Text as='li'>
              <Text bold>Delete your data:</Text> Clear your browser's local
              storage to remove all Coaster Ranker data
            </Text>
            <Text as='li'>
              <Text bold>Export your data:</Text> Use the download feature to
              export your rankings in various formats
            </Text>
            <Text as='li'>
              <Text bold>Data portability:</Text> Your data is yours to keep and
              use as you see fit
            </Text>
          </Styled.List>
        </Styled.Section>
        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            How to Clear Your Data
          </Text>
          <Text as='p' mb='small'>
            To completely remove all Coaster Ranker data from your browser:
          </Text>
          <Styled.List>
            <Text as='li'>
              <Text bold>Chrome:</Text> Go to Settings → Privacy and security →
              Clear browsing data → Advanced → Select "Local storage" → Clear
              data
            </Text>
            <Text as='li'>
              <Text bold>Firefox:</Text> Go to Settings → Privacy & Security →
              Cookies and Site Data → Manage Data → Search for this site →
              Remove
            </Text>
            <Text as='li'>
              <Text bold>Safari:</Text> Go to Preferences → Privacy → Manage
              Website Data → Search for this site → Remove
            </Text>
            <Text as='li'>
              <Text bold>Edge:</Text> Go to Settings → Privacy, search, and
              services → Clear browsing data → Choose what to clear → Select
              "Local storage" → Clear
            </Text>
          </Styled.List>
          <Text as='p' mb='medium'>
            <Text bold>Note:</Text> Clearing your browser's local storage will
            remove all your coaster data and rankings permanently. Make sure to
            download your rankings first if you want to keep them.
          </Text>
        </Styled.Section>

        <Styled.Section>
          <Text as='h2' bold colour='darkGrey' fontSize='large' mb='medium'>
            Changes to This Policy
          </Text>
          <Text as='p' mb='medium'>
            We may update this Privacy Policy from time to time. Any changes
            will be reflected on this page with an updated date. Since we don't
            collect contact information, we recommend checking this page
            periodically for updates.
          </Text>
        </Styled.Section>

        <Styled.FooterText as='p' italic mt='large'>
          Last updated: November 6, 2025
        </Styled.FooterText>
      </Styled.PageContent>
    </MainContent>
  )
}

export default PrivacyPolicy
