import { useState, useEffect } from 'react';
import completionService from '../services/completionService';

export const useCompletions = (habitId) => {
  const [completions, setCompletions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompletions = async () => {
    if (!habitId) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await completionService.getCompletionsByHabitId(habitId);
      setCompletions(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch completions:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCompletion = async (completionData) => {
    setLoading(true);
    setError(null);
    try {
      const newCompletion = await completionService.createCompletion(completionData);
      setCompletions(prev => [newCompletion, ...prev]);
      return newCompletion;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompletion = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await completionService.deleteCompletion(id);
      setCompletions(prev => prev.filter(completion => completion.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getCompletionStats = async () => {
    if (!habitId) return null;
    try {
      return await completionService.getCompletionStats(habitId);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const getRecentCompletions = async (limit = 10) => {
    if (!habitId) return [];
    try {
      return await completionService.getRecentCompletions(habitId, limit);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchCompletions();
  }, [habitId]);

  return {
    completions,
    loading,
    error,
    fetchCompletions,
    createCompletion,
    deleteCompletion,
    getCompletionStats,
    getRecentCompletions
  };
};