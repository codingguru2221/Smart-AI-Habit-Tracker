import React from 'react';
import DashboardPage from './pages/DashboardPage';
import './App.css';
import './additional-styles.css';

// Debug CSS loading
console.log('App.jsx loaded');
console.log('App.css imported');

function App() {
  return (
    <div className="App">
      <DashboardPage />
    </div>
  );
}

export default App;