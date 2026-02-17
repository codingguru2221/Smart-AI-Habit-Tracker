package com.thecodex.habittracker.repository;

import com.thecodex.habittracker.model.Habit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HabitRepository extends JpaRepository<Habit, Long> {
    List<Habit> findByUserId(Long userId);
    List<Habit> findByUserIdAndIsActiveTrue(Long userId);
    List<Habit> findByUserIdAndCategoryAndIsActiveTrue(Long userId, String category);
    
    @Query("SELECT h FROM Habit h WHERE h.userId = :userId AND h.isActive = true ORDER BY h.createdAt DESC")
    List<Habit> findActiveHabitsByUserIdOrderByCreatedAtDesc(@Param("userId") Long userId);
    
    @Query("SELECT COUNT(h) FROM Habit h WHERE h.userId = :userId AND h.isActive = true")
    Long countActiveHabitsByUserId(@Param("userId") Long userId);
}