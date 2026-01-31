import type { Meta, StoryObj } from "@storybook/react-vite";
import SimpleCoasterRanking from "./SimpleCoasterRanking";
import { Coaster } from "../../types/data";
import { basicCoasters } from "../../mocks";

const meta: Meta<typeof SimpleCoasterRanking> = {
  title: "Components/SimpleCoasterRanking",
  component: SimpleCoasterRanking,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onComplete: { action: "ranking completed" },
    hideProgress: {
      control: { type: "boolean" },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: "400px", width: "100%", maxWidth: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    coasters: basicCoasters,
    onComplete: (ranked: Coaster[]) =>
      console.log(
        "Ranking complete:",
        ranked.map((c) => c.name),
      ),
    hideProgress: false,
  },
};

export const WithoutProgress: Story = {
  args: {
    coasters: basicCoasters.slice(0, 3),
    onComplete: (ranked: Coaster[]) =>
      console.log(
        "Ranking complete:",
        ranked.map((c) => c.name),
      ),
    hideProgress: true,
  },
};
