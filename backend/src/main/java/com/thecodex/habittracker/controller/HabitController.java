package com.thecodex.habittracker.controller;

import com.thecodex.habittracker.dto.HabitDto;
import com.thecodex.habittracker.dto.HabitWithStatsDto;
import com.thecodex.habittracker.model.Habit;
import com.thecodex.habittracker.service.HabitService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/habits")

public class HabitController {
    
    @Autowired
    private HabitService habitService;
    
    @PostMapping
    public ResponseEntity<Habit> createHabit(@Valid @RequestBody HabitDto habitDto) {
        Habit createdHabit = habitService.createHabit(habitDto);
        return new ResponseEntity<>(createdHabit, HttpStatus.CREATED);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Habit> getHabitById(@PathVariable Long id) {
        Habit habit = habitService.getHabitById(id);
        return ResponseEntity.ok(habit);
    }
    
    @GetMapping("/{id}/with-stats")
    public ResponseEntity<HabitWithStatsDto> getHabitWithStats(@PathVariable Long id) {
        HabitWithStatsDto habitWithStats = habitService.getHabitWithStats(id);
        return ResponseEntity.ok(habitWithStats);
    }
    
    @GetMapping
    public ResponseEntity<List<Habit>> getAllHabits() {
        List<Habit> habits = habitService.getAllHabits();
        return ResponseEntity.ok(habits);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Habit>> getHabitsByUserId(@PathVariable Long userId) {
        List<Habit> habits = habitService.getHabitsByUserId(userId);
        return ResponseEntity.ok(habits);
    }
    
    @GetMapping("/user/{userId}/active")
    public ResponseEntity<List<Habit>> getActiveHabitsByUserId(@PathVariable Long userId) {
        List<Habit> habits = habitService.getActiveHabitsByUserId(userId);
        return ResponseEntity.ok(habits);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Habit> updateHabit(@PathVariable Long id, @Valid @RequestBody HabitDto habitDto) {
        Habit updatedHabit = habitService.updateHabit(id, habitDto);
        return ResponseEntity.ok(updatedHabit);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHabit(@PathVariable Long id) {
        habitService.deleteHabit(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/user/{userId}/count")
    public ResponseEntity<Long> getActiveHabitsCount(@PathVariable Long userId) {
        Long count = habitService.getActiveHabitsCount(userId);
        return ResponseEntity.ok(count);
    }
}