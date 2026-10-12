package com.semicontech.lms.service;

import com.semicontech.lms.dto.CourseDto;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.EnrollmentRepository;
import com.semicontech.lms.repository.LessonRepository;
import com.semicontech.lms.repository.ReviewRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final LessonRepository lessonRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;

    public CourseService(CourseRepository courseRepository,
                         LessonRepository lessonRepository,
                         EnrollmentRepository enrollmentRepository,
                         ReviewRepository reviewRepository,
                         UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.lessonRepository = lessonRepository;
        this.enrollmentRepository = enrollmentRepository;
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
    }

    public List<CourseDto> getAllPublishedCourses(String category, String search) {
        List<Course> courses;
        if (search != null && !search.trim().isEmpty()) {
            courses = courseRepository.searchCourses(search.trim());
        } else if (category != null && !category.trim().isEmpty() && !category.equalsIgnoreCase("All")) {
            courses = courseRepository.findByCategoryAndStatus(category.trim(), "PUBLISHED");
        } else {
            courses = courseRepository.findByStatus("PUBLISHED");
        }
        return courses.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    public List<CourseDto> getAllCoursesAdmin() {
        return courseRepository.findAll().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public CourseDto getCourseById(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
        return mapToDto(course);
    }

    public Course getCourseEntity(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found with id: " + id));
    }

    public List<String> getCategories() {
        return courseRepository.findDistinctCategories();
    }

    @Transactional
    public CourseDto createCourse(Course course, String instructorEmail) {
        User instructor = userRepository.findByEmail(instructorEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Instructor not found: " + instructorEmail));
        course.setInstructor(instructor);
        Course saved = courseRepository.save(course);
        return mapToDto(saved);
    }

    @Transactional
    public CourseDto updateCourse(Long id, Course details) {
        Course course = getCourseEntity(id);
        course.setTitle(details.getTitle());
        course.setDescription(details.getDescription());
        course.setCategory(details.getCategory());
        course.setLevel(details.getLevel());
        course.setDuration(details.getDuration());
        course.setPrerequisites(details.getPrerequisites());
        course.setSyllabus(details.getSyllabus());
        course.setPrice(details.getPrice());
        course.setStatus(details.getStatus());
        if (details.getThumbnailUrl() != null) {
            course.setThumbnailUrl(details.getThumbnailUrl());
        }
        Course saved = courseRepository.save(course);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = getCourseEntity(id);
        courseRepository.delete(course);
    }

    @Transactional
    public CourseDto toggleCourseStatus(Long id) {
        Course course = getCourseEntity(id);
        course.setStatus("PUBLISHED".equals(course.getStatus()) ? "DRAFT" : "PUBLISHED");
        Course saved = courseRepository.save(course);
        return mapToDto(saved);
    }

    public CourseDto mapToDto(Course course) {
        CourseDto dto = new CourseDto();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setCategory(course.getCategory());
        dto.setLevel(course.getLevel());
        dto.setDuration(course.getDuration());
        dto.setPrerequisites(course.getPrerequisites());
        dto.setSyllabus(course.getSyllabus());
        dto.setThumbnailUrl(course.getThumbnailUrl());
        dto.setPrice(course.getPrice());
        dto.setStatus(course.getStatus());
        dto.setCreatedAt(course.getCreatedAt());

        if (course.getInstructor() != null) {
            dto.setInstructorId(course.getInstructor().getId());
            dto.setInstructorName(course.getInstructor().getName());
            dto.setInstructorTitle(course.getInstructor().getTitle());
        }

        dto.setTotalLessons(lessonRepository.countByCourse(course));
        dto.setTotalStudents(enrollmentRepository.countByCourse(course));
        Double avgRating = reviewRepository.getAverageRatingForCourse(course);
        dto.setAverageRating(avgRating != null ? Math.round(avgRating * 10.0) / 10.0 : 4.8);

        return dto;
    }
}
