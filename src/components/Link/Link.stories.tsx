import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import Link from './Link'

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'button', 'back'],
    },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a link',
    href: '#',
  },
}

export const ButtonStyle: Story = {
  args: {
    children: 'Button Link',
    href: '#',
    variant: 'button',
  },
}

export const Back: Story = {
  args: {
    children: '← Go Back',
    href: '#',
    variant: 'back',
  },
}
