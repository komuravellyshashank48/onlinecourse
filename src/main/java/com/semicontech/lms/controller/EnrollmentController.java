package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.dto.DashboardStatsDto;
import com.semicontech.lms.entity.Enrollment;
import com.semicontech.lms.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @PostMapping("/courses/{courseId}/enroll")
    public ResponseEntity<ApiResponse<Enrollment>> enrollInCourse(
            @PathVariable Long courseId,
            @AuthenticationPrincipal String email) {
        Enrollment enrollment = enrollmentService.enrollStudent(email, courseId);
        return ResponseEntity.ok(ApiResponse.success("Successfully enrolled in course!", enrollment));
    }

    @GetMapping("/courses/{courseId}/is-enrolled")
    public ResponseEntity<ApiResponse<Boolean>> checkIsEnrolled(
            @PathVariable Long courseId,
            @AuthenticationPrincipal String email) {
        boolean enrolled = enrollmentService.isEnrolled(email, courseId);
        return ResponseEntity.ok(ApiResponse.success(enrolled));
    }

    @GetMapping("/enrollments/my")
    public ResponseEntity<ApiResponse<List<DashboardStatsDto.EnrolledCourseSummary>>> getMyEnrollments(
            @AuthenticationPrincipal String email) {
        List<DashboardStatsDto.EnrolledCourseSummary> enrollments = enrollmentService.getStudentEnrollments(email);
        return ResponseEntity.ok(ApiResponse.success(enrollments));
    }

    @DeleteMapping("/enrollments/{courseId}")
    public ResponseEntity<ApiResponse<Void>> cancelEnrollment(
            @PathVariable Long courseId,
            @AuthenticationPrincipal String email) {
        enrollmentService.cancelEnrollment(email, courseId);
        return ResponseEntity.ok(ApiResponse.success("Course enrollment cancelled", null));
    }

    @GetMapping("/admin/enrollments")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<Enrollment>>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(ApiResponse.success(enrollments));
    }
}
