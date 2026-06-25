import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Telegram WebApp init
if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready();
  console.log(window.Telegram.WebApp.initDataUnsafe?.user?.username);
  console.log(window.Telegram.WebApp.colorScheme);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
