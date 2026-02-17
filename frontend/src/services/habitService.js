import { api } from './api';

class HabitService {
  // Create a new habit
  async createHabit(habitData) {
    try {
      const response = await api.post('/habits', habitData);
      return response.data;
    } catch (error) {
      console.error('Error creating habit:', error);
      throw error;
    }
  }

  // Get habit by ID
  async getHabitById(id) {
    try {
      const response = await api.get(`/habits/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching habit:', error);
      throw error;
    }
  }

  // Get habit with statistics
  async getHabitWithStats(id) {
    try {
      const response = await api.get(`/habits/${id}/with-stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching habit with stats:', error);
      throw error;
    }
  }

  // Get all habits
  async getAllHabits() {
    try {
      const response = await api.get('/habits');
      return response.data;
    } catch (error) {
      console.error('Error fetching habits:', error);
      throw error;
    }
  }

  // Get habits by user ID
  async getHabitsByUserId(userId) {
    try {
      const response = await api.get(`/habits/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user habits:', error);
      throw error;
    }
  }

  // Get active habits by user ID
  async getActiveHabitsByUserId(userId) {
    try {
      const response = await api.get(`/habits/user/${userId}/active`);
      return response.data;
    } catch (error) {
      console.error('Error fetching active habits:', error);
      throw error;
    }
  }

  // Update habit
  async updateHabit(id, habitData) {
    try {
      const response = await api.put(`/habits/${id}`, habitData);
      return response.data;
    } catch (error) {
      console.error('Error updating habit:', error);
      throw error;
    }
  }

  // Delete habit
  async deleteHabit(id) {
    try {
      await api.delete(`/habits/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting habit:', error);
      throw error;
    }
  }

  // Get active habits count for user
  async getActiveHabitsCount(userId) {
    try {
      const response = await api.get(`/habits/user/${userId}/count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching habits count:', error);
      throw error;
    }
  }
}

export default new HabitService();