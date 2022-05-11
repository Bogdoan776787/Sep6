import React from "react";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";



// import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

import Amplify from "aws-amplify"
import config from "./aws-exports"

Amplify.configure(config)

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(  <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>);

