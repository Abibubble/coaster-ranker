import type { Meta, StoryObj } from '@storybook/react'
import DuplicateResolver from './DuplicateResolver'
import { DuplicateMatch } from '../../utils/fileProcessing/duplicateDetection'
import { Coaster } from '../../types/data'

// Mock coaster data
const existingCoaster: Coaster = {
  id: '1',
  name: 'Steel Vengeance',
  park: 'Cedar Point',
  country: 'United States',
  manufacturer: 'Rocky Mountain Construction',
  model: 'I-Box',
  material: 'Hybrid',
}

const newCoaster: Coaster = {
  id: 'new-1',
  name: 'Steel Vengeance',
  park: 'Cedar Point',
  country: 'USA',
  manufacturer: 'Rocky Mountain Construction',
  model: 'I-Box Track',
  material: 'Hybrid',
}

const createDuplicateMatch = (
  existing: Coaster,
  newCoaster: Coaster,
  matchingFields: string[]
): DuplicateMatch => ({
  existingCoaster: existing,
  newCoaster: newCoaster,
  matchingFields,
  matchCount: matchingFields.length,
})

const meta: Meta<typeof DuplicateResolver> = {
  title: 'Components/DuplicateResolver',
  component: DuplicateResolver,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onResolve: { action: 'resolved' },
    onCancel: { action: 'cancelled' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    duplicates: [
      createDuplicateMatch(existingCoaster, newCoaster, [
        'name',
        'park',
        'manufacturer',
      ]),
    ],
  },
}

export const MultipleDuplicates: Story = {
  args: {
    duplicates: [
      createDuplicateMatch(existingCoaster, newCoaster, [
        'name',
        'park',
        'manufacturer',
      ]),
      createDuplicateMatch(
        { ...existingCoaster, id: '2', name: 'Maverick' },
        { ...newCoaster, id: 'new-2', name: 'Maverick' },
        ['name', 'park', 'manufacturer', 'model']
      ),
    ],
  },
}
