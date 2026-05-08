/*
  index.js — JavaScript Entry Point
  ==================================
  This is the FIRST JavaScript file that runs in the browser.
  Its only job: find the <div id="root"> in index.html and
  hand it to React so React can render the <App /> component inside it.

  Think of it as: "HTML provides an empty container → index.js fills it."
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';          // Our top-level component
import './styles/global.css';     // Global styles applied to the whole app
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS for styling
// ReactDOM.createRoot() tells React which DOM node to control.
// After this line, React "owns" the #root div.
const root = ReactDOM.createRoot(document.getElementById('root'));

// .render() draws the <App /> component into that #root div.
root.render(
  <React.StrictMode>
    {/*
      StrictMode is a development helper.
      It runs component code twice in dev mode to catch bugs early.
      It has NO effect in production builds.
    */}
    <App />
  </React.StrictMode>
);
