import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { persistor } from "./redux/store";
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <Provider store={store}>
            <PersistGate persistor={persistor}>
                  <App />
            </PersistGate>
      </Provider>
);