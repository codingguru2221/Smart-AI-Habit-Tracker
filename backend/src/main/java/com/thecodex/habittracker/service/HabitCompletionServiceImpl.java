package com.thecodex.habittracker.service;

import com.thecodex.habittracker.dto.HabitCompletionDto;
import com.thecodex.habittracker.model.HabitCompletion;
import com.thecodex.habittracker.repository.HabitCompletionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class HabitCompletionServiceImpl implements HabitCompletionService {
    
    @Autowired
    private HabitCompletionRepository habitCompletionRepository;
    
    @Override
    public HabitCompletion createCompletion(HabitCompletionDto completionDto) {
        HabitCompletion completion = new HabitCompletion();
        completion.setHabitId(completionDto.getHabitId());
        completion.setCompletedAt(completionDto.getCompletedAt() != null ? 
            completionDto.getCompletedAt() : LocalDateTime.now());
        completion.setNotes(completionDto.getNotes());
        completion.setUserId(completionDto.getUserId());
        return habitCompletionRepository.save(completion);
    }
    
    @Override
    public void deleteCompletion(Long id) {
        if (!habitCompletionRepository.existsById(id)) {
            throw new RuntimeException("Completion not found with id: " + id);
        }
        habitCompletionRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public HabitCompletion getCompletionById(Long id) {
        return habitCompletionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Completion not found with id: " + id));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<HabitCompletion> getCompletionsByHabitId(Long habitId) {
        return habitCompletionRepository.findByHabitId(habitId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<HabitCompletion> getCompletionsByUserId(Long userId) {
        return habitCompletionRepository.findByUserId(userId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<HabitCompletion> getCompletionsByHabitIdAndDateRange(Long habitId, LocalDateTime startDate, LocalDateTime endDate) {
        return habitCompletionRepository.findByHabitIdAndDateRange(habitId, startDate, endDate);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<HabitCompletion> getRecentCompletions(Long habitId, int limit) {
        List<HabitCompletion> completions = habitCompletionRepository.findByHabitIdOrderByCompletedAtDesc(habitId);
        return completions.stream().limit(limit).collect(Collectors.toList());
    }
    
    @Override
    @Transactional(readOnly = true)
    public Long getTotalCompletions(Long habitId) {
        return habitCompletionRepository.countByHabitId(habitId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Integer getCurrentStreak(Long habitId) {
        List<HabitCompletion> completions = getCompletionsByHabitId(habitId);
        return calculateStreak(completions, true);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Integer getLongestStreak(Long habitId) {
        List<HabitCompletion> completions = getCompletionsByHabitId(habitId);
        return calculateStreak(completions, false);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Double getCompletionRate(Long habitId) {
        Long totalCompletions = getTotalCompletions(habitId);
        if (totalCompletions == 0) {
            return 0.0;
        }
        
        // Calculate days since habit creation (simplified)
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        Long recentCompletions = habitCompletionRepository.countByHabitIdAndDateAfter(habitId, thirtyDaysAgo);
        
        return (double) recentCompletions / 30 * 100;
    }
    
    @Override
    @Transactional(readOnly = true)
    public boolean existsById(Long id) {
        return habitCompletionRepository.existsById(id);
    }
    
    private Integer calculateStreak(List<HabitCompletion> completions, boolean currentStreak) {
        if (completions.isEmpty()) {
            return 0;
        }
        
        // Sort by completion date descending
        List<LocalDate> completionDates = completions.stream()
            .map(completion -> completion.getCompletedAt().toLocalDate())
            .distinct()
            .sorted()
            .collect(Collectors.toList());
        
        if (completionDates.isEmpty()) {
            return 0;
        }
        
        int streak = 0;
        LocalDate today = LocalDate.now();
        LocalDate currentDate = currentStreak ? today : completionDates.get(completionDates.size() - 1);
        
        // Check consecutive days backwards
        for (int i = completionDates.size() - 1; i >= 0; i--) {
            LocalDate completionDate = completionDates.get(i);
            
            if (ChronoUnit.DAYS.between(completionDate, currentDate) == 0) {
                streak++;
                currentDate = currentDate.minusDays(1);
            } else if (ChronoUnit.DAYS.between(completionDate, currentDate) > 1) {
                // Break in streak
                break;
            } else {
                // Skip duplicate dates or continue
                currentDate = completionDate.minusDays(1);
            }
        }
        
        return streak;
    }
}