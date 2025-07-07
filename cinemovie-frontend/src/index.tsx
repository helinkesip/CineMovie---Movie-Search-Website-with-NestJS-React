import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { AuthProvider } from './AuthContext';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For movie search
export const imdbApi = axios.create({
  baseURL: 'https://rest.imdbapi.dev/v2',
  timeout: 5000,
});

// For auth
export const authApi = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />  {/* Temaya göre varsayılan CSS reset */}
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
      <ToastContainer aria-label="toast" />
    </ThemeProvider>
  </React.StrictMode>
);
