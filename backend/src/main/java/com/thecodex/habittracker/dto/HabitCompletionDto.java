package com.thecodex.habittracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitCompletionDto {
    
    private Long id;
    
    @NotNull(message = "Habit ID is required")
    private Long habitId;
    
    private LocalDateTime completedAt;
    
    private String notes;
    
    private Long userId;
}