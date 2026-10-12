package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Enrollment;
import com.semicontech.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<User> findStudentByCourse(Course course);
    List<Enrollment> findByStudentOrderByEnrolledAtDesc(User student);
    List<Enrollment> findByCourseOrderByEnrolledAtDesc(Course course);
    Optional<Enrollment> findByStudentAndCourse(User student, Course course);
    boolean existsByStudentAndCourse(User student, Course course);
    long countByCourse(Course course);
    long countByStudentAndStatus(User student, String status);
}
