import React from 'react';
import Layout from '../components/layout/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="dashboard">
        <h1>Dashboard</h1>
        <div className="empty-state">
          <p>No data available yet</p>
          <p className="empty-state-subtext">Start by adding your first habit</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;