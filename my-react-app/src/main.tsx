import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App' // Correctly points to src/app/App.tsx
import './app/styles/index.css' // Correctly points to src/app/styles/index.css

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)