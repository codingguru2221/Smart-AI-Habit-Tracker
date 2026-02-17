package com.thecodex.habittracker.service;

import com.thecodex.habittracker.dto.HabitDto;
import com.thecodex.habittracker.dto.HabitWithStatsDto;
import com.thecodex.habittracker.model.Habit;
import com.thecodex.habittracker.repository.HabitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HabitServiceImpl implements HabitService {
    
    @Autowired
    private HabitRepository habitRepository;
    
    @Autowired
    private HabitCompletionService habitCompletionService;
    
    @Override
    public Habit createHabit(HabitDto habitDto) {
        Habit habit = new Habit();
        habit.setName(habitDto.getName());
        habit.setDescription(habitDto.getDescription());
        habit.setCategory(habitDto.getCategory());
        habit.setFrequency(habitDto.getFrequency());
        habit.setTargetCount(habitDto.getTargetCount());
        habit.setUserId(habitDto.getUserId());
        habit.setActive(habitDto.getIsActive());
        return habitRepository.save(habit);
    }
    
    @Override
    public Habit updateHabit(Long id, HabitDto habitDto) {
        Habit existingHabit = habitRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Habit not found with id: " + id));
        
        existingHabit.setName(habitDto.getName());
        existingHabit.setDescription(habitDto.getDescription());
        existingHabit.setCategory(habitDto.getCategory());
        existingHabit.setFrequency(habitDto.getFrequency());
        existingHabit.setTargetCount(habitDto.getTargetCount());
        existingHabit.setActive(habitDto.getIsActive());
        
        return habitRepository.save(existingHabit);
    }
    
    @Override
    public void deleteHabit(Long id) {
        if (!habitRepository.existsById(id)) {
            throw new RuntimeException("Habit not found with id: " + id);
        }
        habitRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Habit getHabitById(Long id) {
        return habitRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Habit not found with id: " + id));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Habit> getAllHabits() {
        return habitRepository.findAll();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Habit> getHabitsByUserId(Long userId) {
        return habitRepository.findByUserId(userId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Habit> getActiveHabitsByUserId(Long userId) {
        return habitRepository.findByUserIdAndIsActiveTrue(userId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public HabitWithStatsDto getHabitWithStats(Long habitId) {
        Habit habit = getHabitById(habitId);
        HabitWithStatsDto dto = new HabitWithStatsDto();
        
        // Map habit properties
        dto.setId(habit.getId());
        dto.setName(habit.getName());
        dto.setDescription(habit.getDescription());
        dto.setCategory(habit.getCategory());
        dto.setFrequency(habit.getFrequency());
        dto.setTargetCount(habit.getTargetCount());
        dto.setUserId(habit.getUserId());
        dto.setIsActive(habit.getActive());
        dto.setCreatedAt(habit.getCreatedAt());
        dto.setUpdatedAt(habit.getUpdatedAt());
        
        // Add statistics
        dto.setTotalCompletions(habitCompletionService.getTotalCompletions(habitId));
        dto.setCurrentStreak(habitCompletionService.getCurrentStreak(habitId));
        dto.setLongestStreak(habitCompletionService.getLongestStreak(habitId));
        dto.setCompletionRate(habitCompletionService.getCompletionRate(habitId));
        dto.setRecentCompletions(
            habitCompletionService.getRecentCompletions(habitId, 10)
                .stream()
                .map(completion -> new HabitWithStatsDto.CompletionHistoryDto(
                    completion.getId(),
                    completion.getCompletedAt(),
                    completion.getNotes()
                ))
                .collect(Collectors.toList())
        );
        
        return dto;
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long getActiveHabitsCount(Long userId) {
        return habitRepository.countActiveHabitsByUserId(userId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return habitRepository.existsById(id);
    }
}