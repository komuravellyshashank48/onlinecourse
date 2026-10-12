package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.dto.DashboardStatsDto;
import com.semicontech.lms.service.ProgressService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PostMapping("/lessons/{lessonId}/complete")
    public ResponseEntity<ApiResponse<Integer>> completeLesson(
            @PathVariable Long lessonId,
            @AuthenticationPrincipal String email) {
        int progress = progressService.markLessonCompleted(email, lessonId);
        return ResponseEntity.ok(ApiResponse.success("Lesson marked as completed! Course progress: " + progress + "%", progress));
    }

    @GetMapping("/student/dashboard-stats")
    public ResponseEntity<ApiResponse<DashboardStatsDto>> getStudentDashboardStats(
            @AuthenticationPrincipal String email) {
        DashboardStatsDto stats = progressService.getStudentDashboardStats(email);
        return ResponseEntity.ok(ApiResponse.success(stats));
    }
}
