import React, { useState } from 'react';
import { 
  Home, 
  BarChart3, 
  CheckSquare, 
  Plus, 
  Code, 
  Lightbulb, 
  Dumbbell, 
  Heart 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [expandedHabits, setExpandedHabits] = useState(false);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
      path: '/dashboard'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      path: '/analytics'
    },
    {
      id: 'habits',
      label: 'Habits',
      icon: CheckSquare,
      path: '/habits',
      isParent: true,
      children: [
        {
          id: 'add-habit',
          label: 'Add Habit',
          icon: Plus,
          path: '/add-habit'
        },
        {
          id: 'technical',
          label: 'Technical Habits',
          icon: Code,
          path: '/habits/technical'
        },
        {
          id: 'non-technical',
          label: 'Non-Technical Habits',
          icon: Lightbulb,
          path: '/habits/non-technical'
        },
        {
          id: 'physical',
          label: 'Physical Habits',
          icon: Dumbbell,
          path: '/habits/physical'
        },
        {
          id: 'non-physical',
          label: 'Non-Physical Habits',
          icon: Heart,
          path: '/habits/non-physical'
        }
      ]
    }
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.id);
    
    if (item.isParent) {
      setExpandedHabits(!expandedHabits);
    }
    
    // Navigate to the path
    if (item.path) {
      window.location.hash = item.path;
    }
  };

  const renderMenuItem = (item) => {
    const IconComponent = item.icon;
    const isActive = activeItem === item.id;
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="menu-item-wrapper">
        <button
          className={`menu-item ${isActive ? 'active' : ''} ${hasChildren ? 'has-children' : ''}`}
          onClick={() => handleItemClick(item)}
        >
          <IconComponent size={20} className="menu-icon" />
          <span className="menu-label">{item.label}</span>
          {hasChildren && (
            <span className={`expand-icon ${expandedHabits ? 'expanded' : ''}`}>
             ▼
            </span>
          )}
        </button>
        
        {hasChildren && expandedHabits && (
          <div className="submenu">
            {item.children.map(child => {
              const ChildIcon = child.icon;
              const isChildActive = activeItem === child.id;
              
              return (
                <button
                  key={child.id}
                  className={`submenu-item ${isChildActive ? 'active' : ''}`}
                  onClick={() => handleItemClick(child)}
                >
                  <ChildIcon size={16} className="submenu-icon" />
                  <span className="submenu-label">{child.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <h1 className="app-logo">HabitTracker</h1>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.id} className="menu-item-container">
              {renderMenuItem(item)}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;