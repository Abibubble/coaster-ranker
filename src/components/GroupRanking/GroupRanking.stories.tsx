import type { Meta, StoryObj } from '@storybook/react'
import GroupRanking from './GroupRanking'
import { Coaster } from '../../types/data'

// Mock coaster data
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
    name: 'Maverick',
    park: 'Cedar Point',
    country: 'United States',
    manufacturer: 'Intamin',
    model: 'Blitz',
    material: 'Steel',
  },
  {
    id: '3',
    name: 'Fury 325',
    park: 'Carowinds',
    country: 'United States',
    manufacturer: 'Bolliger & Mabillard',
    model: 'Giga',
    material: 'Steel',
  },
  {
    id: '4',
    name: 'Twisted Timbers',
    park: 'Kings Dominion',
    country: 'United States',
    manufacturer: 'Rocky Mountain Construction',
    model: 'I-Box',
    material: 'Steel',
  },
]

const meta: Meta<typeof GroupRanking> = {
  title: 'Components/GroupRanking',
  component: GroupRanking,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    groupBy: {
      control: { type: 'select' },
      options: ['park', 'model'],
    },
    onRankingComplete: { action: 'ranking completed' },
    onHierarchicalFallback: { action: 'hierarchical fallback' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const GroupByPark: Story = {
  args: {
    coasters: mockCoasters,
    groupBy: 'park',
  },
}

export const GroupByModel: Story = {
  args: {
    coasters: mockCoasters,
    groupBy: 'model',
  },
}
