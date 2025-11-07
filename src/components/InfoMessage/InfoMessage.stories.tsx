import type { Meta, StoryObj } from '@storybook/react-vite'
import { InfoMessage } from './InfoMessage'

const meta: Meta<typeof InfoMessage> = {
  title: 'Components/InfoMessage',
  component: InfoMessage,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['error', 'success', 'info'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while processing your request.',
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    children: 'Your changes have been saved successfully!',
  },
}

export const Info: Story = {
  args: {
    variant: 'info',
    children: 'Rankings are automatically saved as you make changes.',
  },
}
