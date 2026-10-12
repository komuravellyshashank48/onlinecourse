package com.semicontech.lms.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class CourseDto {
    private Long id;
    private String title;
    private String description;
    private String category;
    private String level;
    private String duration;
    private String prerequisites;
    private String syllabus;
    private String thumbnailUrl;
    private BigDecimal price;
    private String status;
    private Long instructorId;
    private String instructorName;
    private String instructorTitle;
    private long totalLessons;
    private long totalStudents;
    private Double averageRating;
    private LocalDateTime createdAt;

    public CourseDto() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getPrerequisites() { return prerequisites; }
    public void setPrerequisites(String prerequisites) { this.prerequisites = prerequisites; }

    public String getSyllabus() { return syllabus; }
    public void setSyllabus(String syllabus) { this.syllabus = syllabus; }

    public String getThumbnailUrl() { return thumbnailUrl; }
    public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getInstructorId() { return instructorId; }
    public void setInstructorId(Long instructorId) { this.instructorId = instructorId; }

    public String getInstructorName() { return instructorName; }
    public void setInstructorName(String instructorName) { this.instructorName = instructorName; }

    public String getInstructorTitle() { return instructorTitle; }
    public void setInstructorTitle(String instructorTitle) { this.instructorTitle = instructorTitle; }

    public long getTotalLessons() { return totalLessons; }
    public void setTotalLessons(long totalLessons) { this.totalLessons = totalLessons; }

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public Double getAverageRating() { return averageRating; }
    public void setAverageRating(Double averageRating) { this.averageRating = averageRating; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
