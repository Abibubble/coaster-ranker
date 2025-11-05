import type { Meta, StoryObj } from '@storybook/react'
import CodeBlock from './CodeBlock'

const meta: Meta<typeof CodeBlock> = {
  title: 'Components/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'console.log("Hello, World!");',
  },
}

export const MultiLine: Story = {
  args: {
    children: `function rankCoasters(coasters) {
  return coasters.sort((a, b) => {
    return b.rating - a.rating;
  });
}`,
  },
}

export const JSONExample: Story = {
  args: {
    children: `{
  "coasters": [
    {
      "id": 1,
      "name": "Steel Vengeance",
      "park": "Cedar Point",
      "rating": 9.5
    },
    {
      "id": 2,
      "name": "Lightning Rod",
      "park": "Dollywood",
      "rating": 9.2
    }
  ]
}`,
  },
}

export const HTMLExample: Story = {
  args: {
    children: `<div className="coaster-card">
  <h3>Steel Vengeance</h3>
  <p>Cedar Point</p>
  <span className="rating">9.5/10</span>
</div>`,
  },
}

export const CSSExample: Story = {
  args: {
    children: `.coaster-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin: 8px 0;
}

.rating {
  font-weight: bold;
  color: #007acc;
}`,
  },
}

export const CommandLineExample: Story = {
  args: {
    children: `npm install @storybook/react
npm run storybook
# Storybook will start on http://localhost:6006`,
  },
}

export const WithCustomClass: Story = {
  args: {
    children: 'const customCode = "This code block has a custom class";',
    className: 'custom-code-style',
  },
}

export const LongCode: Story = {
  args: {
    children: `// Complex coaster ranking algorithm
function calculateCoasterRating(coaster) {
  const factors = {
    speed: coaster.maxSpeed * 0.3,
    height: coaster.height * 0.25,
    inversions: coaster.inversions * 0.2,
    duration: coaster.duration * 0.15,
    smoothness: coaster.smoothness * 0.1
  };

  return Object.values(factors).reduce((sum, value) => sum + value, 0);
}

// Usage example
const steelVengeance = {
  name: "Steel Vengeance",
  maxSpeed: 74,
  height: 205,
  inversions: 4,
  duration: 2.5,
  smoothness: 8.5
};

const rating = calculateCoasterRating(steelVengeance);
console.log(\`\${steelVengeance.name} rating: \${rating.toFixed(1)}\`);`,
  },
}

export const AllExamples: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '600px',
      }}
    >
      <div>
        <h3>JavaScript</h3>
        <CodeBlock>
          {`const coasters = ['Steel Vengeance', 'Lightning Rod', 'Fury 325'];
console.log(coasters);`}
        </CodeBlock>
      </div>

      <div>
        <h3>JSON Data</h3>
        <CodeBlock>
          {`{
  "name": "Steel Vengeance",
  "park": "Cedar Point",
  "type": "Hybrid"
}`}
        </CodeBlock>
      </div>

      <div>
        <h3>CSS Styling</h3>
        <CodeBlock>
          {`.coaster-list {
  display: grid;
  gap: 1rem;
}`}
        </CodeBlock>
      </div>

      <div>
        <h3>Command Line</h3>
        <CodeBlock>npm run build && npm run deploy</CodeBlock>
      </div>
    </div>
  ),
}
