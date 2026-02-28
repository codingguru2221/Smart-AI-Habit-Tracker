import React, { useState, useEffect } from 'react';
import { Search, Plus, Bell, User } from 'lucide-react';
import './Header.css';

const Header = ({ currentPage = 'dashboard' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageTitle, setPageTitle] = useState('Dashboard');

  useEffect(() => {
    // Map current page to display title
    const titleMap = {
      'dashboard': 'Dashboard',
      'analytics': 'Analytics',
      'habits': 'Habits',
      'add-habit': 'Add Habit'
    };
    
    setPageTitle(titleMap[currentPage.toLowerCase()] || 'Dashboard');
  }, [currentPage]);

  const handleAddHabit = () => {
    // Navigate directly to add habit page
    window.location.hash = '#add-habit';
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="page-title">
          <h1>{pageTitle}</h1>
        </div>
        
        <div className="search-container">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search habits, analytics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="header-actions">
          <button 
            className="action-button add-habit-btn"
            onClick={handleAddHabit}
            title="Add new habit"
          >
            <Plus size={20} />
          </button>
          
          <button className="action-button notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          
          <button className="action-button profile-btn">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;