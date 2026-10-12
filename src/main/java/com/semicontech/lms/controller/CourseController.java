package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.dto.CourseDto;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/courses")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getAllCourses(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search) {
        List<CourseDto> courses = courseService.getAllPublishedCourses(category, search);
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @GetMapping("/admin/courses/all")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<List<CourseDto>>> getAllCoursesAdmin() {
        List<CourseDto> courses = courseService.getAllCoursesAdmin();
        return ResponseEntity.ok(ApiResponse.success(courses));
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<ApiResponse<CourseDto>> getCourseById(@PathVariable Long id) {
        CourseDto course = courseService.getCourseById(id);
        return ResponseEntity.ok(ApiResponse.success(course));
    }

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<String>>> getCategories() {
        List<String> categories = courseService.getCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @PostMapping("/courses")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CourseDto>> createCourse(
            @RequestBody Course course,
            @AuthenticationPrincipal String email) {
        CourseDto created = courseService.createCourse(course, email);
        return ResponseEntity.ok(ApiResponse.success("Course created successfully", created));
    }

    @PutMapping("/courses/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CourseDto>> updateCourse(
            @PathVariable Long id,
            @RequestBody Course course) {
        CourseDto updated = courseService.updateCourse(id, course);
        return ResponseEntity.ok(ApiResponse.success("Course updated successfully", updated));
    }

    @DeleteMapping("/courses/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteCourse(@PathVariable Long id) {
        courseService.deleteCourse(id);
        return ResponseEntity.ok(ApiResponse.success("Course deleted successfully", null));
    }

    @PatchMapping("/courses/{id}/toggle-status")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<CourseDto>> toggleCourseStatus(@PathVariable Long id) {
        CourseDto updated = courseService.toggleCourseStatus(id);
        return ResponseEntity.ok(ApiResponse.success("Course status updated", updated));
    }
}
