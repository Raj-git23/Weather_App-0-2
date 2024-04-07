import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { WeatherProvider } from './contextApi/weatherContext.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
);
