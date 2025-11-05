import type { Meta, StoryObj } from '@storybook/react'
import Title from './Title'

const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Page Title',
  },
}

export const LongTitle: Story = {
  args: {
    children:
      'This is a Very Long Page Title That Shows How the Component Handles Multiple Words',
  },
}
