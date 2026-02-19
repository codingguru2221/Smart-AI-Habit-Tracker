import React, { useState, useEffect } from 'react';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import StreakCounter from '../components/StreakCounter';
import { useHabits } from '../hooks/useHabits';
import { useCompletions } from '../hooks/useCompletions';
import completionService from '../services/completionService';

const DashboardPage = () => {
  const userId = 1; // Default user ID for now
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [habitStats, setHabitStats] = useState({});
  
  const {
    habits,
    loading: habitsLoading,
    error: habitsError,
    createHabit,
    updateHabit,
    deleteHabit,
    getHabitWithStats
  } = useHabits(userId);

  // Load statistics for each habit
  useEffect(() => {
    const loadHabitStats = async () => {
      const stats = {};
      for (const habit of habits) {
        try {
          const habitWithStats = await getHabitWithStats(habit.id);
          stats[habit.id] = {
            totalCompletions: habitWithStats.totalCompletions || 0,
            currentStreak: habitWithStats.currentStreak || 0,
            longestStreak: habitWithStats.longestStreak || 0,
            completionRate: habitWithStats.completionRate || 0
          };
        } catch (error) {
          console.error('Failed to load stats for habit:', habit.id, error);
          stats[habit.id] = {
            totalCompletions: 0,
            currentStreak: 0,
            longestStreak: 0,
            completionRate: 0
          };
        }
      }
      setHabitStats(stats);
    };

    if (habits.length > 0) {
      loadHabitStats();
    }
  }, [habits, getHabitWithStats]);

  // Calculate overall statistics
  const overallStats = {
    currentStreak: Math.max(...Object.values(habitStats).map(stat => stat.currentStreak), 0),
    longestStreak: Math.max(...Object.values(habitStats).map(stat => stat.longestStreak), 0),
    totalCompletions: Object.values(habitStats).reduce((sum, stat) => sum + stat.totalCompletions, 0),
    totalHabits: habits.length
  };

  const handleCreateHabit = async (habitData) => {
    try {
      await createHabit(habitData);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create habit:', error);
      alert('Failed to create habit: ' + error.message);
    }
  };

  const handleUpdateHabit = async (habitData) => {
    try {
      await updateHabit(editingHabit.id, habitData);
      setEditingHabit(null);
    } catch (error) {
      console.error('Failed to update habit:', error);
      alert('Failed to update habit: ' + error.message);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
    } catch (error) {
      console.error('Failed to delete habit:', error);
      alert('Failed to delete habit: ' + error.message);
    }
  };

  const handleMarkComplete = async (habitId) => {
    try {
      const completionData = {
        habitId: habitId,
        userId: userId,
        completedAt: new Date().toISOString(),
        notes: 'Completed via dashboard'
      };
      
      await completionService.createCompletion(completionData);
      
      // Refresh habit stats
      const updatedStats = await getHabitWithStats(habitId);
      setHabitStats(prev => ({
        ...prev,
        [habitId]: {
          totalCompletions: updatedStats.totalCompletions || 0,
          currentStreak: updatedStats.currentStreak || 0,
          longestStreak: updatedStats.longestStreak || 0,
          completionRate: updatedStats.completionRate || 0
        }
      }));
      
      alert('Habit marked as complete!');
    } catch (error) {
      console.error('Failed to mark habit complete:', error);
      alert('Failed to mark habit complete: ' + error.message);
    }
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
  };

  if (habitsLoading) {
    return (
      <div className="dashboard-page">
        <div className="loading">Loading habits...</div>
      </div>
    );
  }

  if (habitsError) {
    return (
      <div className="dashboard-page">
        <div className="error">Error loading habits: {habitsError}</div>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Habit Tracker Dashboard</h1>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add New Habit
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <StreakCounter 
          currentStreak={overallStats.currentStreak}
          longestStreak={overallStats.longestStreak}
          totalCompletions={overallStats.totalCompletions}
        />
        <div className="overall-stats">
          <div className="stat-item">
            <span className="stat-label">Total Habits</span>
            <span className="stat-value">{overallStats.totalHabits}</span>
          </div>
        </div>
      </div>

      <div className="habits-section">
        <h2>Your Habits</h2>
        {habits.length === 0 ? (
          <div className="no-habits">
            <p>You haven't created any habits yet.</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              Create Your First Habit
            </button>
          </div>
        ) : (
          <div className="habits-grid">
            {habits.map(habit => (
              <HabitCard
                key={habit.id}
                habit={habit}
                stats={habitStats[habit.id] || {
                  totalCompletions: 0,
                  currentStreak: 0,
                  longestStreak: 0,
                  completionRate: 0
                }}
                onMarkComplete={handleMarkComplete}
                onEdit={handleEditHabit}
                onDelete={handleDeleteHabit}
              />
            ))}
          </div>
        )}
      </div>

      {(showForm || editingHabit) && (
        <div className="modal-overlay">
          <div className="modal-content">
            <HabitForm
              habit={editingHabit}
              onSubmit={editingHabit ? handleUpdateHabit : handleCreateHabit}
              onCancel={() => {
                setShowForm(false);
                setEditingHabit(null);
              }}
              isEditing={!!editingHabit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;