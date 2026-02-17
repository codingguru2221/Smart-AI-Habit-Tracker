package com.thecodex.habittracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitWithStatsDto {
    
    private Long id;
    private String name;
    private String description;
    private String category;
    private String frequency;
    private Integer targetCount;
    private Long userId;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Statistics
    private Long totalCompletions;
    private Integer currentStreak;
    private Integer longestStreak;
    private Double completionRate;
    private List<CompletionHistoryDto> recentCompletions;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CompletionHistoryDto {
        private Long id;
        private LocalDateTime completedAt;
        private String notes;
    }
}