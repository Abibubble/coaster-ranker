import type { Meta, StoryObj } from '@storybook/react'
import PreRankingQuestion from './PreRankingQuestion'

const meta: Meta<typeof PreRankingQuestion> = {
  title: 'Components/PreRankingQuestion',
  component: PreRankingQuestion,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    onAnswer: { action: 'answered' },
    onCancel: { action: 'cancelled' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const FirstUpload: Story = {
  args: {
    coasterCount: 15,
    filename: 'my-coasters.csv',
    hasExistingRankedData: false,
  },
}

export const AddingToExisting: Story = {
  args: {
    coasterCount: 12,
    filename: 'new-coasters.csv',
    hasExistingRankedData: true,
    existingCoasterCount: 25,
  },
}
