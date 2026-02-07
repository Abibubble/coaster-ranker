import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { SortModal, SortField, SortDirection } from "./SortModal";
import { Button } from "../Button";

const meta: Meta<typeof SortModal> = {
  title: "Components/SortModal",
  component: SortModal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A specialized modal for sorting coaster collections. Provides dynamic sort options based on available data fields and current ranking status.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "Controls whether the sort modal is visible",
    },
    hasRanking: {
      control: "boolean",
      description: "Whether to show ranking-based sort options",
    },

    currentSort: {
      control: "object",
      description: "Currently active sort configuration",
    },
    onSort: {
      action: "sorted",
      description: "Callback when a sort option is selected",
    },
    onClose: {
      action: "closed",
      description: "Callback when modal is closed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof SortModal>;

// Wrapper component for interactive stories
const SortModalWrapper = ({
  hasRanking = false,
  ...props
}: Partial<React.ComponentProps<typeof SortModal>>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<{
    field: SortField;
    direction: SortDirection;
  } | null>(null);

  const handleSort = (field: SortField, direction: SortDirection) => {
    setCurrentSort({ field, direction });
    setIsOpen(false);
    props.onSort?.(field, direction);
  };

  const handleClearSort = () => {
    setCurrentSort(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setIsOpen(true)}>
          Sort Coasters
          {currentSort && (
            <span
              style={{
                marginLeft: "8px",
                padding: "2px 6px",
                backgroundColor: "#e0f2fe",
                borderRadius: "3px",
                fontSize: "12px",
              }}
            >
              {currentSort.field === "rankPosition"
                ? `Ranking (${currentSort.direction === "asc" ? "Best→Worst" : "Worst→Best"})`
                : `${currentSort.field} (${currentSort.direction === "asc" ? "A-Z" : "Z-A"})`}
            </span>
          )}
        </Button>
        {currentSort && (
          <Button variant="default" onClick={handleClearSort}>
            Clear Sort
          </Button>
        )}
      </div>

      {currentSort && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          <strong>Current Sort:</strong> {currentSort.field} (
          {currentSort.direction === "asc" ? "ascending" : "descending"})
        </div>
      )}

      <SortModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSort={handleSort}
        currentSort={currentSort}
        hasRanking={hasRanking}
        {...props}
      />
    </div>
  );
};

export const BasicSorting: Story = {
  render: () => <SortModalWrapper hasRanking={false} />,
  parameters: {
    docs: {
      description: {
        story: "Basic sorting modal with ride name options only.",
      },
    },
  },
};

export const WithRanking: Story = {
  render: () => <SortModalWrapper hasRanking={true} />,
  parameters: {
    docs: {
      description: {
        story:
          "Complete sort modal with ranking options enabled for a fully-ranked coaster collection.",
      },
    },
  },
};

const WithCurrentSortStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<{
    field: SortField;
    direction: SortDirection;
  }>({
    field: "name",
    direction: "asc",
  });

  const handleSort = (field: SortField, direction: SortDirection) => {
    setCurrentSort({ field, direction });
    setIsOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "16px" }}>
        <p>
          This story demonstrates the modal with a pre-selected sort option.
        </p>
        <p>
          <strong>Current sort:</strong> {currentSort.field} (
          {currentSort.direction})
        </p>
      </div>

      <Button onClick={() => setIsOpen(true)}>Open Sort Modal</Button>

      <SortModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSort={handleSort}
        currentSort={currentSort}
        hasRanking={true}
      />
    </div>
  );
};

export const WithCurrentSort: Story = {
  render: WithCurrentSortStory,
  parameters: {
    docs: {
      description: {
        story:
          "Sort modal showing how the current sort state is visually indicated with highlighting and check icons.",
      },
    },
  },
};

export const MinimalConfiguration: Story = {
  render: () => <SortModalWrapper hasRanking={false} />,
  parameters: {
    docs: {
      description: {
        story: "Basic configuration showing only ride name sorting options.",
      },
    },
  },
};

export const RankingSort: Story = {
  render: () => <SortModalWrapper hasRanking={true} />,
  parameters: {
    docs: {
      description: {
        story:
          "Sort modal with ride name and ranking options for a ranked collection.",
      },
    },
  },
};

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    hasRanking: true,
    currentSort: { field: "rankPosition", direction: "asc" },
  },
  parameters: {
    docs: {
      description: {
        story:
          "Always-open view for design inspection. Shows the modal with ranking sort selected.",
      },
    },
  },
};

const InteractiveDemoComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSort, setCurrentSort] = useState<{
    field: SortField;
    direction: SortDirection;
  } | null>(null);
  const [hasRanking, setHasRanking] = useState(true);

  const handleSort = (field: SortField, direction: SortDirection) => {
    setCurrentSort({ field, direction });
    setIsOpen(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "16px" }}>Configuration</h3>
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input
            type="checkbox"
            checked={hasRanking}
            onChange={(e) => setHasRanking(e.target.checked)}
          />
          Show ranking options
        </label>
      </div>

      <div
        style={{
          marginBottom: "16px",
          display: "flex",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <Button onClick={() => setIsOpen(true)}>Sort Coasters</Button>
        {currentSort && (
          <Button variant="default" onClick={() => setCurrentSort(null)}>
            Clear Sort
          </Button>
        )}
      </div>

      {currentSort && (
        <div
          style={{
            padding: "12px",
            backgroundColor: "#f0f9ff",
            border: "1px solid #0ea5e9",
            borderRadius: "4px",
            marginBottom: "16px",
          }}
        >
          <strong>Active Sort:</strong> {currentSort.field} -{" "}
          {currentSort.direction === "asc" ? "ascending" : "descending"}
        </div>
      )}

      <SortModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSort={handleSort}
        currentSort={currentSort}
        hasRanking={hasRanking}
      />
    </div>
  );
};

export const InteractiveDemo: Story = {
  render: () => <InteractiveDemoComponent />,
  parameters: {
    docs: {
      description: {
        story:
          "Interactive demo allowing you to toggle ranking options and see how the sort modal adapts.",
      },
    },
  },
};
