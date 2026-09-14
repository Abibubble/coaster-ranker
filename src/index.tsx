import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import "@fontsource/atkinson-hyperlegible/400.css";
import "@fontsource/atkinson-hyperlegible/400-italic.css";
import "@fontsource/atkinson-hyperlegible/700.css";
import "@fontsource/atkinson-hyperlegible/700-italic.css";
import {
  Accessibility,
  Download,
  Home,
  PrivacyPolicy,
  Rank,
  Upload,
  UploadCSV,
  UploadJSON,
  UploadManual,
  ViewCoasters,
} from "./pages";
import { Footer, Header, SkipLink } from "./components";
import { DataProvider } from "./contexts/DataContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useScrollToTop } from "./hooks";

function RootLayout() {
  useScrollToTop();
  return (
    <>
      <SkipLink />
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "accessibility", element: <Accessibility /> },
        { path: "download", element: <Download /> },
        { path: "privacy-policy", element: <PrivacyPolicy /> },
        { path: "rank", element: <Rank /> },
        { path: "upload", element: <Upload /> },
        { path: "upload-csv", element: <UploadCSV /> },
        { path: "upload-json", element: <UploadJSON /> },
        { path: "upload-manual", element: <UploadManual /> },
        { path: "view-coasters", element: <ViewCoasters /> },
      ],
    },
  ],
  { basename: "/coaster-ranker" },
);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <DataProvider>
        <RouterProvider router={router} />
      </DataProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
