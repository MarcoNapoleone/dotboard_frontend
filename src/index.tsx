import React, {Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import reportWebVitals from './reportWebVitals';
import Theme from "./Components/Providers/Theme/Theme";
import Routes from "./Routes/Routes";
import Fallback from "./Components/SuspenseFallback/SuspenseFallback";

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <Theme>
      <Suspense fallback={<Fallback/>}>
          <Routes/>
      </Suspense>
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
