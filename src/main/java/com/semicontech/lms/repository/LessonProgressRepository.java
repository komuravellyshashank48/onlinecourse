package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Lesson;
import com.semicontech.lms.entity.LessonProgress;
import com.semicontech.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonProgressRepository extends JpaRepository<LessonProgress, Long> {
    List<LessonProgress> findByStudentAndCourse(User student, Course course);
    Optional<LessonProgress> findByStudentAndLesson(User student, Lesson lesson);
    boolean existsByStudentAndLessonAndCompletedTrue(User student, Lesson lesson);
    long countByStudentAndCourseAndCompletedTrue(User student, Course course);
    void deleteByStudentAndCourse(User student, Course course);
}
