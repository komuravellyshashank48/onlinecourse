package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Certificate;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CertificateRepository extends JpaRepository<Certificate, Long> {
    Optional<Certificate> findByCertificateCode(String certificateCode);
    Optional<Certificate> findByStudentAndCourse(User student, Course course);
    List<Certificate> findByStudentOrderByIssueDateDesc(User student);
    boolean existsByStudentAndCourse(User student, Course course);
}
