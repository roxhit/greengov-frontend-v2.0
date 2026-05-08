/*
  App.jsx — Root Component
  ========================
  This is the top-level component that wraps the entire application.
  It sets up client-side routing using react-router-dom.

  ROUTING EXPLAINED:
  - <BrowserRouter> enables URL-based navigation without full page reloads.
  - <Routes> is a container that looks at the current URL.
  - <Route> maps a URL path to a component.
    e.g. When the URL is "/", render <HomePage />.

  You can add more pages by adding more <Route> entries.
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* path="/" means: show HomePage when the user visits the root URL */}
        <Route path="/" element={<HomePage />} />

        {/* To add a new page: <Route path="/about" element={<AboutPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
