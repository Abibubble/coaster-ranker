import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import CoasterComparison from './CoasterComparison'
import { Coaster } from '../../types/data'

// Mock coaster data for stories
const mockCoaster1: Coaster = {
  id: '1',
  name: 'Steel Vengeance',
  park: 'Cedar Point',
  country: 'United States',
  manufacturer: 'Rocky Mountain Construction',
  model: 'I-Box',
  material: 'Hybrid',
}

const mockCoaster2: Coaster = {
  id: '2',
  name: 'Fury 325',
  park: 'Carowinds',
  country: 'United States',
  manufacturer: 'Bolliger & Mabillard',
  model: 'Giga',
  material: 'Steel',
}

const mockCoaster3: Coaster = {
  id: '3',
  name: 'Hyperion',
  park: 'Energylandia',
  country: 'Poland',
  manufacturer: 'Intamin',
  model: 'Mega',
  material: 'Steel',
}

const mockCoaster4: Coaster = {
  id: '4',
  name: 'The Voyage',
  park: 'Holiday World',
  country: 'United States',
  manufacturer: 'The Gravity Group',
  model: 'Wooden',
  material: 'Wood',
}

const meta: Meta<typeof CoasterComparison> = {
  title: 'Components/CoasterComparison',
  component: CoasterComparison,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChoose1: { action: 'chose coaster 1' },
    onChoose2: { action: 'chose coaster 2' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    coaster1: mockCoaster1,
    coaster2: mockCoaster2,
    onChoose1: () => console.log('Chose Steel Vengeance'),
    onChoose2: () => console.log('Chose Fury 325'),
  },
}

export const HybridVsSteel: Story = {
  args: {
    coaster1: mockCoaster1, // Steel Vengeance (Hybrid)
    coaster2: mockCoaster2, // Fury 325 (Steel)
    onChoose1: () => console.log('Chose Steel Vengeance'),
    onChoose2: () => console.log('Chose Fury 325'),
  },
}

export const SteelVsWood: Story = {
  args: {
    coaster1: mockCoaster3, // Hyperion (Steel)
    coaster2: mockCoaster4, // The Voyage (Wood)
    onChoose1: () => console.log('Chose Hyperion'),
    onChoose2: () => console.log('Chose The Voyage'),
  },
}

export const InternationalComparison: Story = {
  args: {
    coaster1: mockCoaster3, // Hyperion (Poland)
    coaster2: mockCoaster1, // Steel Vengeance (USA)
    onChoose1: () => console.log('Chose Hyperion'),
    onChoose2: () => console.log('Chose Steel Vengeance'),
  },
}

export const DifferentManufacturers: Story = {
  args: {
    coaster1: {
      id: '5',
      name: 'Taron',
      park: 'Phantasialand',
      country: 'Germany',
      manufacturer: 'Intamin',
      model: 'LSM Launch',
      material: 'Steel',
    },
    coaster2: {
      id: '6',
      name: 'Nemesis',
      park: 'Alton Towers',
      country: 'United Kingdom',
      manufacturer: 'Bolliger & Mabillard',
      model: 'Inverted',
      material: 'Steel',
    },
    onChoose1: () => console.log('Chose Taron'),
    onChoose2: () => console.log('Chose Nemesis'),
  },
}

export const LongNames: Story = {
  args: {
    coaster1: {
      id: '7',
      name: 'Voltron Nevera powered by Rimac',
      park: 'Europa-Park',
      country: 'Germany',
      manufacturer: 'Mack Rides',
      model: 'Xtreme Spinning Coaster',
      material: 'Steel',
    },
    coaster2: {
      id: '8',
      name: 'The Incredible Hulk Coaster',
      park: 'Universal Studios Islands of Adventure',
      country: 'United States',
      manufacturer: 'Bolliger & Mabillard',
      model: 'Launched Sit Down',
      material: 'Steel',
    },
    onChoose1: () => console.log('Chose Voltron'),
    onChoose2: () => console.log('Chose Hulk'),
  },
}

