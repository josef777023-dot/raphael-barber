import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { LanguageProvider } from "./context/LanguageContext";
import { AccessibilityProvider } from "./context/AccessibilityContext";
import { CookieConsentProvider } from "./context/CookieConsentContext";
import { CustomScissorsCursor } from "./components/CustomScissorsCursor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LanguageProvider>
      <AccessibilityProvider>
        <CookieConsentProvider>
          <App />
        </CookieConsentProvider>
      </AccessibilityProvider>
    </LanguageProvider>
    <CustomScissorsCursor />
  </StrictMode>,
);
