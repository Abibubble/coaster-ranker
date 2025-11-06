# Coaster Ranker

**NOTE**: This project is still in progress. While the core functionality is working, some features may be incomplete or subject to change. Please report any issues you encounter.

[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-green.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

A fully accessible React/TypeScript web application for ranking roller coasters easily

## Table of Contents

- [Features](#features)
- [Data Persistence](#data-persistence)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Accessibility](#accessibility)
  - [Accessibility Features](#accessibility-features)
  - [Testing Accessibility](#testing-accessibility)
  - [Accessibility Scripts](#accessibility-scripts)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Routes](#routes)

## Features

- **Accessibility First**: WCAG 2.1 AA compliant with full keyboard navigation and screen reader support
- **Multiple Upload Methods**: Support for CSV files, JSON data, and manual entry
- **Collection Management**: View and manage your uploaded coaster collection with real-time status display
- **Responsive Design**: Fully optimized for all screen sizes from 320px to desktop with mobile-first approach
- **Component Architecture**: Modular, reusable components for consistent UX across all pages
- **Type Safety**: Full TypeScript implementation for robust development

## Data Persistence

**Your coaster collection is stored locally on your device** using browser localStorage, providing a personal and private experience.

### How It Works

- **Personal Collections**: Each user maintains their own coaster collection on their device
- **No Account Required**: No sign-up, login, or server storage needed
- **Private by Default**: Your data stays on your device and is never shared
- **Persistent Storage**: Your coasters persist across browser sessions and device restarts

### What This Means

- **Your data survives**: Browser restarts, computer restarts, and page refreshes
- **Always available**: Access your collection anytime, even offline
- **Completely private**: No data sharing between users or devices
- **Device-specific**: Collections don't sync between your laptop, phone, etc.
- **Browser data clearing**: Data is removed if you clear your browser's storage

### Perfect for Personal Use

This approach is ideal for coaster enthusiasts who want to:

- Track their personal riding experiences
- Build and rank their own coaster collections
- Maintain private lists without accounts or data sharing

**Note**: If you want to backup your collection or share it with friends, use the Download feature to export your data as CSV or JSON files.

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Styled Components
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Testing**: React Testing Library & Jest
- **Accessibility**: ESLint JSX A11Y, axe-core, Lighthouse
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm
- For accessibility testing: Chrome/Chromium browser (for Lighthouse)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Abibubble/coaster-ranker.git
cd coaster-ranker
```

2. Install dependencies:

```bash
npm install
```

3. (Optional) Install global accessibility testing tools:

```bash
# For comprehensive accessibility testing
npm install -g @axe-core/cli lighthouse
```

### Running the Application

Start the development server:

```bash
npm start
```

The application will open in your browser at `http://localhost:3000`.

## Accessibility

Coaster ranker is built with accessibility as a core principle, ensuring the application is usable by everyone, including users with disabilities.

### Accessibility Features

Our application includes comprehensive accessibility features:

- **Screen Reader Support**: All interactive elements have proper ARIA labels and descriptions
- **Semantic HTML**: Proper heading hierarchy and semantic elements throughout
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Color Contrast**: WCAG 2.1 AA compliant color contrast ratios
- **Focus Management**: Clear focus indicators and logical tab order
- **Responsive Typography**: Proper heading hierarchy maintained across all screen sizes (320px+)
- **Mobile Accessibility**: Touch targets and interactions optimized for mobile devices

### Testing Accessibility

We use multiple tools to ensure accessibility compliance:

#### Quick Daily Checks

```bash
# Check for accessibility issues in your code
npm run lint:a11y

# Fix auto-fixable accessibility issues
npm run lint:fix
```

#### Comprehensive Testing

```bash
# 1. Start the development server
npm start

# 2. In a new terminal, run the full accessibility test suite
./test-a11y.sh
```

This will generate detailed reports:

- `eslint-a11y-report.txt` - Code-level accessibility issues
- `lighthouse-a11y-report.json` - Lighthouse accessibility audit
- `axe-*-report.json` - Page-specific accessibility violations
- `accessibility-test-results.md` - Summary of all test results

#### Manual Testing Checklist

- [ ] Tab through the entire application using only keyboard
- [ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Verify skip link appears when tabbing
- [ ] Check color contrast with browser dev tools
- Test on mobile devices with assistive technologies

### Accessibility Scripts

| Script                         | Purpose                        | When to Use               |
| ------------------------------ | ------------------------------ | ------------------------- |
| `npm run lint:a11y`            | ESLint accessibility checks    | Before every commit       |
| `./test-a11y.sh`               | Complete accessibility audit   | Weekly or before releases |
| `npm run test:a11y:lighthouse` | Lighthouse accessibility score | Performance reviews       |
| `npm run test:a11y:axe`        | axe-core automated testing     | Continuous integration    |

### Accessibility Standards

- **WCAG 2.1 Level AA Compliance**: Meeting international accessibility standards
- **Current Accessibility Score**: 8.5-9/10 (Lighthouse)
- **Screen Reader Compatible**: Tested with VoiceOver and NVDA
- **Keyboard Navigation**: 100% keyboard accessible

### Reporting Accessibility Issues

If you encounter any accessibility barriers while using this application:

1. **Check existing reports**: Review generated accessibility reports
2. **Use the testing tools**: Run `./test-a11y.sh` to identify issues
3. **Manual testing**: Test with keyboard navigation and screen readers
4. **Create an issue**: Document the barrier and steps to reproduce

### Accessibility Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [React Accessibility Guide](https://reactjs.org/docs/accessibility.html)
- [ESLint JSX A11Y Rules](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Card/            # Card component for displaying items
│   ├── Header/          # Navigation header with mobile menu
│   ├── Footer/          # Application footer
│   ├── SkipLink/        # Accessibility skip navigation
│   ├── Text/            # Typography component with theme integration
│   ├── Title/           # Page title component with responsive sizing
│   └── ...
├── pages/               # Page components
│   ├── Home/            # Homepage
│   ├── Upload/          # Upload hub page
│   ├── UploadCSV/       # CSV file upload
│   ├── UploadJSON/      # JSON data upload
│   ├── UploadManual/    # Manual coaster entry form
│   ├── ViewCoasters/    # Collection viewing page
│   ├── Rank/            # Ranking functionality
│   ├── Download/        # Data export
│   └── Accessibility/   # Accessibility information
├── contexts/            # React context providers
│   └── DataContext/     # Global state management
├── theme/               # Design system
│   ├── colours.json     # Color palette and accessibility-compliant colors
│   ├── fonts.json       # Typography scale with responsive sizing
│   ├── spacing.json     # Consistent spacing system
│   └── breakpoints.json # Mobile-first responsive breakpoints
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

## Available Scripts

### Development Scripts

- `npm start` - Start the development server
- `npm run build` - Build the app for production
- `npm test` - Run the test suite
- `npm run types` - Run TypeScript type checking

### Code Quality Scripts

- `npm run lint` - Run ESLint on TypeScript/TSX files
- `npm run lint:fix` - Auto-fix ESLint issues where possible

### Accessibility Scripts

- `npm run lint:a11y` - Run accessibility-focused ESLint checks
- `npm run test:a11y` - Run comprehensive accessibility tests (requires server to be running)
- `npm run test:a11y:lighthouse` - Run Lighthouse accessibility audit
- `npm run test:a11y:axe` - Run axe-core accessibility tests
- `./test-a11y.sh` - Run complete accessibility test suite with reporting

## Routes

- `/` - Homepage with application overview
- `/upload` - Upload hub with three upload methods (CSV, JSON, Manual)
- `/upload-csv` - CSV file upload with format validation
- `/upload-json` - JSON data upload via paste or file
- `/upload-manual` - Manual coaster entry form
- `/view-coasters` - View and manage your coaster collection
- `/rank` - Rank your coasters with manual adjustment capabilities
- `/download` - Download your coaster data in various formats
- `/accessibility` - Accessibility information and compliance details
- `/privacy-policy` - Privacy policy and data handling information

## Future Work

### Ranking Validation Questions

**Feature**: Post-ranking validation through targeted questions about specific coaster comparisons.

**Purpose**: Improve ranking accuracy by validating key algorithmic decisions with the user after the initial ranking is complete.

**Implementation Approach**:

- Identify "critical comparisons" where the algorithm made close decisions
- Present 3-5 validation questions like "Do you really prefer [Coaster A] over [Coaster B]?"
- Allow users to confirm or reverse specific comparisons
- Automatically propagate changes through the ranking to maintain consistency
- Focus on comparisons that could significantly impact the final ranking order

**Benefits**:

- Catches algorithmic decisions that don't match user preferences
- Provides a lighter-weight alternative to full manual adjustment
- Maintains the efficiency of the comparison-based ranking while allowing targeted corrections
- Improves user confidence in the final ranking results

**Technical Considerations**:

- Track comparison confidence scores during ranking process
- Implement ranking propagation logic to handle comparison reversals
- Design accessible question interface with clear before/after preview
- Integrate with existing ranking persistence and data management

This feature would complement the existing manual adjustment capabilities by providing a guided approach to ranking refinement.
