import type { Meta, StoryObj } from '@storybook/react'
import ScreenReaderOnly from './ScreenReaderOnly'

const meta: Meta<typeof ScreenReaderOnly> = {
  title: 'Components/ScreenReaderOnly',
  component: ScreenReaderOnly,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This text is only visible to screen readers',
  },
}

export const AsHeading: Story = {
  args: {
    children: 'Hidden Section Heading',
    as: 'h2',
  },
}
