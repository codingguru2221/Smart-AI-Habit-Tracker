package com.thecodex.habittracker.service;

import com.thecodex.habittracker.dto.HabitCompletionDto;
import com.thecodex.habittracker.model.HabitCompletion;
import java.time.LocalDateTime;
import java.util.List;

public interface HabitCompletionService {
    HabitCompletion createCompletion(HabitCompletionDto completionDto);
    void deleteCompletion(Long id);
    HabitCompletion getCompletionById(Long id);
    List<HabitCompletion> getCompletionsByHabitId(Long habitId);
    List<HabitCompletion> getCompletionsByUserId(Long userId);
    List<HabitCompletion> getCompletionsByHabitIdAndDateRange(Long habitId, LocalDateTime startDate, LocalDateTime endDate);
    List<HabitCompletion> getRecentCompletions(Long habitId, int limit);
    Long getTotalCompletions(Long habitId);
    Integer getCurrentStreak(Long habitId);
    Integer getLongestStreak(Long habitId);
    Double getCompletionRate(Long habitId);
    boolean existsById(Long id);
}