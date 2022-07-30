'use strict'; // Why is this up here?

// Import Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';

// Import Components and Styles
import App from './components/App.jsx';
import './styles/main.css';

// Render Components to DOM 'app' element
ReactDOM.render(
  <HashRouter>
    <Routes>
      <Route path="*" element={<App />}>
      </Route>
    </Routes>
  </HashRouter>,
  document.getElementById('app')
);
