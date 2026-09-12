/// <reference types="vitest/config" />
/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon/favicon.ico",
        "favicon/apple-touch-icon.png",
        "favicon/favicon-16x16.png",
        "favicon/favicon-32x32.png",
      ],
      manifest: {
        name: "Coaster Ranker",
        short_name: "Coaster Ranker",
        description: "An easy way to rank your coasters",
        start_url: "/coaster-ranker/",
        scope: "/coaster-ranker/",
        theme_color: "#1a1523",
        background_color: "#fefefe",
        display: "standalone",
        icons: [
          {
            src: "favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        // Precache the app shell plus the reference data JSON the
        // autocomplete hooks fetch at runtime, so the whole app - not just
        // the pages someone happened to already visit - works offline
        // after the first successful load.
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff,woff2}"],
      },
    }),
  ],
  base: "/coaster-ranker/",
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: "build",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
    projects: [
      // Unit tests project
      {
        test: {
          name: "unit",
          globals: true,
          environment: "jsdom",
          setupFiles: ["./src/setupTests.ts"],
          include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
          exclude: [
            "src/**/*.stories.{js,ts,jsx,tsx}",
            "src/**/*.story.{js,ts,jsx,tsx}",
          ],
        },
      },
      // Storybook tests project
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
