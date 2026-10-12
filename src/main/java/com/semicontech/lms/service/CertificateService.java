package com.semicontech.lms.service;

import com.semicontech.lms.entity.Certificate;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Enrollment;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.BadRequestException;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CertificateRepository;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.EnrollmentRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CertificateService {

    private final CertificateRepository certificateRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public CertificateService(CertificateRepository certificateRepository,
                              EnrollmentRepository enrollmentRepository,
                              CourseRepository courseRepository,
                              UserRepository userRepository) {
        this.certificateRepository = certificateRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Certificate generateCertificate(String studentEmail, Long courseId) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));

        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new BadRequestException("You are not enrolled in this course"));

        if (enrollment.getProgressPercentage() < 100) {
            throw new BadRequestException("Course completion requirements not met. Progress is " +
                    enrollment.getProgressPercentage() + "%. Complete all lessons and quizzes to earn your certificate.");
        }

        Optional<Certificate> existing = certificateRepository.findByStudentAndCourse(student, course);
        if (existing.isPresent()) {
            return existing.get();
        }

        String code = "STA-" + LocalDateTime.now().getYear() + "-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        Certificate certificate = new Certificate(code, student, course, "Distinction with Honors");
        return certificateRepository.save(certificate);
    }

    public Certificate verifyCertificate(String certificateCode) {
        return certificateRepository.findByCertificateCode(certificateCode.trim().toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Certificate not found or invalid: " + certificateCode));
    }

    public List<Certificate> getStudentCertificates(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));
        return certificateRepository.findByStudentOrderByIssueDateDesc(student);
    }
}
