package com.thecodex.habittracker.service;

import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Collections;

@Service
public class StreakServiceImpl implements StreakService {
    
    @Override
    public Integer calculateCurrentStreak(List<LocalDate> completionDates) {
        if (completionDates == null || completionDates.isEmpty()) {
            return 0;
        }
        
        List<LocalDate> sortedDates = completionDates.stream()
            .distinct()
            .sorted()
            .toList();
        
        int streak = 0;
        LocalDate currentDate = LocalDate.now();
        
        // Check backwards from today
        for (int i = sortedDates.size() - 1; i >= 0; i--) {
            LocalDate completionDate = sortedDates.get(i);
            
            if (ChronoUnit.DAYS.between(completionDate, currentDate) == 0) {
                streak++;
                currentDate = currentDate.minusDays(1);
            } else if (ChronoUnit.DAYS.between(completionDate, currentDate) > 1) {
                break; // Break in streak
            } else {
                currentDate = completionDate.minusDays(1);
            }
        }
        
        return streak;
    }
    
    @Override
    public Integer calculateLongestStreak(List<LocalDate> completionDates) {
        if (completionDates == null || completionDates.isEmpty()) {
            return 0;
        }
        
        List<LocalDate> sortedDates = completionDates.stream()
            .distinct()
            .sorted()
            .toList();
        
        int maxStreak = 0;
        int currentStreak = 1;
        
        for (int i = 1; i < sortedDates.size(); i++) {
            LocalDate previousDate = sortedDates.get(i - 1);
            LocalDate currentDate = sortedDates.get(i);
            
            long daysBetween = ChronoUnit.DAYS.between(previousDate, currentDate);
            
            if (daysBetween == 1) {
                currentStreak++;
            } else if (daysBetween > 1) {
                maxStreak = Math.max(maxStreak, currentStreak);
                currentStreak = 1;
            }
            // If daysBetween == 0, it's the same day, so we don't increment
        }
        
        maxStreak = Math.max(maxStreak, currentStreak);
        return maxStreak;
    }
    
    @Override
    public boolean isCompletedToday(List<LocalDate> completionDates) {
        if (completionDates == null || completionDates.isEmpty()) {
            return false;
        }
        
        LocalDate today = LocalDate.now();
        return completionDates.stream()
            .anyMatch(date -> date.equals(today));
    }
    
    @Override
    public Integer getCompletionCountForPeriod(List<LocalDate> completionDates, LocalDate startDate, LocalDate endDate) {
        if (completionDates == null || completionDates.isEmpty()) {
            return 0;
        }
        
        return (int) completionDates.stream()
            .filter(date -> !date.isBefore(startDate) && !date.isAfter(endDate))
            .count();
    }
}