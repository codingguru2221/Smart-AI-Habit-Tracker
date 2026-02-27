import React from 'react';
import Layout from '../components/layout/Layout';
import { TrendingUp, Calendar, Target, CheckCircle } from 'lucide-react';

const Analytics = () => {
  // Dummy data for analytics
  const analyticsData = {
    productivity: 78,
    habitCompletion: 85,
    categories: [
      { name: 'Technical', percentage: 35, icon: '💻', color: '#3B82F6' },
      { name: 'Non-Technical', percentage: 25, icon: '📚', color: '#8B5CF6' },
      { name: 'Physical', percentage: 20, icon: '🏃', color: '#22C55E' },
      { name: 'Non-Physical', percentage: 20, icon: '🧘', color: '#F59E0B' }
    ],
    trends: [
      { day: 'Mon', value: 65 },
      { day: 'Tue', value: 72 },
      { day: 'Wed', value: 80 },
      { day: 'Thu', value: 75 },
      { day: 'Fri', value: 88 },
      { day: 'Sat', value: 60 },
      { day: 'Sun', value: 70 }
    ],
    monthlyStats: {
      totalDays: 30,
      completedDays: 22,
      completionRate: 73
    }
  };

  const renderRadialChart = (percentage, label, color = '#3B82F6') => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    
    return (
      <div className="radial-chart">
        <div className="radial-content">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
              className="progress-ring"
            />
          </svg>
          <div className="radial-value">
            <span className="percentage">{percentage}%</span>
          </div>
        </div>
        <div className="radial-label">{label}</div>
      </div>
    );
  };

  const renderLineChart = () => {
    const maxValue = Math.max(...analyticsData.trends.map(d => d.value));
    const minValue = Math.min(...analyticsData.trends.map(d => d.value));
    const range = maxValue - minValue;
    
    const points = analyticsData.trends.map((data, index) => {
      const x = (index / (analyticsData.trends.length - 1)) * 100;
      const y = 100 - ((data.value - minValue) / range) * 80;
      return `${x},${y}`;
    }).join(' ');

    const peakValue = Math.max(...analyticsData.trends.map(d => d.value));
    const peakDay = analyticsData.trends.find(d => d.value === peakValue)?.day;

    return (
      <div className="line-chart-container">
        <div className="chart-header">
          <h3>Weekly Progress Trend</h3>
          <div className="peak-indicator">
            <TrendingUp size={16} />
            <span>Peak: {peakValue}% ({peakDay})</span>
          </div>
        </div>
        <div className="line-chart">
          <svg viewBox="0 0 100 100" className="chart-svg">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="100" y2="20" className="grid-line" />
            <line x1="0" y1="40" x2="100" y2="40" className="grid-line" />
            <line x1="0" y1="60" x2="100" y2="60" className="grid-line" />
            <line x1="0" y1="80" x2="100" y2="80" className="grid-line" />
            
            {/* Data line */}
            <polyline
              points={points}
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              className="trend-line"
            />
            
            {/* Data points */}
            {analyticsData.trends.map((data, index) => {
              const x = (index / (analyticsData.trends.length - 1)) * 100;
              const y = 100 - ((data.value - minValue) / range) * 80;
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="2"
                  fill="#3B82F6"
                  className="data-point"
                />
              );
            })}
          </svg>
          <div className="chart-labels">
            {analyticsData.trends.map((data, index) => (
              <span key={index} className="x-label">{data.day}</span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCategoryBreakdown = () => {
    let cumulativePercentage = 0;
    
    return (
      <div className="category-breakdown">
        <h3>Habit Categories Distribution</h3>
        <div className="breakdown-content">
          <div className="pie-chart-container">
            <svg className="pie-chart" viewBox="0 0 100 100">
              {analyticsData.categories.map((category, index) => {
                const percentage = category.percentage;
                const dashArray = (percentage / 100) * 251.2; // 2π * 40
                const dashOffset = 251.2 - cumulativePercentage * 2.512;
                cumulativePercentage += percentage;
                
                return (
                  <circle
                    key={index}
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke={category.color}
                    strokeWidth="15"
                    strokeDasharray={`${dashArray} ${251.2 - dashArray}`}
                    strokeDashoffset={dashOffset}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                );
              })}
              {/* Center circle for donut effect */}
              <circle
                cx="50"
                cy="50"
                r="25"
                fill="#1E293B"
              />
            </svg>
          </div>
          
          <div className="category-list">
            {analyticsData.categories.map((category, index) => (
              <div key={index} className="category-item">
                <div className="category-icon" style={{ color: category.color }}>
                  {category.icon}
                </div>
                <div className="category-info">
                  <span className="category-name">{category.name}</span>
                  <span className="category-percentage">{category.percentage}%</span>
                </div>
                <div 
                  className="category-bar"
                  style={{ 
                    backgroundColor: `${category.color}20`,
                    width: `${category.percentage}%`
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCalendarOverview = () => {
    // Generate mock calendar data for demonstration
    const daysInMonth = 30;
    const completedDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      completed: Math.random() > 0.3 // 70% completion rate
    }));

    return (
      <div className="calendar-overview">
        <div className="calendar-header">
          <h3>Monthly Progress</h3>
          <div className="completion-stats">
            <span className="completed-days">{analyticsData.monthlyStats.completedDays}</span>
            <span className="total-days">/{analyticsData.monthlyStats.totalDays} days</span>
          </div>
        </div>
        
        <div className="calendar-grid">
          {completedDays.map((day, index) => (
            <div 
              key={index} 
              className={`calendar-day ${day.completed ? 'completed' : 'missed'}`}
              title={`Day ${day.day}: ${day.completed ? 'Completed' : 'Missed'}`}
            >
              {day.day}
            </div>
          ))}
        </div>
        
        <div className="calendar-legend">
          <div className="legend-item">
            <div className="legend-color completed"></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-color missed"></div>
            <span>Missed</span>
          </div>
        </div>
      </div>
    );
  };

  const renderSummaryStats = () => {
    const stats = [
      { 
        label: 'Total Habits', 
        value: '12', 
        icon: CheckCircle,
        color: '#3B82F6'
      },
      { 
        label: 'Completion Rate', 
        value: '78%', 
        icon: Target,
        color: '#22C55E'
      },
      { 
        label: 'Current Streak', 
        value: '6 days', 
        icon: TrendingUp,
        color: '#F59E0B'
      },
      { 
        label: 'Best Day', 
        value: 'Friday', 
        icon: Calendar,
        color: '#8B5CF6'
      }
    ];

    return (
      <div className="stats-summary">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <IconComponent size={20} />
              </div>
              <div className="stat-content">
                <h3>{stat.label}</h3>
                <p className="stat-value" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Layout>
      <div className="analytics">
        <div className="page-header">
          <h1>Analytics Dashboard</h1>
          <p>Track your habit progress and performance insights</p>
        </div>
        
        {renderSummaryStats()}
        
        <div className="analytics-grid">
          <div className="analytics-card">
            {renderRadialChart(analyticsData.productivity, 'Current Productivity', '#3B82F6')}
          </div>
          
          <div className="analytics-card">
            {renderRadialChart(analyticsData.habitCompletion, 'Habit Completion', '#22C55E')}
          </div>
          
          <div className="analytics-card full-width">
            {renderLineChart()}
          </div>
          
          <div className="analytics-card full-width">
            {renderCategoryBreakdown()}
          </div>
          
          <div className="analytics-card">
            {renderCalendarOverview()}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;