package com.thecodex.habittracker.controller;

import com.thecodex.habittracker.service.HabitService;
import com.thecodex.habittracker.service.HabitCompletionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/statistics")

public class StatisticsController {
    
    @Autowired
    private HabitService habitService;
    
    @Autowired
    private HabitCompletionService habitCompletionService;
    
    @GetMapping("/user/{userId}/overview")
    public ResponseEntity<Map<String, Object>> getUserOverview(@PathVariable Long userId) {
        Map<String, Object> overview = new HashMap<>();
        
        Long totalHabits = habitService.getActiveHabitsCount(userId);
        overview.put("totalActiveHabits", totalHabits);
        
        // Get all habits for user to calculate additional stats
        List<com.thecodex.habittracker.model.Habit> habits = habitService.getActiveHabitsByUserId(userId);
        
        Long totalCompletions = habits.stream()
            .mapToLong(habit -> habitCompletionService.getTotalCompletions(habit.getId()))
            .sum();
        overview.put("totalCompletions", totalCompletions);
        
        Double averageCompletionRate = habits.isEmpty() ? 0.0 : 
            habits.stream()
                .mapToDouble(habit -> habitCompletionService.getCompletionRate(habit.getId()))
                .average()
                .orElse(0.0);
        overview.put("averageCompletionRate", Math.round(averageCompletionRate * 100.0) / 100.0);
        
        Integer bestStreak = habits.stream()
            .mapToInt(habit -> habitCompletionService.getLongestStreak(habit.getId()))
            .max()
            .orElse(0);
        overview.put("bestStreak", bestStreak);
        
        return ResponseEntity.ok(overview);
    }
    
    @GetMapping("/habit/{habitId}/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyStats(@PathVariable Long habitId) {
        Map<String, Object> monthlyStats = new HashMap<>();
        
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfMonth = now.withDayOfMonth(now.toLocalDate().lengthOfMonth()).withHour(23).withMinute(59).withSecond(59);
        
        List<com.thecodex.habittracker.model.HabitCompletion> completions = 
            habitCompletionService.getCompletionsByHabitIdAndDateRange(habitId, startOfMonth, endOfMonth);
        
        monthlyStats.put("totalCompletions", completions.size());
        monthlyStats.put("completionRate", calculateMonthlyCompletionRate(habitId, startOfMonth, endOfMonth));
        monthlyStats.put("dailyCompletions", completions.size());
        
        return ResponseEntity.ok(monthlyStats);
    }
    
    private Double calculateMonthlyCompletionRate(Long habitId, LocalDateTime startOfMonth, LocalDateTime endOfMonth) {
        long daysInMonth = java.time.temporal.ChronoUnit.DAYS.between(startOfMonth.toLocalDate(), endOfMonth.toLocalDate()) + 1;
        Long completionsInPeriod = habitCompletionService.getTotalCompletions(habitId);
        
        if (daysInMonth == 0) return 0.0;
        return (double) completionsInPeriod / daysInMonth * 100;
    }
}