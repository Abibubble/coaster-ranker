import { Coaster } from '../../types/data'
import {
  addRankingToCoasterData,
  cleanCoasterData,
} from '../dataExport/cleanCoasterData'

// Test data example showing how the ranking export works
const testCoasters: Coaster[] = [
  {
    id: '001',
    name: 'Nemesis Reborn',
    park: 'Alton Towers',
    country: 'United Kingdom',
    manufacturer: 'B&M',
    model: 'Inverted Coaster',
    type: 'Steel',
    rankPosition: 2, // 2nd place
  },
  {
    id: '003',
    name: 'Runaway Mine Train',
    park: 'Alton Towers',
    country: 'United Kingdom',
    manufacturer: 'Mack Rides',
    model: 'Powered Coaster',
    type: 'Steel',
    rankPosition: 1, // 1st place (best)
  },
  {
    id: '008',
    name: 'Wicker Man',
    park: 'Alton Towers',
    country: 'United Kingdom',
    manufacturer: 'Great Coasters International',
    model: 'Wooden Coaster',
    type: 'Wooden',
    rankPosition: 3, // 3rd place
  },
]

// Example usage:
// const coastersWithRank = addRankingToCoasterData(testCoasters)
// Result will be:
// [
//   { id: '001', name: 'Nemesis Reborn', ..., rank: 2 },
//   { id: '003', name: 'Runaway Mine Train', ..., rank: 1 },
//   { id: '008', name: 'Wicker Man', ..., rank: 3 }
// ]

// The 'rank' field shows the actual ranking position (1 = best)
// The 'rankPosition' internal field is converted to the user-friendly 'rank' field

export { testCoasters, addRankingToCoasterData, cleanCoasterData }
