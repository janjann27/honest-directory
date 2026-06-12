import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { ReactLenis } from "lenis/react"

import "./index.css"
import App from "./App.tsx"
import { ThemeProvider } from "@/components/theme-provider.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 }}
    >
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </ReactLenis>
  </StrictMode>
)
