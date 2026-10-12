package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByStatus(String status);
    List<Course> findByCategoryAndStatus(String category, String status);
    List<Course> findByInstructor(User instructor);

    @Query("SELECT c FROM Course c WHERE c.status = 'PUBLISHED' AND " +
           "(LOWER(c.title) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(c.category) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    List<Course> searchCourses(@Param("keyword") String keyword);

    @Query("SELECT DISTINCT c.category FROM Course c WHERE c.status = 'PUBLISHED'")
    List<String> findDistinctCategories();

    long countByStatus(String status);
}
