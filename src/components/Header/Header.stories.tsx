import type { Meta, StoryObj } from '@storybook/react'
import Header from './Header'

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const InPageLayout: Story = {
  render: () => (
    <div>
      <Header />
      <div style={{ padding: '20px' }}>
        <h1>Page Content</h1>
        <p>This shows the header in a typical page layout.</p>
      </div>
    </div>
  ),
}
