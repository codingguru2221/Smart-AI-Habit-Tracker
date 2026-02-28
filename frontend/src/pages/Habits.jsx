import React from 'react';
import Layout from '../components/layout/Layout';

const Habits = () => {
  return (
    <Layout currentPage="habits">
      <div className="habits-page">
        <div className="page-header">
          <h1>Habits Management</h1>
          <p>Track and manage your daily habits</p>
        </div>
        
        <div className="habits-content">
          <div className="empty-state">
            <p>No habits created yet</p>
            <p className="empty-state-subtext">Click the + button to add your first habit</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Habits;