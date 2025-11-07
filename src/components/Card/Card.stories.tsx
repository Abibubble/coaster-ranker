import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import Card from './Card'
import { Button } from '../Button'
import { Text } from '../Text'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'elevated', 'outlined'],
    },
    titleSize: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    clickable: {
      control: { type: 'boolean' },
    },
    onClick: { action: 'card clicked' },
  },
  decorators: [
    Story => (
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle',
    children: (
      <p>
        This is the main content of the card. It can contain any React
        components or text content.
      </p>
    ),
  },
}

export const Elevated: Story = {
  args: {
    title: 'Elevated Card',
    subtitle: 'With shadow styling',
    variant: 'elevated',
    children: (
      <p>
        This card uses the elevated variant, which adds a subtle shadow and
        removes the border for a more modern look.
      </p>
    ),
  },
}

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    subtitle: 'With blue border',
    variant: 'outlined',
    children: (
      <p>
        This card uses the outlined variant, which features a blue border and
        transparent background.
      </p>
    ),
  },
}

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Interactive card with hover effects',
    clickable: true,
    'aria-label': 'Click this card to perform an action',
    children: (
      <p>
        This card is clickable and will show hover effects. It becomes a button
        element when clickable is true.
      </p>
    ),
    onClick: () => alert('Card clicked!'),
  },
}

export const WithActions: Story = {
  args: {
    title: 'Card with Actions',
    subtitle: 'Multiple action buttons',
    children: <p>This card includes action buttons.</p>,
    actions: (
      <>
        <Button>Cancel</Button>
        <Button>Confirm</Button>
      </>
    ),
  },
}

export const WithFooter: Story = {
  args: {
    title: 'Card with Footer',
    subtitle: 'Additional footer content',
    children: (
      <p>
        This card demonstrates the footer area which is separated by a border
        from the main content.
      </p>
    ),
    footer: (
      <Text fontSize='small' colour='mutedGrey'>
        Footer information or metadata can go here.
      </Text>
    ),
  },
}

export const CoasterCard: Story = {
  args: {
    title: 'Steel Vengeance',
    subtitle: 'Cedar Point, United States',
    clickable: true,
    'aria-label': 'Choose Steel Vengeance as your favorite',
    children: (
      <div>
        <p>
          <Text bold>Manufacturer:</Text> Rocky Mountain Construction
        </p>
        <p>
          <Text bold>Model:</Text> I-Box
        </p>
        <p>
          <Text bold>Type:</Text> Hybrid
        </p>
      </div>
    ),
    onClick: () => console.log('Steel Vengeance selected'),
  },
}