const InteractiveDemoComponent = () => {
  const [choice, setChoice] = React.useState<string | null>(null)
  const [comparisonCount, setComparisonCount] = React.useState(1)

  const handleChoice1 = () => {
    setChoice(mockCoaster1.name)
    setTimeout(() => {
      setChoice(null)
      setComparisonCount(prev => prev + 1)
    }, 1000)
  }

  const handleChoice2 = () => {
    setChoice(mockCoaster2.name)
    setTimeout(() => {
      setChoice(null)
      setComparisonCount(prev => prev + 1)
    }, 1000)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h3>Comparison #{comparisonCount}</h3>
        {choice && (
          <p style={{ color: '#007acc', fontWeight: 'bold' }}>
            You chose: {choice}
          </p>
        )}
      </div>

      <CoasterComparison
        coaster1={mockCoaster1}
        coaster2={mockCoaster2}
        onChoose1={handleChoice1}
        onChoose2={handleChoice2}
      />

      <p style={{ fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Click on either coaster card to make your choice!
      </p>
    </div>
  )
}

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
}

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ maxWidth: '600px' }}>
        <h3>Accessibility Features</h3>
        <ul style={{ fontSize: '14px', color: '#666' }}>
          <li>Cards are keyboard navigable (try pressing Tab)</li>
          <li>Cards have descriptive aria-labels</li>
          <li>Screen readers will announce the coaster details</li>
          <li>Visual focus indicators help with navigation</li>
        </ul>
      </div>

      <CoasterComparison
        coaster1={mockCoaster1}
        coaster2={mockCoaster2}
        onChoose1={() => alert('Accessibility test: Steel Vengeance chosen')}
        onChoose2={() => alert('Accessibility test: Fury 325 chosen')}
      />
    </div>
  ),
}

export const MobileView: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  args: {
    coaster1: mockCoaster1,
    coaster2: mockCoaster2,
    onChoose1: () => console.log('Mobile: Chose Steel Vengeance'),
    onChoose2: () => console.log('Mobile: Chose Fury 325'),
  },
}

export const MissingNamesAndFields: Story = {
  args: {
    coaster1: {
      id: '9',
      name: '', // Empty name should show fallback
      park: 'Mystery Park',
      country: 'Unknown Country',
      manufacturer: 'Unknown Manufacturer',
      model: '', // Empty model should not appear
      material: 'Steel',
      thrillLevel: '', // Empty thrill level should not appear
    },
    coaster2: {
      id: '10',
      name: 'Complete Coaster',
      park: 'Complete Park',
      country: 'Complete Country',
      manufacturer: 'Complete Manufacturer',
      model: 'Complete Model',
      material: 'Steel',
      thrillLevel: 'Thrill',
    },
    coaster1Label: undefined, // Should use fallback
    coaster2Label: undefined, // Should use coaster name
    onChoose1: () => console.log('Chose coaster with missing name'),
    onChoose2: () => console.log('Chose complete coaster'),
  },
}

export const CustomLabels: Story = {
  args: {
    coaster1: mockCoaster1,
    coaster2: mockCoaster2,
    coaster1Label: 'Existing Coaster',
    coaster2Label: 'New Coaster',
    onChoose1: () => console.log('Chose existing coaster'),
    onChoose2: () => console.log('Chose new coaster'),
  },
}

export const MinimalData: Story = {
  args: {
    coaster1: {
      id: '11',
      name: '',
      park: 'Minimal Park 1',
      country: 'Country 1',
      manufacturer: 'Manufacturer 1',
      // No model, material, or thrillLevel
    },
    coaster2: {
      id: '12',
      name: '',
      park: 'Minimal Park 2',
      country: 'Country 2',
      manufacturer: 'Manufacturer 2',
      // No model, material, or thrillLevel
    },
    onChoose1: () => console.log('Chose minimal coaster 1'),
    onChoose2: () => console.log('Chose minimal coaster 2'),
  },
}
