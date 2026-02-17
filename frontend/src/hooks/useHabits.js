import { useState, useEffect } from 'react';
import habitService from '../services/habitService';

export const useHabits = (userId) => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHabits = async () => {
    if (!userId) return;
    
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching habits for user:', userId);
      const data = await habitService.getActiveHabitsByUserId(userId);
      console.log('Habits fetched successfully:', data);
      setHabits(data);
    } catch (err) {
      console.error('Failed to fetch habits:', err);
      console.error('Error details:', err.response || err.message);
      
      if (err.message === 'Network Error') {
        setError('Unable to connect to the server. Please make sure the backend is running on port 8080.');
      } else {
        setError(err.message || 'Failed to load habits');
      }
    } finally {
      setLoading(false);
    }
  };

  const createHabit = async (habitData) => {
    setLoading(true);
    setError(null);
    try {
      const newHabit = await habitService.createHabit(habitData);
      setHabits(prev => [...prev, newHabit]);
      return newHabit;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateHabit = async (id, habitData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedHabit = await habitService.updateHabit(id, habitData);
      setHabits(prev => prev.map(habit => habit.id === id ? updatedHabit : habit));
      return updatedHabit;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteHabit = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await habitService.deleteHabit(id);
      setHabits(prev => prev.filter(habit => habit.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getHabitWithStats = async (id) => {
    try {
      return await habitService.getHabitWithStats(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [userId]);

  return {
    habits,
    loading,
    error,
    fetchHabits,
    createHabit,
    updateHabit,
    deleteHabit,
    getHabitWithStats
  };
};