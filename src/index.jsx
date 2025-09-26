import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Import KendoReact theme first
import "@progress/kendo-theme-default/dist/all.css";
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
