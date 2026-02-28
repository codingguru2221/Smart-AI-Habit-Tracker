import React, { useState } from 'react';
import { Plus, Bell, User } from 'lucide-react';
import SearchInput from '../SearchInput';
import { useUser } from '../../contexts/UserContext';
import './Header.css';

const Header = ({ currentPage = 'dashboard' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { currentUser } = useUser();

  const handleAddHabit = () => {
    window.location.hash = '#add-habit';
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <div className="page-title">
          <h1>
            Hello, {currentUser ? (currentUser.name || currentUser.username || 'User') : 'User'}
          </h1>
        </div>
        
        <div className="search-container">
          <SearchInput 
            placeholder="Search habits, analytics..."
            value={searchQuery}
            onChange={handleSearchChange}
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