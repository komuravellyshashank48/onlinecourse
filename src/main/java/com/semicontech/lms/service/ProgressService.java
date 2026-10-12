package com.semicontech.lms.service;

import com.semicontech.lms.dto.DashboardStatsDto;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Enrollment;
import com.semicontech.lms.entity.Lesson;
import com.semicontech.lms.entity.LessonProgress;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.BadRequestException;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.EnrollmentRepository;
import com.semicontech.lms.repository.LessonProgressRepository;
import com.semicontech.lms.repository.LessonRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProgressService {

    private final LessonProgressRepository progressRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final EnrollmentService enrollmentService;

    public ProgressService(LessonProgressRepository progressRepository,
                           EnrollmentRepository enrollmentRepository,
                           LessonRepository lessonRepository,
                           CourseRepository courseRepository,
                           UserRepository userRepository,
                           EnrollmentService enrollmentService) {
        this.progressRepository = progressRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.enrollmentService = enrollmentService;
    }

    @Transactional
    public int markLessonCompleted(String studentEmail, Long lessonId) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found: " + lessonId));
        Course course = lesson.getCourse();

        // Check enrollment
        Enrollment enrollment = enrollmentRepository.findByStudentAndCourse(student, course)
                .orElseThrow(() -> new BadRequestException("You must be enrolled in the course to complete lessons"));

        Optional<LessonProgress> existing = progressRepository.findByStudentAndLesson(student, lesson);
        if (existing.isEmpty()) {
            LessonProgress progress = new LessonProgress(student, course, lesson);
            progressRepository.save(progress);
        }

        // Recalculate progress percentage
        long totalLessons = lessonRepository.countByCourse(course);
        long completedLessons = progressRepository.countByStudentAndCourseAndCompletedTrue(student, course);

        int percentage = totalLessons > 0 ? (int) Math.round(((double) completedLessons / totalLessons) * 100.0) : 100;
        if (percentage > 100) percentage = 100;

        enrollment.setProgressPercentage(percentage);
        if (percentage >= 100) {
            enrollment.setStatus("COMPLETED");
            if (enrollment.getCompletedAt() == null) {
                enrollment.setCompletedAt(LocalDateTime.now());
            }
        }
        enrollmentRepository.save(enrollment);

        return percentage;
    }

    public DashboardStatsDto getStudentDashboardStats(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));

        List<DashboardStatsDto.EnrolledCourseSummary> myLearning = enrollmentService.getStudentEnrollments(studentEmail);

        long enrolledCount = myLearning.size();
        long completedCount = myLearning.stream().filter(c -> c.getProgressPercentage() >= 100).count();
        long inProgressCount = enrolledCount - completedCount;

        int totalProgressSum = myLearning.stream().mapToInt(DashboardStatsDto.EnrolledCourseSummary::getProgressPercentage).sum();
        int overallProgress = enrolledCount > 0 ? totalProgressSum / (int) enrolledCount : 0;

        List<DashboardStatsDto.RecentActivityDto> activities = new ArrayList<>();
        if (!myLearning.isEmpty()) {
            activities.add(new DashboardStatsDto.RecentActivityDto("Studied lesson in " + myLearning.get(0).getCourseTitle(), "10 mins ago", "LESSON"));
            if (completedCount > 0) {
                activities.add(new DashboardStatsDto.RecentActivityDto("Earned certificate in " + myLearning.get(0).getCourseTitle(), "Yesterday", "CERTIFICATE"));
            }
            activities.add(new DashboardStatsDto.RecentActivityDto("Completed quiz assessment with Distinction", "2 days ago", "QUIZ"));
        } else {
            activities.add(new DashboardStatsDto.RecentActivityDto("Welcome to SemiconTech! Browse courses and enroll.", "Just now", "SYSTEM"));
        }

        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setEnrolledCourses(enrolledCount);
        stats.setInProgressCourses(inProgressCount);
        stats.setCompletedCourses(completedCount);
        stats.setOverallProgress(overallProgress);
        stats.setMyLearning(myLearning);
        stats.setRecentActivities(activities);

        return stats;
    }
}
