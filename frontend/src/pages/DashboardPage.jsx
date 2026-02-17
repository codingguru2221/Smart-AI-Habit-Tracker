import React, { useState } from 'react';
import HabitCard from '../components/HabitCard';
import HabitForm from '../components/HabitForm';
import StreakCounter from '../components/StreakCounter';
import { useHabits } from '../hooks/useHabits';
import { useCompletions } from '../hooks/useCompletions';

const DashboardPage = () => {
  const userId = 1; // Default user ID for now
  const [showForm, setShowForm] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  
  const {
    habits,
    loading: habitsLoading,
    error: habitsError,
    createHabit,
    updateHabit,
    deleteHabit
  } = useHabits(userId);

  // Mock overall statistics
  const overallStats = {
    currentStreak: Math.max(...habits.map(h => 0), 0),
    longestStreak: Math.max(...habits.map(h => 0), 0),
    totalCompletions: habits.reduce((sum, habit) => sum + 0, 0) // Would need to fetch actual completions
  };

  const handleCreateHabit = async (habitData) => {
    try {
      await createHabit(habitData);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to create habit:', error);
    }
  };

  const handleUpdateHabit = async (habitData) => {
    try {
      await updateHabit(editingHabit.id, habitData);
      setEditingHabit(null);
    } catch (error) {
      console.error('Failed to update habit:', error);
    }
  };

  const handleDeleteHabit = async (id) => {
    try {
      await deleteHabit(id);
    } catch (error) {
      console.error('Failed to delete habit:', error);
    }
  };

  const handleMarkComplete = async (habitId) => {
    // This would integrate with completion service
    console.log('Marking habit complete:', habitId);
    // Implementation would go here
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
  };

  if (habitsLoading) {
    return <div className="loading">Loading habits...</div>;
  }

  if (habitsError) {
    return <div className="error">Error loading habits: {habitsError}</div>;
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
                stats={{
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