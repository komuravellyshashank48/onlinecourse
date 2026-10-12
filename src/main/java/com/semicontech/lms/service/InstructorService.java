package com.semicontech.lms.service;

import com.semicontech.lms.dto.CourseDto;
import com.semicontech.lms.entity.Announcement;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Enrollment;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.AnnouncementRepository;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.EnrollmentRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class InstructorService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final AnnouncementRepository announcementRepository;
    private final CourseService courseService;

    public InstructorService(CourseRepository courseRepository,
                             UserRepository userRepository,
                             EnrollmentRepository enrollmentRepository,
                             AnnouncementRepository announcementRepository,
                             CourseService courseService) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.announcementRepository = announcementRepository;
        this.courseService = courseService;
    }

    public List<CourseDto> getInstructorCourses(String instructorEmail) {
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found: " + instructorEmail));
        return courseRepository.findByInstructor(instructor).stream()
                .map(courseService::mapToDto)
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getEnrolledStudentsForCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        List<Enrollment> enrollments = enrollmentRepository.findByCourseOrderByEnrolledAtDesc(course);

        return enrollments.stream().map(e -> {
            Map<String, Object> map = new HashMap<>();
            map.put("enrollmentId", e.getId());
            map.put("studentId", e.getStudent().getId());
            map.put("studentName", e.getStudent().getName());
            map.put("studentEmail", e.getStudent().getEmail());
            map.put("progressPercentage", e.getProgressPercentage());
            map.put("status", e.getStatus());
            map.put("enrolledAt", e.getEnrolledAt());
            map.put("completedAt", e.getCompletedAt());
            return map;
        }).collect(Collectors.toList());
    }

    @Transactional
    public Announcement createAnnouncement(Long courseId, String instructorEmail, String title, String content) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found: " + instructorEmail));
        Announcement announcement = new Announcement(course, instructor, title, content);
        return announcementRepository.save(announcement);
    }

    public List<Announcement> getAnnouncements(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        return announcementRepository.findByCourseOrderByCreatedAtDesc(course);
    }
}
