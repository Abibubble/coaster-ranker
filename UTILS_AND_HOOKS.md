# Utilities and Hooks Documentation

This document provides an overview of all utility functions and custom hooks in the Coaster Ranker application.

## Hooks (`src/hooks/`)

### useScrollToTop

**Location:** `src/hooks/useScrollToTop/`
**Function:** Custom hook that automatically scrolls to the top of the page when the component mounts or when specified dependencies change. Useful for navigation between pages.

### useSimpleRanking

**Location:** `src/hooks/useSimpleRanking/`
**Function:** Main ranking hook that provides an interface to the RankingEngine. Handles binary search insertion ranking with support for incremental ranking when new coasters are added to existing rankings. Returns comparison state, winner recording function, completion status, and progress tracking.

## Utilities (`src/utils/`)

### Data Export (`src/utils/dataExport/`)

#### cleanCoasterData

**Function:** Removes obsolete fields from coaster data to ensure clean exports. Excludes privacy-sensitive fields like IDs and maintains data consistency by removing legacy fields.

#### hasRankingDataForExport

**Function:** Checks if uploaded data contains ranking information suitable for export by verifying coaster rank positions and ranking metadata completion status.

#### addRankingToCoasterData

**Function:** Adds ranking information to coaster data for export, converting internal rankPosition to user-friendly rank fields. Falls back to ranking metadata when individual positions aren't available.

### Duplicate Detection (`src/utils/duplicateIdDetection.ts`)

#### detectAndFixDuplicateIds

**Function:** Scans coaster data for duplicate IDs and automatically fixes them by appending suffixes. Prevents ranking comparison errors that could occur with duplicate identifiers.

### File Processing (`src/utils/fileProcessing/`)

#### combineCoasterData

**Function:** Merges new coaster data with existing data, handling pre-ranking flags, metadata updates, and filename combination. Manages incremental data uploads and preserves existing ranking state.

#### parseCSVFile

**Function:** Parses CSV files containing coaster data, with robust error handling and field mapping. Supports various CSV formats and provides detailed parsing feedback.

#### parseJSONFile

**Function:** Parses JSON files containing coaster data with validation and error handling. Ensures data integrity and proper format compliance.

#### validateCoasterData

**Function:** Validates coaster data structure and required fields. Ensures data meets application requirements before processing.

### String Formatting (`src/utils/formatString.ts`)

#### formatString

**Function:** General-purpose string formatting utility for consistent text display throughout the application.

### Ranking (`src/utils/ranking/`)

#### newRankingEngine (RankingEngine class)

**Function:** Core ranking algorithm implementation using binary search insertion. Supports incremental ranking where new coasters are added to existing rankings without re-ranking everything. Manages state, comparisons, and coaster placement.

#### simpleRanking

**Function:** Alternative ranking implementation using round-robin comparison system. Provides binary search insertion utilities and comparison state management for simpler ranking scenarios.

### Ranking Initialization (`src/utils/rankingInitialization/`)

#### individualRanking

**Function:** Initializes individual coaster ranking with comparison strategy selection and state preparation. Handles both fresh rankings and incremental additions.

#### comparisonStrategy

**Function:** Determines optimal comparison strategies for ranking coasters efficiently. Selects between different algorithms based on data size and existing state.

#### rankingState

**Function:** Manages ranking state calculations, completion detection, and progress tracking. Provides utilities for determining when rankings are complete.

### Testing (`src/utils/testing/`)

#### setupTests

**Function:** Test environment configuration and setup utilities for consistent testing across the application.

### Upload State Management (`src/utils/uploadState/`)

#### useUploadState

**Function:** Custom hook managing file upload workflow state, including validation, processing, and error handling.

#### processUploadResult

**Function:** Processes file upload results and determines appropriate workflow paths (pre-ranking decisions, duplicate resolution, or direct completion).

#### handlePreRanking

**Function:** Manages pre-ranking workflow when users upload data that should maintain existing order.

#### handleDuplicates

**Function:** Handles duplicate coaster detection and resolution workflow, providing user interface for managing conflicts.

## Key Features

### Incremental Ranking

The ranking system supports adding new coasters to existing rankings without starting over. The system automatically detects which coasters already have rank positions and only requires comparisons for new additions.

### Binary Search Insertion

New coasters are placed using binary search algorithm, minimizing the number of comparisons needed while maintaining ranking accuracy.

### Data Integrity

Multiple utilities ensure data consistency, duplicate prevention, and proper validation throughout the upload and ranking process.

### Export Capabilities

Clean data export functions provide user-friendly ranking data while maintaining privacy and removing unnecessary technical fields.

### State Management

Comprehensive state management for complex workflows including file uploads, duplicate resolution, and ranking processes.
