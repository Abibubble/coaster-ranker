import type { Meta, StoryObj } from '@storybook/react'
import RankingControls from './RankingControls'

const meta: Meta<typeof RankingControls> = {
  title: 'Components/RankingControls',
  component: RankingControls,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onReset: { action: 'reset clicked' },
    onUndo: { action: 'undo clicked' },
    canUndo: {
      control: { type: 'boolean' },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onReset: () => console.log('Reset clicked'),
    canUndo: true,
    onUndo: () => console.log('Undo clicked'),
  },
}

export const CannotUndo: Story = {
  args: {
    onReset: () => console.log('Reset clicked'),
    canUndo: false,
    onUndo: () => console.log('Undo clicked'),
  },
}
