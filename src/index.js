import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './AuthContext';
import { BrowserRouter as Router } from "react-router-dom"
import App from './App';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Router>
      <App />
    </Router>
  </AuthContextProvider>
);


