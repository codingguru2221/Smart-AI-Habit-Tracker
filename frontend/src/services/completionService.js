import { api } from './api';

class CompletionService {
  // Create a new completion
  async createCompletion(completionData) {
    try {
      const response = await api.post('/completions', completionData);
      return response.data;
    } catch (error) {
      console.error('Error creating completion:', error);
      throw error;
    }
  }

  // Get completion by ID
  async getCompletionById(id) {
    try {
      const response = await api.get(`/completions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching completion:', error);
      throw error;
    }
  }

  // Get completions by habit ID
  async getCompletionsByHabitId(habitId) {
    try {
      const response = await api.get(`/completions/habit/${habitId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching habit completions:', error);
      throw error;
    }
  }

  // Get completions by user ID
  async getCompletionsByUserId(userId) {
    try {
      const response = await api.get(`/completions/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user completions:', error);
      throw error;
    }
  }

  // Get recent completions for a habit
  async getRecentCompletions(habitId, limit = 10) {
    try {
      const response = await api.get(`/completions/habit/${habitId}/recent?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching recent completions:', error);
      throw error;
    }
  }

  // Get completions by date range
  async getCompletionsByDateRange(habitId, startDate, endDate) {
    try {
      const response = await api.get(`/completions/habit/${habitId}/range?startDate=${startDate}&endDate=${endDate}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching completions by date range:', error);
      throw error;
    }
  }

  // Delete completion
  async deleteCompletion(id) {
    try {
      await api.delete(`/completions/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting completion:', error);
      throw error;
    }
  }

  // Get completion statistics
  async getCompletionStats(habitId) {
    try {
      const response = await api.get(`/completions/habit/${habitId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching completion stats:', error);
      throw error;
    }
  }
}

export default new CompletionService();