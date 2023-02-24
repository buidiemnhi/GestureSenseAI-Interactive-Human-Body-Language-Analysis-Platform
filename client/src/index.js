import './index.css';

import React from 'react';

import { AuthProvider } from 'react-auth-kit';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider authType = {'cookie'}
                  authName={'_auth'}
                  cookieDomain={window.location.hostname}
                  cookieSecure={false}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

