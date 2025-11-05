import type { Meta, StoryObj } from '@storybook/react'
import Footer from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InPageLayout: Story = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <div
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <main style={{ flex: 1, padding: '20px', backgroundColor: '#f5f5f5' }}>
        <h1>Page Content</h1>
        <p>This shows the footer in a typical page layout.</p>
      </main>
      <Footer />
    </div>
  ),
}
