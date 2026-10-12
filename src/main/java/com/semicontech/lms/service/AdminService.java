package com.semicontech.lms.service;

import com.semicontech.lms.dto.AdminStatsDto;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.BadRequestException;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.EnrollmentRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    public AdminService(UserRepository userRepository,
                        CourseRepository courseRepository,
                        EnrollmentRepository enrollmentRepository) {
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
        this.enrollmentRepository = enrollmentRepository;
    }

    public AdminStatsDto getAdminStats() {
        AdminStatsDto stats = new AdminStatsDto();
        stats.setTotalStudents(userRepository.countByRole("ROLE_STUDENT"));
        stats.setTotalInstructors(userRepository.countByRole("ROLE_INSTRUCTOR"));
        stats.setTotalCourses(courseRepository.count());
        stats.setTotalEnrollments(enrollmentRepository.count());
        stats.setPublishedCourses(courseRepository.countByStatus("PUBLISHED"));
        stats.setDraftCourses(courseRepository.countByStatus("DRAFT"));
        stats.setAveragePlatformRating(4.9);
        stats.setRecentActivities(Arrays.asList(
                "New student Rahul registered to the platform",
                "New course 'SystemVerilog and Functional Verification' created",
                "Student completed 'Java Programming' with 100% progress",
                "Dr. Vikram Raman published 4 new RTL design lessons",
                "Certificate STA-2026-CERT-94812 verified successfully"
        ));
        return stats;
    }

    public List<User> getAllUsers(String role, String search) {
        if (search != null && !search.trim().isEmpty()) {
            return userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(search.trim(), search.trim());
        }
        if (role != null && !role.trim().isEmpty() && !role.equalsIgnoreCase("ALL")) {
            return userRepository.findByRole(role.trim());
        }
        return userRepository.findAll();
    }

    @Transactional
    public User toggleUserStatus(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        user.setStatus("ACTIVE".equalsIgnoreCase(user.getStatus()) ? "INACTIVE" : "ACTIVE");
        return userRepository.save(user);
    }

    @Transactional
    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        if ("ROLE_ADMIN".equals(user.getRole())) {
            throw new BadRequestException("Primary Administrator account cannot be deleted");
        }
        userRepository.delete(user);
    }
}
