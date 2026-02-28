import React from 'react';
import Layout from '../components/layout/Layout';
import { Droplets, BookOpen, Monitor, TrendingUp } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  // Dummy data for analytics
  const analyticsData = {
    // Main chart data - overall performance
    overallPerformance: [
      { day: 'Mon', value: 65 },
      { day: 'Tue', value: 72 },
      { day: 'Wed', value: 80 },
      { day: 'Thu', value: 75 },
      { day: 'Fri', value: 88 },
      { day: 'Sat', value: 60 },
      { day: 'Sun', value: 70 }
    ],
    
    // Habit-specific circular analytics
    habits: [
      {
        id: 'water',
        name: 'Water Drinking',
        percentage: 92,
        icon: Droplets,
        color: '#3B82F6', // Blue theme
        bgColor: 'rgba(59, 130, 246, 0.1)',
        iconColor: '#3B82F6'
      },
      {
        id: 'study',
        name: 'Study',
        percentage: 78,
        icon: BookOpen,
        color: '#E2E8F0', // White theme
        bgColor: 'rgba(226, 232, 240, 0.1)',
        iconColor: '#E2E8F0'
      },
      {
        id: 'coding',
        name: 'Coding',
        percentage: 85,
        icon: Monitor,
        color: '#22C55E', // Accent color
        bgColor: 'rgba(34, 197, 94, 0.1)',
        iconColor: '#22C55E'
      }
    ]
  };

  const renderMainChart = () => {
    const data = analyticsData.overallPerformance;
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;
    
    // Generate smooth curve points
    const points = data.map((item, index) => {
      const x = (index / (data.length - 1)) * 100;
      const y = 100 - ((item.value - minValue) / range) * 80;
      return `${x},${y}`;
    }).join(' ');

    const peakValue = Math.max(...data.map(d => d.value));
    const peakDay = data.find(d => d.value === peakValue)?.day;

    return (
      <div className="main-chart-container">
        <div className="chart-header">
          <h2>Overall Performance Trends</h2>
          <div className="peak-indicator">
            <TrendingUp size={18} />
            <span>Peak: {peakValue}% ({peakDay})</span>
          </div>
        </div>
        
        <div className="chart-wrapper">
          <svg viewBox="0 0 100 100" className="performance-chart">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="100" y2="20" className="grid-line" />
            <line x1="0" y1="40" x2="100" y2="40" className="grid-line" />
            <line x1="0" y1="60" x2="100" y2="60" className="grid-line" />
            <line x1="0" y1="80" x2="100" y2="80" className="grid-line" />
            
            {/* Main trend line */}
            <polyline
              points={points}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="3"
              className="trend-line"
            />
            
            {/* Gradient area under curve */}
            <defs>
              <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <polygon 
              points={`0,100 ${points} 100,100`} 
              fill="url(#chartGradient)" 
            />
            
            {/* Data points */}
            {data.map((item, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = 100 - ((item.value - minValue) / range) * 80;
              return (
                <g key={index}>
                  <circle
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#3B82F6"
                    stroke="#0F172A"
                    strokeWidth="2"
                    className="data-point"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="transparent"
                    stroke="#3B82F6"
                    strokeWidth="2"
                    className="data-point-ring"
                  />
                </g>
              );
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="chart-labels">
            {data.map((item, index) => (
              <span key={index} className="x-label">{item.day}</span>
            ))}
          </div>
        </div>
        
        {/* Chart statistics */}
        <div className="chart-stats">
          <div className="stat-item">
            <span className="stat-label">Average</span>
            <span className="stat-value">74%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">This Week</span>
            <span className="stat-value">+12%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Consistency</span>
            <span className="stat-value">85%</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCircularAnalytics = () => {
    const renderCircularChart = (habit) => {
      const radius = 40;
      const circumference = 2 * Math.PI * radius;
      const strokeDasharray = circumference;
      const strokeDashoffset = circumference - (habit.percentage / 100) * circumference;
      
      const IconComponent = habit.icon;
      
      return (
        <div className="circular-analytics-card" key={habit.id}>
          <div className="circular-content">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke="#334155"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                stroke={habit.color}
                strokeWidth="8"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
                className="progress-ring"
              />
            </svg>
            
            {/* Center content */}
            <div className="center-content">
              <div 
                className="habit-icon"
                style={{ 
                  color: habit.iconColor,
                  backgroundColor: habit.bgColor
                }}
              >
                <IconComponent size={24} />
              </div>
              <div className="percentage-value" style={{ color: habit.color }}>
                {habit.percentage}%
              </div>
            </div>
          </div>
          
          {/* Habit info */}
          <div className="habit-info">
            <h3 className="habit-name">{habit.name}</h3>
            <p className="completion-text">Completion Rate</p>
          </div>
          
          {/* Progress bar */}
          <div className="progress-bar-container">
            <div 
              className="progress-bar-fill"
              style={{ 
                width: `${habit.percentage}%`,
                backgroundColor: habit.color
              }}
            ></div>
          </div>
        </div>
      );
    };

    return (
      <div className="circular-analytics-container">
        <div className="analytics-header">
          <h2>Habit Analytics</h2>
          <p>Track individual habit performance</p>
        </div>
        
        <div className="circular-analytics-grid">
          {analyticsData.habits.map(habit => renderCircularChart(habit))}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="analytics">
        <div className="page-header">
          <h1>Analytics Dashboard</h1>
          <p>Comprehensive overview of your habit tracking performance</p>
        </div>
        
        <div className="analytics-layout">
          {/* Left Side - Main Chart */}
          <div className="main-chart-section">
            {renderMainChart()}
          </div>
          
          {/* Right Side - Circular Analytics */}
          <div className="circular-analytics-section">
            {renderCircularAnalytics()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;