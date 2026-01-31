import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import RankingComplete from "./RankingComplete";
import { Coaster } from "../../types/data";
import { DataProvider } from "../../contexts/DataContext";
import { rankedCoasters } from "../../mocks";

const extendedRankedCoasters: Coaster[] = [
  ...rankedCoasters,
  {
    id: "5",
    name: "Hyperion",
    park: "Energylandia",
    country: "Poland",
    manufacturer: "Intamin",
    model: "Mega",
    material: "Steel",
    rankPosition: 5,
  },
  {
    id: "6",
    name: "Skyrush",
    park: "Hersheypark",
    country: "United States",
    manufacturer: "Intamin",
    model: "Mega",
    material: "Steel",
    rankPosition: 6,
  },
];

const meta: Meta<typeof RankingComplete> = {
  title: "Components/RankingComplete",
  component: RankingComplete,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onRankAgain: { action: "rank again clicked" },
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <DataProvider>
          <div style={{ minHeight: "400px", width: "100%", maxWidth: "600px" }}>
            <Story />
          </div>
        </DataProvider>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rankedCoasters: extendedRankedCoasters,
    onRankAgain: () => console.log("Rank again clicked"),
  },
};

export const SingleCoaster: Story = {
  args: {
    rankedCoasters: [rankedCoasters[0]],
    onRankAgain: () => console.log("Rank again clicked"),
  },
};
