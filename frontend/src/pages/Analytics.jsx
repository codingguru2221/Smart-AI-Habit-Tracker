import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import { Droplets, BookOpen, Monitor } from 'lucide-react';
import './Analytics.css';

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState('week'); // Default to week view

  // Dummy data for analytics
  const analyticsData = {
    habits: [
      {
        id: 'water',
        name: 'Water',
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
    ],
    // Main chart data - varies by time filter
    chartData: {
      year: [
        { month: 'Jan', value: 65 },
        { month: 'Feb', value: 72 },
        { month: 'Mar', value: 80 },
        { month: 'Apr', value: 75 },
        { month: 'May', value: 88 },
        { month: 'Jun', value: 60 },
        { month: 'Jul', value: 70 },
        { month: 'Aug', value: 75 },
        { month: 'Sep', value: 82 },
        { month: 'Oct', value: 78 },
        { month: 'Nov', value: 85 },
        { month: 'Dec', value: 90 }
      ],
      month: [
        { week: 'Week 1', value: 65 },
        { week: 'Week 2', value: 72 },
        { week: 'Week 3', value: 80 },
        { week: 'Week 4', value: 75 }
      ],
      week: [
        { day: 'Mon', value: 65 },
        { day: 'Tue', value: 72 },
        { day: 'Wed', value: 80 },
        { day: 'Thu', value: 75 },
        { day: 'Fri', value: 88 },
        { day: 'Sat', value: 60 },
        { day: 'Sun', value: 70 }
      ]
    }
  };

  const renderMainChart = () => {
    // Get data based on selected time filter
    let data = [];
    let labelKey = '';
    
    switch(timeFilter) {
      case 'year':
        data = analyticsData.chartData.year;
        labelKey = 'month';
        break;
      case 'month':
        data = analyticsData.chartData.month;
        labelKey = 'week';
        break;
      case 'week':
      default:
        data = analyticsData.chartData.week;
        labelKey = 'day';
        break;
    }

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
    const peakLabel = data.find(d => d.value === peakValue)[labelKey];

    return (
      <div className="main-chart-container">
        <div className="chart-header">
          <h2>Overall Performance Trends</h2>
          <div className="time-filter-options">
            <button 
              className={`filter-btn ${timeFilter === 'week' ? 'active' : ''}`}
              onClick={() => setTimeFilter('week')}
            >
              Week
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'month' ? 'active' : ''}`}
              onClick={() => setTimeFilter('month')}
            >
              Month
            </button>
            <button 
              className={`filter-btn ${timeFilter === 'year' ? 'active' : ''}`}
              onClick={() => setTimeFilter('year')}
            >
              Year
            </button>
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
              strokeWidth="2"
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
                    r="2"
                    fill="#3B82F6"
                    stroke="#0F172A"
                    strokeWidth="1"
                    className="data-point"
                  />
                </g>
              );
            })}
          </svg>
          
          {/* X-axis labels */}
          <div className="chart-labels">
            {data.map((item, index) => (
              <span key={index} className="x-label">{item[labelKey]}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderUnifiedCircularChart = () => {
    // Calculate total percentage for proportional segments
    const totalPercentage = analyticsData.habits.reduce((sum, habit) => sum + habit.percentage, 0);
    const avgPercentage = Math.round(totalPercentage / analyticsData.habits.length);
    
    // Calculate cumulative angles for each segment
    let cumulativeAngle = 0;
    
    return (
      <div className="unified-circular-container">
        <div className="unified-circular-content">
          <svg width="200" height="200" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            
            {/* Habit segments */}
            {analyticsData.habits.map((habit, index) => {
              const percentage = habit.percentage;
              const angle = (percentage / 100) * 360;
              const startAngle = cumulativeAngle;
              const endAngle = cumulativeAngle + angle;
              
              // Convert angles to radians
              const startRad = (startAngle - 90) * (Math.PI / 180);
              const endRad = (endAngle - 90) * (Math.PI / 180);
              
              // Calculate start and end points
              const x1 = 50 + 40 * Math.cos(startRad);
              const y1 = 50 + 40 * Math.sin(startRad);
              const x2 = 50 + 40 * Math.cos(endRad);
              const y2 = 50 + 40 * Math.sin(endRad);
              
              // Large arc flag (1 if angle > 180, 0 otherwise)
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${x1} ${y1}`,
                `A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2}`
              ].join(' ');
              
              cumulativeAngle += angle;
              
              return (
                <path
                  key={habit.id}
                  d={pathData}
                  fill="none"
                  stroke={habit.color}
                  strokeWidth="8"
                  strokeLinecap="round"
                />
              );
            })}
            
            {/* Center circle */}
            <circle
              cx="50"
              cy="50"
              r="25"
              fill="#1E293B"
            />
            
            {/* Center content */}
            <text
              x="50"
              y="48"
              textAnchor="middle"
              fill="#E2E8F0"
              fontSize="12"
              fontWeight="bold"
            >
              {avgPercentage}%
            </text>
            <text
              x="50"
              y="58"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="6"
            >
              Avg
            </text>
          </svg>
        </div>
        
        {/* Legend */}
        <div className="habit-legend">
          {analyticsData.habits.map((habit) => {
            const IconComponent = habit.icon;
            return (
              <div key={habit.id} className="legend-item">
                <div 
                  className="legend-color"
                  style={{ backgroundColor: habit.color }}
                ></div>
                <div 
                  className="legend-icon"
                  style={{ color: habit.iconColor }}
                >
                  <IconComponent size={12} />
                </div>
                <span className="legend-text">{habit.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Layout currentPage="analytics">
      <div className="analytics">
        <div className="page-header">
          <h1>Analytics Dashboard</h1>
          <p>Comprehensive overview of your habit tracking performance</p>
        </div>
        
        <div className="analytics-layout-improved">
          {/* Left Side - Main Chart */}
          <div className="main-chart-section-improved">
            {renderMainChart()}
          </div>
          
          {/* Right Side - Unified Circular Analytics */}
          <div className="circular-analytics-section-improved">
            <div className="circular-header">
              <h2>Habit Distribution</h2>
            </div>
            {renderUnifiedCircularChart()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;