import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Components/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    as: {
      control: { type: 'select' },
      options: [
        'span',
        'p',
        'div',
        'label',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
      ],
    },
    colour: {
      control: { type: 'select' },
      options: [
        'black',
        'white',
        'darkGrey',
        'mediumGrey',
        'lightGrey',
        'blue',
        'red',
        'green',
      ],
    },
    fontSize: {
      control: { type: 'select' },
      options: ['title', 'huge', 'large', 'body', 'small'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is default text',
  },
}

export const Bold: Story = {
  args: {
    children: 'This is bold text',
    bold: true,
  },
}

export const Title: Story = {
  args: {
    children: 'This is title text',
    fontSize: 'title',
    as: 'h1',
  },
}
