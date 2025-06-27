import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import "@shopify/polaris/build/esm/styles.css";
import { AppProvider } from '@shopify/polaris';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppProvider>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
  </AppProvider>
);