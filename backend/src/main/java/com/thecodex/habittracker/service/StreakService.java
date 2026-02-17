package com.thecodex.habittracker.service;

import java.time.LocalDate;
import java.util.List;

public interface StreakService {
    Integer calculateCurrentStreak(List<LocalDate> completionDates);
    Integer calculateLongestStreak(List<LocalDate> completionDates);
    boolean isCompletedToday(List<LocalDate> completionDates);
    Integer getCompletionCountForPeriod(List<LocalDate> completionDates, LocalDate startDate, LocalDate endDate);
}