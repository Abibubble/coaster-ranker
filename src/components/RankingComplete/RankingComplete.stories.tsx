import type { Meta, StoryObj } from '@storybook/react'
import RankingComplete from './RankingComplete'
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
    type: 'Hybrid',
    rankPosition: 1,
  },
  {
    id: '2',
    name: 'Fury 325',
    park: 'Carowinds',
    country: 'United States',
    manufacturer: 'Bolliger & Mabillard',
    model: 'Giga',
    type: 'Steel',
    rankPosition: 2,
  },
  {
    id: '3',
    name: 'Lightning Rod',
    park: 'Dollywood',
    country: 'United States',
    manufacturer: 'Rocky Mountain Construction',
    model: 'Launch',
    type: 'Wood',
    rankPosition: 3,
  },
  {
    id: '4',
    name: 'Maverick',
    park: 'Cedar Point',
    country: 'United States',
    manufacturer: 'Intamin',
    model: 'Blitz',
    type: 'Steel',
    rankPosition: 4,
  },
  {
    id: '5',
    name: 'Skyrush',
    park: 'Hersheypark',
    country: 'United States',
    manufacturer: 'Intamin',
    model: 'Mega',
    type: 'Steel',
    rankPosition: 5,
  },
]

const meta: Meta<typeof RankingComplete> = {
  title: 'Components/RankingComplete',
  component: RankingComplete,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onRankAgain: { action: 'rank again clicked' },
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
    rankedCoasters: mockCoasters,
    onRankAgain: () => console.log('Rank again clicked'),
  },
}

export const SingleCoaster: Story = {
  args: {
    rankedCoasters: [mockCoasters[0]],
    onRankAgain: () => console.log('Rank again clicked'),
  },
}
