import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { Provider } from 'react-redux';

import App from './App';
import './index.css';
import { CartContextProvider } from './Contexts/CartContext';
import { store } from './Store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
            <CartContextProvider>
              <App />
            </CartContextProvider>
      </BrowserRouter>
    </Provider>
    <Analytics />
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

