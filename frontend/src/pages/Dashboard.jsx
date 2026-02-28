import React from 'react';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
  return (
    <Layout currentPage="dashboard">
      <div className="dashboard">
        <div className="page-header">
          <h1>Dashboard</h1>
          <p>Track your habit progress and performance insights</p>
        </div>
        <div className="empty-state">
          <p>No data available yet</p>
          <p className="empty-state-subtext">Start by adding your first habit</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;