import React, { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import AddHabit from './pages/AddHabit';
import Analytics from './pages/Analytics';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  useEffect(() => {
    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash.replace('/', ''));
      }
    };

    // Set initial page based on hash
    handleHashChange();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'analytics':
        return <Analytics />;
      case 'habits':
      case 'habits/technical':
      case 'habits/non-technical':
      case 'habits/physical':
      case 'habits/non-physical':
        return <Habits />;
      case 'add-habit':
        return <AddHabit />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;