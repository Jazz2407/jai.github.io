import React from 'react';
import ReactDOM from 'react-dom/client';

 // Adjust if your CSS is in a different folder
import App from "./app/App";
import "./app/styles/index.css";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);