package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.dto.QuizResultDto;
import com.semicontech.lms.dto.QuizSubmissionDto;
import com.semicontech.lms.entity.Question;
import com.semicontech.lms.entity.Quiz;
import com.semicontech.lms.entity.QuizAttempt;
import com.semicontech.lms.service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @GetMapping("/courses/{courseId}/quizzes")
    public ResponseEntity<ApiResponse<List<Quiz>>> getQuizzesForCourse(@PathVariable Long courseId) {
        List<Quiz> quizzes = quizService.getQuizzesForCourse(courseId);
        return ResponseEntity.ok(ApiResponse.success(quizzes));
    }

    @GetMapping("/quizzes/{id}")
    public ResponseEntity<ApiResponse<Quiz>> getQuizById(@PathVariable Long id) {
        Quiz quiz = quizService.getQuizById(id);
        return ResponseEntity.ok(ApiResponse.success(quiz));
    }

    @GetMapping("/quizzes/{id}/questions")
    public ResponseEntity<ApiResponse<List<Question>>> getQuestionsForQuiz(@PathVariable Long id) {
        List<Question> questions = quizService.getQuestionsForQuiz(id);
        return ResponseEntity.ok(ApiResponse.success(questions));
    }

    @PostMapping("/quizzes/{id}/submit")
    public ResponseEntity<ApiResponse<QuizResultDto>> submitQuiz(
            @PathVariable Long id,
            @RequestBody QuizSubmissionDto submission,
            @AuthenticationPrincipal String email) {
        QuizResultDto result = quizService.submitQuiz(id, email, submission);
        return ResponseEntity.ok(ApiResponse.success("Quiz submitted successfully", result));
    }

    @GetMapping("/quizzes/my-attempts")
    public ResponseEntity<ApiResponse<List<QuizAttempt>>> getMyAttempts(
            @AuthenticationPrincipal String email) {
        List<QuizAttempt> attempts = quizService.getStudentAttempts(email);
        return ResponseEntity.ok(ApiResponse.success(attempts));
    }

    @PostMapping("/courses/{courseId}/quizzes")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Quiz>> createQuiz(
            @PathVariable Long courseId,
            @RequestBody Quiz quiz) {
        Quiz created = quizService.createQuiz(courseId, quiz);
        return ResponseEntity.ok(ApiResponse.success("Quiz created successfully", created));
    }

    @PostMapping("/quizzes/{quizId}/questions")
    @PreAuthorize("hasAnyAuthority('ROLE_INSTRUCTOR', 'ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Question>> addQuestion(
            @PathVariable Long quizId,
            @RequestBody Question question) {
        Question created = quizService.addQuestion(quizId, question);
        return ResponseEntity.ok(ApiResponse.success("Question added successfully", created));
    }
}
