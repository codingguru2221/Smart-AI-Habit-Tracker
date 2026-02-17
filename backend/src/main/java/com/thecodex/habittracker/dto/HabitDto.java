package com.thecodex.habittracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HabitDto {
    
    private Long id;
    
    @NotBlank(message = "Habit name is required")
    private String name;
    
    private String description;
    
    private String category;
    
    @NotBlank(message = "Frequency is required")
    private String frequency; // DAILY, WEEKLY, CUSTOM
    
    private Integer targetCount = 1;
    
    private Long userId;
    
    private Boolean isActive = true;
}