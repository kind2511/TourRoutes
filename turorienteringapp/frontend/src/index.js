import React from 'react';
import { createRoot } from 'react-dom/client';  // Change this line
import './index.css';
import { AuthProvider } from './components/AuthContext';
import App from './App';

const container = document.getElementById('root');
const root = createRoot(container);  // Adjust this line
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
