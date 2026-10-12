package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Review;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.BadRequestException;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.ReviewRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewRepository reviewRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public ReviewController(ReviewRepository reviewRepository,
                            CourseRepository courseRepository,
                            UserRepository userRepository) {
        this.reviewRepository = reviewRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    @GetMapping("/reviews/course/{courseId}")
    public ResponseEntity<ApiResponse<List<Review>>> getReviewsForCourse(@PathVariable Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        return ResponseEntity.ok(ApiResponse.success(reviewRepository.findByCourseOrderByCreatedAtDesc(course)));
    }

    @PostMapping("/reviews/course/{courseId}")
    public ResponseEntity<ApiResponse<Review>> addReview(
            @PathVariable Long courseId,
            @RequestBody Map<String, Object> body,
            @AuthenticationPrincipal String email) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        User student = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + email));

        int rating = (body.get("rating") != null) ? Integer.parseInt(body.get("rating").toString()) : 5;
        if (rating < 1 || rating > 5) throw new BadRequestException("Rating must be between 1 and 5");
        String comment = (String) body.get("comment");

        Review review = new Review(student, course, rating, comment);
        Review saved = reviewRepository.save(review);
        return ResponseEntity.ok(ApiResponse.success("Review posted successfully", saved));
    }

    @DeleteMapping("/admin/reviews/{id}")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteReview(@PathVariable Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found: " + id));
        reviewRepository.delete(review);
        return ResponseEntity.ok(ApiResponse.success("Review removed", null));
    }
}
