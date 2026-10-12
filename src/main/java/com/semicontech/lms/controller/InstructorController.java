package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.dto.CourseDto;
import com.semicontech.lms.entity.Announcement;
import com.semicontech.lms.service.InstructorService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/instructor")
@PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
public class InstructorController {

    private final InstructorService instructorService;

    public InstructorController(InstructorService instructorService) {
        this.instructorService = instructorService;
    }

    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getInstructorCourses(
            @AuthenticationPrincipal String email) {
        List<CourseDto> courses = instructorService.getInstructorCourses(email);
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @GetMapping("/courses/{courseId}/students")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getEnrolledStudents(
            @PathVariable Long courseId) {
        List<Map<String, Object>> students = instructorService.getEnrolledStudentsForCourse(courseId);
        return ResponseEntity.ok(ApiResponse.success(students));
    }

    @PostMapping("/courses/{courseId}/announcements")
    public ResponseEntity<ApiResponse<Announcement>> createAnnouncement(
            @PathVariable Long courseId,
            @RequestBody Map<String, String> body,
            @AuthenticationPrincipal String email) {
        Announcement announcement = instructorService.createAnnouncement(courseId, email, body.get("title"), body.get("content"));
        return ResponseEntity.ok(ApiResponse.success("Announcement published successfully", announcement));
    }

    @GetMapping("/courses/{courseId}/announcements")
    public ResponseEntity<ApiResponse<List<Announcement>>> getAnnouncements(
            @PathVariable Long courseId) {
        List<Announcement> announcements = instructorService.getAnnouncements(courseId);
        return ResponseEntity.ok(ApiResponse.success(announcements));
    }
}
