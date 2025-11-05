import type { Meta, StoryObj } from '@storybook/react'
import MainContent from './MainContent'

const meta: Meta<typeof MainContent> = {
  title: 'Components/MainContent',
  component: MainContent,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '20px' }}>
        <h1>Main Content Area</h1>
        <p>This is the main content container with proper semantic markup.</p>
      </div>
    ),
  },
}

export const InPageLayout: Story = {
  render: () => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <header
        style={{ backgroundColor: '#333', color: 'white', padding: '16px' }}
      >
        <h1 style={{ margin: 0 }}>Coaster Ranker</h1>
      </header>
      <MainContent>
        <div style={{ padding: '20px' }}>
          <h1>Welcome to Coaster Ranker</h1>
          <p>This shows the MainContent component in a typical page layout.</p>
        </div>
      </MainContent>
      <footer
        style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <p>© Bubble & Squeak</p>
      </footer>
    </div>
  ),
}
