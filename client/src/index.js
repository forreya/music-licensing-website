import React from 'react';
import ReactDOM from 'react-dom/client';

// Importing custom CSS styles
import './index.css';

import App from './App';

// Importing ThemeProvider, CssBaseline and MUI Theme
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme'

// Importing Redux Provider and store configuration
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './state';
 
// Configures the store, compiles it into one reducer
const store = configureStore({
  reducer: { cart: cartReducer}
})

// Creating a root element to render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* Adds the baseline CSS styles from MUI */}
        <CssBaseline />
        {/* Renders the App component */}
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
