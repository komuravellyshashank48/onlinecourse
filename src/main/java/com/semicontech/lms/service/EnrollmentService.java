package com.semicontech.lms.service;

import com.semicontech.lms.dto.DashboardStatsDto;
import com.semicontech.lms.entity.Certificate;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Enrollment;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.BadRequestException;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CertificateRepository;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.EnrollmentRepository;
import com.semicontech.lms.repository.LessonProgressRepository;
import com.semicontech.lms.repository.LessonRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final LessonRepository lessonRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final CertificateRepository certificateRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository,
                             CourseRepository courseRepository,
                             UserRepository userRepository,
                             LessonRepository lessonRepository,
                             LessonProgressRepository lessonProgressRepository,
                             CertificateRepository certificateRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.lessonRepository = lessonRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.certificateRepository = certificateRepository;
    }

    @Transactional
    public Enrollment enrollStudent(String studentEmail, Long courseId) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));

        if (enrollmentRepository.existsByStudentAndCourse(student, course)) {
            throw new BadRequestException("You are already enrolled in this course: " + course.getTitle());
        }

        Enrollment enrollment = new Enrollment(student, course);
        return enrollmentRepository.save(enrollment);
    }

    public boolean isEnrolled(String studentEmail, Long courseId) {
        User student = userRepository.findByEmail(studentEmail).orElse(null);
        if (student == null) return false;
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return false;
        return enrollmentRepository.existsByStudentAndCourse(student, course);
    }

    public List<DashboardStatsDto.EnrolledCourseSummary> getStudentEnrollments(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));

        List<Enrollment> enrollments = enrollmentRepository.findByStudentOrderByEnrolledAtDesc(student);

        return enrollments.stream().map(enrollment -> {
            Course course = enrollment.getCourse();
            DashboardStatsDto.EnrolledCourseSummary summary = new DashboardStatsDto.EnrolledCourseSummary();
            summary.setCourseId(course.getId());
            summary.setCourseTitle(course.getTitle());
            summary.setCategory(course.getCategory());
            summary.setThumbnailUrl(course.getThumbnailUrl());
            summary.setProgressPercentage(enrollment.getProgressPercentage());
            summary.setStatus(enrollment.getStatus());

            long totalLessons = lessonRepository.countByCourse(course);
            long completedLessons = lessonProgressRepository.countByStudentAndCourseAndCompletedTrue(student, course);
            summary.setTotalLessons(totalLessons);
            summary.setCompletedLessons(completedLessons);

            Optional<Certificate> cert = certificateRepository.findByStudentAndCourse(student, course);
            summary.setHasCertificate(cert.isPresent());
            cert.ifPresent(certificate -> summary.setCertificateCode(certificate.getCertificateCode()));

            return summary;
        }).collect(Collectors.toList());
    }

    @Transactional
    public void cancelEnrollment(String studentEmail, Long courseId) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));

        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new BadRequestException("Not enrolled in this course"));

        lessonProgressRepository.deleteByStudentAndCourse(student, course);
        enrollmentRepository.delete(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }
}
