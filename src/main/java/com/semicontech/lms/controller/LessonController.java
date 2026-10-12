package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.dto.LessonDto;
import com.semicontech.lms.entity.Lesson;
import com.semicontech.lms.service.LessonService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class LessonController {

    private final LessonService lessonService;

    public LessonController(LessonService lessonService) {
        this.lessonService = lessonService;
    }

    @GetMapping("/courses/{courseId}/lessons")
    public ResponseEntity<ApiResponse<List<LessonDto>>> getLessonsForCourse(
            @PathVariable Long courseId,
            @AuthenticationPrincipal String email) {
        List<LessonDto> lessons = lessonService.getLessonsForCourse(courseId, email);
        return ResponseEntity.ok(ApiResponse.success(lessons));
    }

    @GetMapping("/lessons/{id}")
    public ResponseEntity<ApiResponse<LessonDto>> getLessonById(
            @PathVariable Long id,
            @AuthenticationPrincipal String email) {
        LessonDto lesson = lessonService.getLessonById(id, email);
        return ResponseEntity.ok(ApiResponse.success(lesson));
    }

    @PostMapping("/courses/{courseId}/lessons")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<LessonDto>> createLesson(
            @PathVariable Long courseId,
            @RequestBody Lesson lesson) {
        LessonDto created = lessonService.createLesson(courseId, lesson);
        return ResponseEntity.ok(ApiResponse.success("Lesson created successfully", created));
    }

    @PutMapping("/lessons/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<LessonDto>> updateLesson(
            @PathVariable Long id,
            @RequestBody Lesson lesson) {
        LessonDto updated = lessonService.updateLesson(id, lesson);
        return ResponseEntity.ok(ApiResponse.success("Lesson updated successfully", updated));
    }

    @DeleteMapping("/lessons/{id}")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteLesson(@PathVariable Long id) {
        lessonService.deleteLesson(id);
        return ResponseEntity.ok(ApiResponse.success("Lesson deleted successfully", null));
    }
}
