package com.thecodex.habittracker.service;

import com.thecodex.habittracker.dto.HabitDto;
import com.thecodex.habittracker.dto.HabitWithStatsDto;
import com.thecodex.habittracker.model.Habit;
import java.util.List;

public interface HabitService {
    Habit createHabit(HabitDto habitDto);
    Habit updateHabit(Long id, HabitDto habitDto);
    void deleteHabit(Long id);
    Habit getHabitById(Long id);
    List<Habit> getAllHabits();
    List<Habit> getHabitsByUserId(Long userId);
    List<Habit> getActiveHabitsByUserId(Long userId);
    HabitWithStatsDto getHabitWithStats(Long habitId);
    Long getActiveHabitsCount(Long userId);
    boolean existsById(Long id);
}