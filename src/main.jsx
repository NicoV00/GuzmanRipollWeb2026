import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { captureTrafficSource } from './utils/trafficSource.js'
import { initAnalytics } from './lib/ga4.js'

captureTrafficSource();
initAnalytics();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
