import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["default", "destructive", "success", "disabled", "warning"],
    },
    as: {
      control: { type: "select" },
      options: ["button", "a", "link"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};

export const Destructive: Story = {
  args: {
    children: "Delete",
    variant: "destructive",
  },
};

export const Success: Story = {
  args: {
    children: "Save",
    variant: "success",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    variant: "disabled",
  },
};

export const Warning: Story = {
  args: {
    children: "Undo",
    variant: "warning",
  },
};

export const AsLink: Story = {
  args: {
    children: "Visit Page",
    as: "link",
    to: "/test",
    variant: "default",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="success">Success</Button>
      <Button variant="disabled">Disabled</Button>
      <Button variant="warning">Warning</Button>
    </div>
  ),
};

export const WithDifferentContent: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <Button>Short</Button>
      <Button>Medium length button</Button>
      <Button>
        This is a much longer button text that shows how the button handles
        wrapping
      </Button>
    </div>
  ),
};
