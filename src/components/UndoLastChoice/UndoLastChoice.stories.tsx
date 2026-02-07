import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import UndoLastChoice from "./UndoLastChoice";
import { ComparisonResult } from "../../utils/ranking/newRankingEngine.util";
import { steelVengeance, theVoyage, fury325, hyperion } from "../../mocks";

const meta: Meta<typeof UndoLastChoice> = {
  title: "Components/UndoLastChoice",
  component: UndoLastChoice,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "UndoLastChoice displays the last ranking choice made and provides an undo button. It helps users track their recent decisions and easily correct mistakes during the ranking process.",
      },
    },
  },
  argTypes: {
    lastComparison: {
      control: "object",
      description: "The last comparison result made by the user",
    },
    canUndo: {
      control: "boolean",
      description: "Whether the undo action is available",
    },
    onUndo: {
      action: "undo clicked",
      description: "Function called when the undo button is clicked",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px", maxWidth: "800px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockComparison1: ComparisonResult = {
  comparison: {
    coasterA: steelVengeance,
    coasterB: theVoyage,
  },
  winner: steelVengeance,
  loser: theVoyage,
};

const mockComparison2: ComparisonResult = {
  comparison: {
    coasterA: fury325,
    coasterB: hyperion,
  },
  winner: fury325,
  loser: hyperion,
};

const mockComparison3: ComparisonResult = {
  comparison: {
    coasterA: {
      ...steelVengeance,
      name: "Very Long Coaster Name That Should Test Text Wrapping",
    },
    coasterB: {
      ...theVoyage,
      name: "Another Extremely Long Coaster Name For Testing",
    },
  },
  winner: {
    ...steelVengeance,
    name: "Very Long Coaster Name That Should Test Text Wrapping",
  },
  loser: {
    ...theVoyage,
    name: "Another Extremely Long Coaster Name For Testing",
  },
};

export const Default: Story = {
  args: {
    lastComparison: mockComparison1,
    canUndo: true,
    onUndo: () => console.log("Undo clicked"),
  },
};

export const DifferentCoasters: Story = {
  args: {
    lastComparison: mockComparison2,
    canUndo: true,
    onUndo: () => console.log("Undo clicked"),
  },
};

export const CannotUndo: Story = {
  args: {
    lastComparison: mockComparison1,
    canUndo: false,
    onUndo: () => console.log("Undo clicked"),
  },
};

export const NoLastComparison: Story = {
  args: {
    lastComparison: null,
    canUndo: true,
    onUndo: () => console.log("Undo clicked"),
  },
};

export const LongCoasterNames: Story = {
  args: {
    lastComparison: mockComparison3,
    canUndo: true,
    onUndo: () => console.log("Undo clicked"),
  },
};

const InteractiveDemoComponent = () => {
  const [comparison, setComparison] = useState<ComparisonResult | null>(
    mockComparison1,
  );
  const [canUndo, setCanUndo] = useState(true);
  const [actionCount, setActionCount] = useState(0);

  const handleUndo = () => {
    setActionCount((prev) => prev + 1);

    // Simulate different states
    if (actionCount === 0) {
      setComparison(mockComparison2);
    } else if (actionCount === 1) {
      setComparison(mockComparison3);
    } else if (actionCount === 2) {
      setCanUndo(false);
    } else {
      setComparison(null);
      setCanUndo(false);
    }
  };

  const reset = () => {
    setComparison(mockComparison1);
    setCanUndo(true);
    setActionCount(0);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <h3>Interactive Undo Demo</h3>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Click "Undo last choice" to see different states
        </p>
        <button
          onClick={reset}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            background: "#007acc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Reset Demo
        </button>
      </div>

      <UndoLastChoice
        lastComparison={comparison}
        canUndo={canUndo}
        onUndo={handleUndo}
      />

      <div style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
        Action count: {actionCount}
      </div>
    </div>
  );
};

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
};

export const AccessibilityDemo: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div style={{ maxWidth: "600px" }}>
        <h3>Accessibility Features</h3>
        <ul style={{ fontSize: "14px", color: "#666" }}>
          <li>Uses semantic heading (h3) for the comparison result</li>
          <li>Button has descriptive aria-label and aria-describedby</li>
          <li>Text has aria-live="polite" for screen reader announcements</li>
          <li>Region role provides logical grouping</li>
          <li>Text wraps properly for long coaster names</li>
          <li>Focus indicators are clear and visible</li>
        </ul>
      </div>

      <UndoLastChoice
        lastComparison={mockComparison1}
        canUndo={true}
        onUndo={() => alert("Accessibility test: Undo action performed")}
      />
    </div>
  ),
};

export const ResponsiveDemo: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
  args: {
    lastComparison: mockComparison1,
    canUndo: true,
    onUndo: () => console.log("Mobile: Undo clicked"),
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h4>Normal State</h4>
        <UndoLastChoice
          lastComparison={mockComparison1}
          canUndo={true}
          onUndo={() => console.log("Normal undo")}
        />
      </div>

      <div>
        <h4>Different Coasters</h4>
        <UndoLastChoice
          lastComparison={mockComparison2}
          canUndo={true}
          onUndo={() => console.log("Different coasters undo")}
        />
      </div>

      <div>
        <h4>Long Names</h4>
        <UndoLastChoice
          lastComparison={mockComparison3}
          canUndo={true}
          onUndo={() => console.log("Long names undo")}
        />
      </div>

      <div>
        <h4>Cannot Undo (Hidden)</h4>
        <UndoLastChoice
          lastComparison={mockComparison1}
          canUndo={false}
          onUndo={() => console.log("Cannot undo")}
        />
        <p style={{ fontSize: "12px", color: "#999", fontStyle: "italic" }}>
          Component is hidden when canUndo is false
        </p>
      </div>

      <div>
        <h4>No Last Comparison (Hidden)</h4>
        <UndoLastChoice
          lastComparison={null}
          canUndo={true}
          onUndo={() => console.log("No comparison")}
        />
        <p style={{ fontSize: "12px", color: "#999", fontStyle: "italic" }}>
          Component is hidden when lastComparison is null
        </p>
      </div>
    </div>
  ),
};
