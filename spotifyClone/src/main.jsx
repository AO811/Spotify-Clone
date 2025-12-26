import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom";
import PlayerContextProvider from "./context/PlayerContext.jsx";
import ThemeContextProvider from "./context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeContextProvider>
        <PlayerContextProvider>
          <App />
        </PlayerContextProvider>
      </ThemeContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);