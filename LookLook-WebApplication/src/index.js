import React from 'react';
import ReactDOM from 'react-dom/client';
import Routing from './Routing';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from "./styles/GlobalStyles";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyles />
    <Routing />
  </React.StrictMode>
);


reportWebVitals();
