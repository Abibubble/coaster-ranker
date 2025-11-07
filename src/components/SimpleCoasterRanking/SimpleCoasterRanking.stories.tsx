import type { Meta, StoryObj } from '@storybook/react-vite'
import SimpleCoasterRanking from './SimpleCoasterRanking'
import { Coaster } from '../../types/data'

// Mock coaster data for stories
const mockCoasters: Coaster[] = [
  {
    id: '1',
    name: 'Steel Vengeance',
    park: 'Cedar Point',
    country: 'United States',
    manufacturer: 'Rocky Mountain Construction',
    model: 'I-Box',
    material: 'Hybrid',
  },
  {
    id: '2',
    name: 'Fury 325',
    park: 'Carowinds',
    country: 'United States',
    manufacturer: 'Bolliger & Mabillard',
    model: 'Giga',
    material: 'Steel',
  },
  {
    id: '3',
    name: 'Lightning Rod',
    park: 'Dollywood',
    country: 'United States',
    manufacturer: 'Rocky Mountain Construction',
    model: 'Launch',
    material: 'Wood',
  },
  {
    id: '4',
    name: 'Maverick',
    park: 'Cedar Point',
    country: 'United States',
    manufacturer: 'Intamin',
    model: 'Blitz',
    material: 'Steel',
  },
]

const meta: Meta<typeof SimpleCoasterRanking> = {
  title: 'Components/SimpleCoasterRanking',
  component: SimpleCoasterRanking,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onComplete: { action: 'ranking completed' },
    hideProgress: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    Story => (
      <div style={{ minHeight: '400px', width: '100%', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    coasters: mockCoasters,
    onComplete: (ranked: Coaster[]) =>
      console.log(
        'Ranking complete:',
        ranked.map(c => c.name)
      ),
    hideProgress: false,
  },
}

export const WithoutProgress: Story = {
  args: {
    coasters: mockCoasters.slice(0, 3),
    onComplete: (ranked: Coaster[]) =>
      console.log(
        'Ranking complete:',
        ranked.map(c => c.name)
      ),
    hideProgress: true,
  },
}
