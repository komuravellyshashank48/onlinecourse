package com.semicontech.lms.service;

import com.semicontech.lms.dto.LessonDto;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Lesson;
import com.semicontech.lms.entity.LessonProgress;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.LessonProgressRepository;
import com.semicontech.lms.repository.LessonRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final LessonProgressRepository lessonProgressRepository;
    private final UserRepository userRepository;

    public LessonService(LessonRepository lessonRepository,
                         CourseRepository courseRepository,
                         LessonProgressRepository lessonProgressRepository,
                         UserRepository userRepository) {
        this.lessonRepository = lessonRepository;
        this.courseRepository = courseRepository;
        this.lessonProgressRepository = lessonProgressRepository;
        this.userRepository = userRepository;
    }

    public List<LessonDto> getLessonsForCourse(Long courseId, String studentEmail) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));

        User student = (studentEmail != null) ? userRepository.findByEmail(studentEmail).orElse(null) : null;
        List<Lesson> lessons = lessonRepository.findByCourseAndIsPublishedTrueOrderByOrderIndexAsc(course);

        return lessons.stream().map(lesson -> {
            LessonDto dto = mapToDto(lesson);
            if (student != null) {
                Optional<LessonProgress> progress = lessonProgressRepository.findByStudentAndLesson(student, lesson);
                dto.setIsCompleted(progress.isPresent() && Boolean.TRUE.equals(progress.get().getCompleted()));
                if (progress.isPresent()) {
                    dto.setCompletedAt(progress.get().getCompletedAt());
                }
            } else {
                dto.setIsCompleted(false);
            }
            return dto;
        }).collect(Collectors.toList());
    }

    public LessonDto getLessonById(Long lessonId, String studentEmail) {
        Lesson lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found: " + lessonId));

        LessonDto dto = mapToDto(lesson);
        if (studentEmail != null) {
            userRepository.findByEmail(studentEmail).ifPresent(student -> {
                Optional<LessonProgress> progress = lessonProgressRepository.findByStudentAndLesson(student, lesson);
                dto.setIsCompleted(progress.isPresent() && Boolean.TRUE.equals(progress.get().getCompleted()));
                if (progress.isPresent()) {
                    dto.setCompletedAt(progress.get().getCompletedAt());
                }
            });
        }
        return dto;
    }

    @Transactional
    public LessonDto createLesson(Long courseId, Lesson lesson) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        lesson.setCourse(course);
        if (lesson.getOrderIndex() == null) {
            lesson.setOrderIndex((int) lessonRepository.countByCourse(course) + 1);
        }
        Lesson saved = lessonRepository.save(lesson);
        return mapToDto(saved);
    }

    @Transactional
    public LessonDto updateLesson(Long id, Lesson details) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found: " + id));

        lesson.setTitle(details.getTitle());
        lesson.setDescription(details.getDescription());
        lesson.setContentNotes(details.getContentNotes());
        lesson.setVideoUrl(details.getVideoUrl());
        lesson.setAttachmentUrl(details.getAttachmentUrl());
        lesson.setDurationMinutes(details.getDurationMinutes());
        if (details.getOrderIndex() != null) lesson.setOrderIndex(details.getOrderIndex());
        if (details.getIsPublished() != null) lesson.setIsPublished(details.getIsPublished());

        Lesson saved = lessonRepository.save(lesson);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteLesson(Long id) {
        Lesson lesson = lessonRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Lesson not found: " + id));
        lessonRepository.delete(lesson);
    }

    private LessonDto mapToDto(Lesson lesson) {
        LessonDto dto = new LessonDto();
        dto.setId(lesson.getId());
        dto.setCourseId(lesson.getCourse().getId());
        dto.setTitle(lesson.getTitle());
        dto.setDescription(lesson.getDescription());
        dto.setContentNotes(lesson.getContentNotes());
        dto.setVideoUrl(lesson.getVideoUrl());
        dto.setAttachmentUrl(lesson.getAttachmentUrl());
        dto.setDurationMinutes(lesson.getDurationMinutes());
        dto.setOrderIndex(lesson.getOrderIndex());
        dto.setIsPublished(lesson.getIsPublished());
        return dto;
    }
}
