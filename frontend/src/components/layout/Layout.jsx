import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = ({ children, currentPage }) => {
  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} />
      <div className="main-content">
        <Header currentPage={currentPage} />
        <div className="content-wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;