import { api } from './api';

class StatisticsService {
  // Get user overview statistics
  async getUserOverview(userId) {
    try {
      const response = await api.get(`/statistics/user/${userId}/overview`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user overview:', error);
      throw error;
    }
  }

  // Get monthly statistics for a habit
  async getMonthlyStats(habitId) {
    try {
      const response = await api.get(`/statistics/habit/${habitId}/monthly`);
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly stats:', error);
      throw error;
    }
  }
}

export default new StatisticsService();