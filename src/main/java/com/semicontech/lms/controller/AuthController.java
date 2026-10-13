package com.semicontech.lms.controller;

import com.semicontech.lms.dto.ApiResponse;
import com.semicontech.lms.dto.AuthRequest;
import com.semicontech.lms.dto.AuthResponse;
import com.semicontech.lms.dto.RegisterRequest;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful", response));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<User>> getCurrentUser(@AuthenticationPrincipal String email) {
        User user = authService.getCurrentUser(email);
        return ResponseEntity.ok(ApiResponse.success(user));
    }

    @PutMapping("/profile")
    public ResponseEntity<ApiResponse<User>> updateProfile(@AuthenticationPrincipal String email,
                                                           @RequestBody Map<String, String> body) {
        User updated = authService.updateProfile(email, body.get("name"), body.get("title"), body.get("bio"), body.get("avatarUrl"));
        return ResponseEntity.ok(ApiResponse.success("Profile updated successfully", updated));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<String>> resetPassword(@AuthenticationPrincipal String email,
                                                             @RequestBody Map<String, String> body) {
        authService.resetPassword(email, body.get("newPassword"));
        return ResponseEntity.ok(ApiResponse.success("Password updated successfully", "OK"));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getRegisteredUsers() {
        List<Map<String, Object>> users = authService.getPublicUserDirectory();
        return ResponseEntity.ok(ApiResponse.success(users));
    }
}
