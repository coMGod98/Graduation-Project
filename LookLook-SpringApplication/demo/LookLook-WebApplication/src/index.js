import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from "./styles/GlobalStyles";

import { Provider } from "react-redux";
import store from "./store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <>
    <GlobalStyles />
      <Provider store={store}>
          <App />
      </Provider>
  </>
  //</React.StrictMode>
);


reportWebVitals();
