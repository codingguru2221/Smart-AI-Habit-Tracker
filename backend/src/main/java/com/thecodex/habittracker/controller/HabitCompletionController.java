package com.thecodex.habittracker.controller;

import com.thecodex.habittracker.dto.HabitCompletionDto;
import com.thecodex.habittracker.model.HabitCompletion;
import com.thecodex.habittracker.service.HabitCompletionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/completions")

public class HabitCompletionController {
    
    @Autowired
    private HabitCompletionService habitCompletionService;
    
    @PostMapping
    public ResponseEntity<HabitCompletion> createCompletion(@Valid @RequestBody HabitCompletionDto completionDto) {
        HabitCompletion createdCompletion = habitCompletionService.createCompletion(completionDto);
        return new ResponseEntity<>(createdCompletion, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<HabitCompletion> getCompletionById(@PathVariable Long id) {
        HabitCompletion completion = habitCompletionService.getCompletionById(id);
        return ResponseEntity.ok(completion);
    }
    
    @GetMapping("/habit/{habitId}")
    public ResponseEntity<List<HabitCompletion>> getCompletionsByHabitId(@PathVariable Long habitId) {
        List<HabitCompletion> completions = habitCompletionService.getCompletionsByHabitId(habitId);
        return ResponseEntity.ok(completions);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<HabitCompletion>> getCompletionsByUserId(@PathVariable Long userId) {
        List<HabitCompletion> completions = habitCompletionService.getCompletionsByUserId(userId);
        return ResponseEntity.ok(completions);
    }
    
    @GetMapping("/habit/{habitId}/recent")
    public ResponseEntity<List<HabitCompletion>> getRecentCompletions(@PathVariable Long habitId, 
                                                                    @RequestParam(defaultValue = "10") int limit) {
        List<HabitCompletion> completions = habitCompletionService.getRecentCompletions(habitId, limit);
        return ResponseEntity.ok(completions);
    }
    
    @GetMapping("/habit/{habitId}/range")
    public ResponseEntity<List<HabitCompletion>> getCompletionsByDateRange(@PathVariable Long habitId,
                                                                         @RequestParam String startDate,
                                                                         @RequestParam String endDate) {
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        List<HabitCompletion> completions = habitCompletionService.getCompletionsByHabitIdAndDateRange(habitId, start, end);
        return ResponseEntity.ok(completions);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCompletion(@PathVariable Long id) {
        habitCompletionService.deleteCompletion(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/habit/{habitId}/stats")
    public ResponseEntity<CompletionStatsDto> getCompletionStats(@PathVariable Long habitId) {
        Long totalCompletions = habitCompletionService.getTotalCompletions(habitId);
        Integer currentStreak = habitCompletionService.getCurrentStreak(habitId);
        Integer longestStreak = habitCompletionService.getLongestStreak(habitId);
        Double completionRate = habitCompletionService.getCompletionRate(habitId);
        
        CompletionStatsDto stats = new CompletionStatsDto(totalCompletions, currentStreak, longestStreak, completionRate);
        return ResponseEntity.ok(stats);
    }
    
    // DTO for completion statistics
    public static class CompletionStatsDto {
        private Long totalCompletions;
        private Integer currentStreak;
        private Integer longestStreak;
        private Double completionRate;
        
        public CompletionStatsDto(Long totalCompletions, Integer currentStreak, Integer longestStreak, Double completionRate) {
            this.totalCompletions = totalCompletions;
            this.currentStreak = currentStreak;
            this.longestStreak = longestStreak;
            this.completionRate = completionRate;
        }
        
        // Getters
        public Long getTotalCompletions() { return totalCompletions; }
        public Integer getCurrentStreak() { return currentStreak; }
        public Integer getLongestStreak() { return longestStreak; }
        public Double getCompletionRate() { return completionRate; }
        
        // Setters
        public void setTotalCompletions(Long totalCompletions) { this.totalCompletions = totalCompletions; }
        public void setCurrentStreak(Integer currentStreak) { this.currentStreak = currentStreak; }
        public void setLongestStreak(Integer longestStreak) { this.longestStreak = longestStreak; }
        public void setCompletionRate(Double completionRate) { this.completionRate = completionRate; }
    }
}