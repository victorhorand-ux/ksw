import React from 'react'
import ReactDOM from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async' // <-- 1. Imported HelmetProvider
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Wrapped App with HelmetProvider */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>,
)