package com.semicontech.lms.service;

import com.semicontech.lms.config.JwtTokenProvider;
import com.semicontech.lms.dto.AuthRequest;
import com.semicontech.lms.dto.AuthResponse;
import com.semicontech.lms.dto.RegisterRequest;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.BadRequestException;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByEmail(request.getEmail().trim().toLowerCase())
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadRequestException("Invalid email or password");
        }

        if ("INACTIVE".equalsIgnoreCase(user.getStatus())) {
            throw new BadRequestException("Your account has been deactivated. Please contact administrator.");
        }

        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole(), user.getId());
        return new AuthResponse(token, user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getTitle(), user.getAvatarUrl());
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String email = request.getEmail().trim().toLowerCase();
        if (userRepository.existsByEmail(email)) {
            throw new BadRequestException("An account with email " + email + " already exists");
        }

        String role = "ROLE_STUDENT";
        if (request.getRole() != null && (request.getRole().equalsIgnoreCase("ROLE_INSTRUCTOR") || request.getRole().equalsIgnoreCase("INSTRUCTOR"))) {
            role = "ROLE_INSTRUCTOR";
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(role);
        user.setStatus("ACTIVE");
        user.setTitle(request.getTitle() != null ? request.getTitle() : (role.equals("ROLE_INSTRUCTOR") ? "Technical Instructor" : "Student / Learner"));
        user.setBio(request.getBio());
        user.setAvatarUrl("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150");

        User saved = userRepository.save(user);
        String token = jwtTokenProvider.generateToken(saved.getEmail(), saved.getRole(), saved.getId());
        return new AuthResponse(token, saved.getId(), saved.getName(), saved.getEmail(), saved.getRole(), saved.getTitle(), saved.getAvatarUrl());
    }

    public User getCurrentUser(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @Transactional
    public User updateProfile(String email, String name, String title, String bio, String avatarUrl) {
        User user = getCurrentUser(email);
        if (name != null && !name.trim().isEmpty()) user.setName(name.trim());
        if (title != null) user.setTitle(title.trim());
        if (bio != null) user.setBio(bio.trim());
        if (avatarUrl != null) user.setAvatarUrl(avatarUrl.trim());
        return userRepository.save(user);
    }

    @Transactional
    public void resetPassword(String email, String newPassword) {
        User user = getCurrentUser(email);
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
