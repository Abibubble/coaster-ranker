import type { Meta, StoryObj } from '@storybook/react-vite'
import ProgressInfo from './ProgressInfo'

const meta: Meta<typeof ProgressInfo> = {
  title: 'Components/ProgressInfo',
  component: ProgressInfo,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    showProgressBar: {
      control: { type: 'boolean' },
    },
    showCoastersLeft: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    remainingComparisons: 15,
    totalComparisons: 50,
    showProgressBar: true,
  },
}

export const CoasterCountMode: Story = {
  args: {
    title: 'Ranking in progress',
    totalCoasters: 20,
    rankedCoasters: 12,
    showCoastersLeft: true,
    showProgressBar: false,
  },
}
