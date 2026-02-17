package com.thecodex.habittracker.repository;

import com.thecodex.habittracker.model.HabitCompletion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface HabitCompletionRepository extends JpaRepository<HabitCompletion, Long> {
    List<HabitCompletion> findByHabitId(Long habitId);
    List<HabitCompletion> findByHabitIdOrderByCompletedAtDesc(Long habitId);
    List<HabitCompletion> findByUserId(Long userId);
    List<HabitCompletion> findByUserIdAndHabitId(Long userId, Long habitId);
    
    @Query("SELECT hc FROM HabitCompletion hc WHERE hc.habitId = :habitId AND hc.completedAt >= :startDate AND hc.completedAt <= :endDate ORDER BY hc.completedAt DESC")
    List<HabitCompletion> findByHabitIdAndDateRange(@Param("habitId") Long habitId, 
                                                   @Param("startDate") LocalDateTime startDate, 
                                                   @Param("endDate") LocalDateTime endDate);
    
    @Query("SELECT COUNT(hc) FROM HabitCompletion hc WHERE hc.habitId = :habitId")
    Long countByHabitId(@Param("habitId") Long habitId);
    
    @Query("SELECT COUNT(hc) FROM HabitCompletion hc WHERE hc.habitId = :habitId AND hc.completedAt >= :startDate")
    Long countByHabitIdAndDateAfter(@Param("habitId") Long habitId, @Param("startDate") LocalDateTime startDate);
}