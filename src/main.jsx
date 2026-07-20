import React from 'react'
// 🚀 1. Import both hydrateRoot and createRoot
import { hydrateRoot, createRoot } from 'react-dom/client' 
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import './index.css'
import { errorHandler } from './utils/errorHandler'

// Initialize error handler
if (typeof window !== 'undefined') {
  // Log any initialization errors
  window.addEventListener('error', (event) => {
    errorHandler.logError(
      event.error || new Error(event.message),
      { type: 'initialization', filename: event.filename }
    )
  })
}

const container = document.getElementById('root');

// 🚀 2. Store your app structure in a variable
const appContent = (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// 🚀 3. Smart Rendering Logic for Pre-rendering
if (container.hasChildNodes()) {
  // If react-snap built the static HTML, hydrate it for instant loading
  hydrateRoot(container, appContent);
} else {
  // Otherwise (like during local dev), render it normally from scratch
  const root = createRoot(container);
  root.render(appContent);
}