
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import { store } from './app/store';

import { ToastContainer } from 'react-toastify';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </Provider>
  </React.StrictMode>
);
