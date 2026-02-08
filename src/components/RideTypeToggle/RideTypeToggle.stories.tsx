import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import RideTypeToggle, { RideTypeToggleProps } from "./RideTypeToggle";
import { RideType } from "../../types/data";

const meta: Meta<typeof RideTypeToggle> = {
  title: "Components/RideTypeToggle",
  component: RideTypeToggle,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A tab-styled toggle component for switching between coaster and dark ride types.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "select" },
      options: ["coaster", "dark-ride"],
      description: "The currently selected ride type",
    },
    name: {
      control: { type: "text" },
      description: "Name attribute for the hidden form input",
    },
    className: {
      control: { type: "text" },
      description: "Additional CSS class name",
    },
    onChange: {
      action: "changed",
      description: "Callback fired when the selected ride type changes",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component for stories
const RideTypeToggleWrapper = (args: RideTypeToggleProps) => {
  const [value, setValue] = useState<RideType>(args.value || "coaster");

  return (
    <RideTypeToggle
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  render: RideTypeToggleWrapper,
  args: {
    value: "coaster",
  },
};

export const CoasterSelected: Story = {
  render: RideTypeToggleWrapper,
  args: {
    value: "coaster",
  },
  parameters: {
    docs: {
      description: {
        story: "RideTypeToggle with 'Roller Coasters' selected.",
      },
    },
  },
};

export const DarkRideSelected: Story = {
  render: RideTypeToggleWrapper,
  args: {
    value: "dark-ride",
  },
  parameters: {
    docs: {
      description: {
        story: "RideTypeToggle with 'Dark Rides' selected.",
      },
    },
  },
};

export const CustomName: Story = {
  render: RideTypeToggleWrapper,
  args: {
    value: "coaster",
    name: "custom-ride-type",
  },
  parameters: {
    docs: {
      description: {
        story: "RideTypeToggle with custom name attribute for form submission.",
      },
    },
  },
};

export const WithCustomClass: Story = {
  render: RideTypeToggleWrapper,
  args: {
    value: "dark-ride",
    className: "custom-toggle-class",
  },
  parameters: {
    docs: {
      description: {
        story: "RideTypeToggle with additional CSS class applied.",
      },
    },
  },
};

// Static stories for visual testing
export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
          Coaster Selected
        </h3>
        <RideTypeToggle value="coaster" onChange={() => {}} />
      </div>
      <div>
        <h3 style={{ marginBottom: "1rem", textAlign: "center" }}>
          Dark Ride Selected
        </h3>
        <RideTypeToggle value="dark-ride" onChange={() => {}} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Visual comparison of both selection states.",
      },
    },
  },
};
