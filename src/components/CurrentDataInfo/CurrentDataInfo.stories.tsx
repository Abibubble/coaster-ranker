import type { Meta, StoryObj } from "@storybook/react-vite";
import { BrowserRouter } from "react-router-dom";
import CurrentDataInfo from "./CurrentDataInfo";

const meta: Meta<typeof CurrentDataInfo> = {
  title: "Components/CurrentDataInfo",
  component: CurrentDataInfo,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "CurrentDataInfo displays information about the user's current coaster collection with a link to view all coasters. It provides a clear overview of the collection size and easy navigation to the full list.",
      },
    },
  },
  argTypes: {
    coasterCount: {
      control: { type: "number", min: 0, max: 1000, step: 1 },
      description: "The number of coasters currently in the user's collection",
    },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ padding: "20px", maxWidth: "600px" }}>
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    coasterCount: 0,
  },
};

export const Single: Story = {
  args: {
    coasterCount: 1,
  },
};

export const SmallCollection: Story = {
  args: {
    coasterCount: 5,
  },
};

export const MediumCollection: Story = {
  args: {
    coasterCount: 25,
  },
};

export const LargeCollection: Story = {
  args: {
    coasterCount: 150,
  },
};

export const HugeCollection: Story = {
  args: {
    coasterCount: 500,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        <h3>Empty Collection</h3>
        <CurrentDataInfo coasterCount={0} />
      </div>

      <div>
        <h3>Small Collection</h3>
        <CurrentDataInfo coasterCount={5} />
      </div>

      <div>
        <h3>Medium Collection</h3>
        <CurrentDataInfo coasterCount={25} />
      </div>

      <div>
        <h3>Large Collection</h3>
        <CurrentDataInfo coasterCount={150} />
      </div>
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
    coasterCount: 42,
  },
};
