package com.semicontech.lms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(AbstractHttpConfigurer::disable) // Default handled by WebMvc or spring
            .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::disable)) // Allows H2 console
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // Static resources & Single Page Application
                .requestMatchers("/", "/index.html", "/css/**", "/js/**", "/images/**", "/favicon.ico").permitAll()
                // H2 Console
                .requestMatchers("/h2-console/**").permitAll()
                // Auth APIs
                .requestMatchers("/api/auth/**").permitAll()
                // Public Course browsing & certificate verification
                .requestMatchers(HttpMethod.GET, "/api/courses/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/categories").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/certificates/verify/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/reviews/course/**").permitAll()
                // Authenticated student actions on courses
                .requestMatchers(HttpMethod.POST, "/api/courses/*/enroll").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/courses/*/certificate/generate").authenticated()
                // Role-based Admin endpoints
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                // Role-based Instructor endpoints (Instructors & Admins)
                .requestMatchers("/api/instructor/**").hasAnyAuthority("ROLE_INSTRUCTOR", "ROLE_ADMIN")
                // Course & Lesson modification (Instructors & Admins)
                .requestMatchers(HttpMethod.POST, "/api/courses/**").hasAnyAuthority("ROLE_INSTRUCTOR", "ROLE_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/courses/**").hasAnyAuthority("ROLE_INSTRUCTOR", "ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/courses/**").hasAnyAuthority("ROLE_INSTRUCTOR", "ROLE_ADMIN")
                // All other endpoints require authentication
                .anyRequest().authenticated()
            );

        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
