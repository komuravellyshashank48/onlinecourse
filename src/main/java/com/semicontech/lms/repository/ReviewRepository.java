package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByCourseOrderByCreatedAtDesc(Course course);

    @Query("SELECT AVG(r.rating) FROM Review r WHERE r.course = :course")
    Double getAverageRatingForCourse(@Param("course") Course course);
}
