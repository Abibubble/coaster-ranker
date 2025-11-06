# Storybook Documentation

## Overview

This project now includes Storybook for developing and documenting UI components in isolation. Storybook provides an interactive environment where you can:

- View components with different props and states
- Test component behavior
- Document component APIs
- Perform accessibility testing
- Run component tests

## Getting Started

### Running Storybook

To start the Storybook development server:

```bash
npm run storybook
```

This will start Storybook on `http://localhost:6006`

### Building Storybook

To build a static version of Storybook for deployment:

```bash
npm run build-storybook
```

## Project Structure

```
.storybook/
├── main.ts          # Storybook configuration
├── preview.ts       # Global settings and decorators
└── vitest.setup.ts  # Vitest integration setup

src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.styled.ts
│   │   └── Button.stories.tsx  # Button component stories
│   └── Link/
│       ├── Link.tsx
│       ├── Link.styled.ts
│       └── Link.stories.tsx    # Link component stories
└── stories/         # Example stories from Storybook init
```

## Components with Stories

### Currently Available Stories

All major components now have comprehensive Storybook stories:

#### ✅ Core UI Components

- `Button` - All variants, states, and use cases
- `Text` - Typography, colors, spacing, semantic elements
- `Title` - Page titles with various content
- `Link` - Different link styles and variants
- `InfoMessage` - Error, success, info messages with a11y
- `CodeBlock` - Code examples in multiple languages

#### ✅ Layout & Navigation

- `Header` - Responsive navigation with mobile menu
- `Footer` - Footer in various layout contexts
- `MainContent` - Semantic main content with skip links
- `SkipLink` - Accessibility navigation

#### ✅ Accessibility

- `ScreenReaderOnly` - Hidden content for assistive tech

#### ✅ Ranking & Interaction

- `CoasterComparison` - Interactive comparison cards
- `ProgressInfo` - Progress tracking and indicators
- `RankingControls` - Undo/reset functionality
- `PreRankingQuestion` - Initial setup questions before ranking
- `RankingComplete` - Final results display with editing options
- `SimpleCoasterRanking` - Individual coaster ranking system
- `GroupRanking` - Hierarchical ranking by park or model
- `DuplicateResolver` - Duplicate coaster detection and resolution

### All Components Now Have Stories! 🎉

Every component in the project now has comprehensive Storybook stories with multiple variants, accessibility testing, and interactive examples.

## Writing Stories

### Basic Story Structure

Stories are written in `.stories.tsx` files and follow this pattern:

```tsx
import type { Meta, StoryObj } from '@storybook/react'
import YourComponent from './YourComponent'

const meta: Meta<typeof YourComponent> = {
  title: 'Components/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // Define controls for props
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    // Default props
  },
}
```

### Creating Stories for New Components

1. Create a new `.stories.tsx` file next to your component
2. Import your component and Storybook types
3. Define the meta configuration
4. Export different story variations

### Example Stories Included

#### Core UI Components

- **Button Stories**: Showcases all button variants (default, destructive, success, secondary, disabled), as link, and with different content lengths
- **Text Stories**: Demonstrates all typography options, colors, spacing, and semantic elements (spans, labels, headings)
- **Title Stories**: Shows title component with various lengths and special characters
- **Link Stories**: Demonstrates different link styles and configurations
- **InfoMessage Stories**: Shows error, success, and info message variants with accessibility features
- **CodeBlock Stories**: Examples with JavaScript, JSON, CSS, HTML, and command-line code

#### Layout & Navigation Components

- **Header Stories**: Full responsive navigation with mobile menu, accessibility testing, and context examples
- **Footer Stories**: Footer in various layout contexts (sticky, with long content, mobile)
- **MainContent Stories**: Semantic main content container with skip link integration and complex content examples
- **SkipLink Stories**: Accessibility-focused skip navigation with realistic page context

#### Accessibility Components

- **ScreenReaderOnly Stories**: Demonstrates hidden content for assistive technologies with practical use cases (form instructions, navigation help)

#### Ranking & Interaction Components

- **CoasterComparison Stories**: Interactive coaster comparison cards with various coaster types, countries, and manufacturers
- **ProgressInfo Stories**: Progress tracking with different modes (comparisons vs coaster counting), various completion states
- **RankingControls Stories**: Undo/reset functionality with different interaction states and accessibility demos
- **PreRankingQuestion Stories**: Initial setup questions with first-time and existing user scenarios, validation states
- **RankingComplete Stories**: Final results display with editing capabilities, export options, and accessibility features
- **SimpleCoasterRanking Stories**: Individual coaster ranking system with round-robin comparisons, progress tracking
- **GroupRanking Stories**: Hierarchical ranking by park or model with complex group scenarios, fallback handling
- **DuplicateResolver Stories**: Duplicate detection and resolution with various matching scenarios and resolution workflows

Each story includes:

- **Multiple variants** demonstrating different use cases
- **Interactive examples** where applicable
- **Accessibility demonstrations** showing keyboard navigation and screen reader support
- **Responsive design** examples for mobile and tablet views
- **Real-world context** showing components in typical page layouts

## Features Enabled

### Accessibility Testing

- **Addon**: `@storybook/addon-a11y`
- Automatically checks components for accessibility violations
- View results in the "Accessibility" panel

### Documentation

- **Addon**: `@storybook/addon-docs`
- Automatically generates documentation from your component props
- Supports MDX for custom documentation

### Testing Integration

- **Addon**: `@storybook/addon-vitest`
- Integrates with your existing Vitest setup
- Run component tests directly in Storybook

## Theme Integration

The project's theme system is integrated with Storybook, so components will render with your actual design tokens:

- Colors from `src/theme/colours.json`
- Spacing from `src/theme/spacing.json`
- Typography from `src/theme/font.json`
- Shadows from `src/theme/shadows.json`

## Adding New Components to Storybook

1. **Create the story file**:

   ```tsx
   // src/components/YourComponent/YourComponent.stories.tsx
   import type { Meta, StoryObj } from '@storybook/react'
   import YourComponent from './YourComponent'

   const meta: Meta<typeof YourComponent> = {
     title: 'Components/YourComponent',
     component: YourComponent,
     // ... configuration
   }

   export default meta
   ```

2. **Define story variants**:

   ```tsx
   export const Default: Story = {
     args: {
       /* props */
     },
   }

   export const WithDifferentProps: Story = {
     args: {
       /* different props */
     },
   }
   ```

3. **Add complex examples**:
   ```tsx
   export const AllVariants: Story = {
     render: () => (
       <div>
         <YourComponent variant='a' />
         <YourComponent variant='b' />
       </div>
     ),
   }
   ```

## Best Practices

1. **Use meaningful story names** that describe the use case
2. **Include all important variants** of your component
3. **Add argTypes** for interactive controls in the Storybook UI
4. **Use the `render` function** for complex story layouts
5. **Tag stories with `autodocs`** for automatic documentation generation
6. **Test accessibility** using the a11y addon
7. **Document edge cases** and error states

## Useful Commands

- `npm run storybook` - Start development server
- `npm run build-storybook` - Build static Storybook
- `npx vitest --project=storybook` - Run Storybook tests with Vitest

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Writing Stories](https://storybook.js.org/docs/react/writing-stories/introduction)
- [Storybook Addons](https://storybook.js.org/addons)
