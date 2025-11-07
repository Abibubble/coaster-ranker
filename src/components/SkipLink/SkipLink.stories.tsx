import type { Meta, StoryObj } from '@storybook/react-vite'
import SkipLink from './SkipLink'

const meta: Meta<typeof SkipLink> = {
  title: 'Components/SkipLink',
  component: SkipLink,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div style={{ padding: '20px' }}>
      <p style={{ marginBottom: '16px', fontSize: '14px', color: '#666' }}>
        <strong>Note:</strong> Press Tab to see the skip link appear.
      </p>
      <SkipLink />
      <div id='main-content' style={{ marginTop: '20px', padding: '20px' }}>
        <h2>Main Content</h2>
        <p>Skip link jumps to this content area.</p>
      </div>
    </div>
  ),
}
