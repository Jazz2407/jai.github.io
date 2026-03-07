import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // This works if App.tsx and main.tsx are in the same folder
import './styles/index.css'; // Adjust if your CSS is in a different folder

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);