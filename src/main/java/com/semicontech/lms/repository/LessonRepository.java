package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    List<Lesson> findByCourseOrderByOrderIndexAsc(Course course);
    List<Lesson> findByCourseAndIsPublishedTrueOrderByOrderIndexAsc(Course course);
    long countByCourse(Course course);
}
