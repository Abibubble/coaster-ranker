# Ranking Initialization Utilities

This folder contains utilities for initializing and configuring the ranking system for coasters. These utilities were extracted from the main `Rank.tsx` component to improve modularity and reusability.

## Structure

### `individualRanking.ts`

**Purpose**: Main entry point for individual ranking initialization
**Exports**:

- `initializeIndividualRanking()`: Primary function that orchestrates the ranking setup process
- `IndividualRankingParams`: TypeScript interface for input parameters
- `IndividualRankingResult`: TypeScript interface for the return value

**Usage**:

```typescript
const result = initializeIndividualRanking({
  uploadedData,
  comparisonResults,
})
```

### `comparisonStrategy.ts`

**Purpose**: Handles the selection of optimal comparison generation strategies
**Exports**:

- `determineComparisonStrategy()`: Analyzes coaster state to choose strategy
- `generateComparisonsByStrategy()`: Generates comparisons based on selected strategy
- `getOptimalComparisons()`: Combined strategy selection and comparison generation
- `ComparisonStrategy`: TypeScript interface for strategy information
- `ComparisonStrategyParams`: TypeScript interface for strategy parameters

**Strategies**:

- **Full**: Used when all coasters are new and no ranking exists
- **Positional**: Used for sequential insertion of new coasters into existing rankings

### `rankingState.ts`

**Purpose**: Utilities for initializing and managing ranking component state
**Exports**:

- `initializeRankingState()`: Prepares state updates for ranking component
- `calculateTotalComparisons()`: Computes total possible comparisons
- `isRankingCompleteCheck()`: Determines if ranking process is complete
- `getRankingCompletionData()`: Gets completion status and ranked coasters
- `RankingStateUpdate`: TypeScript interface for state update values
- `RankingStateParams`: TypeScript interface for state parameters

## Key Features

### 🎯 **Strategy-Based Comparison Generation**

The system automatically selects the optimal comparison strategy:

- Analyzes coaster properties (new vs existing)
- Considers current ranking state
- Logs the selected strategy and reasoning

### 🔧 **Modular State Management**

Separates concerns between:

- Data processing and validation
- Comparison generation
- State preparation for React components

### 📊 **Comprehensive Logging**

- Strategy selection logging
- Ranking initialization details
- Debug information for troubleshooting

### 🛡️ **Type Safety**

Full TypeScript support with:

- Strict interface definitions
- Generic type parameters
- Comprehensive error handling

## Integration with Rank Component

The `Rank.tsx` component now uses these utilities through:

1. **`initializeIndividualRanking()`** - Handles all data processing
2. **`initializeRankingState()`** - Prepares state updates
3. **Strategy logging** - Shows selected comparison approach

## Benefits of Extraction

### ✅ **Improved Testability**

- Pure functions without React dependencies
- Isolated logic for unit testing
- Predictable inputs and outputs

### ✅ **Better Reusability**

- Can be used by other components
- Suitable for different ranking contexts
- Framework-agnostic core logic

### ✅ **Enhanced Maintainability**

- Single responsibility principle
- Clear separation of concerns
- Easier to debug and modify

### ✅ **Consistent Architecture**

- Follows established utility patterns
- Matches other extracted utilities
- Standardized file organization

## Examples

### Basic Individual Ranking Setup

```typescript
import { initializeIndividualRanking } from './utils/rankingInitialization'

const result = initializeIndividualRanking({
  uploadedData: myCoasterData,
  comparisonResults: new Map(),
})

// Use result.comparisons for ranking process
// Apply result.updatedData to context
```

### Custom Strategy Selection

```typescript
import { getOptimalComparisons } from './utils/rankingInitialization'

const { strategy, comparisons } = getOptimalComparisons({
  coasters: myCoasters,
  rankedCoasters: existingRanking,
  completedComparisons: new Set(),
  comparisonResults: new Map(),
})

console.log(`Selected: ${strategy.type} - ${strategy.reason}`)
```

### State Preparation for React

```typescript
import { initializeRankingState } from './utils/rankingInitialization'

const stateUpdate = initializeRankingState({
  comparisons: myComparisons,
  totalPossibleComparisons: 45,
  isRankingComplete: false,
  rankedCoasters: [],
})

// Apply stateUpdate to React state setters
```
