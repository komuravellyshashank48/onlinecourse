package com.semicontech.lms.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lessons")
public class Lesson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String contentNotes;

    @Column(length = 500)
    private String videoUrl;

    @Column(length = 500)
    private String attachmentUrl;

    private Integer durationMinutes = 15;

    @Column(nullable = false)
    private Integer orderIndex = 1;

    private Boolean isPublished = true;

    private LocalDateTime createdAt = LocalDateTime.now();

    public Lesson() {}

    public Lesson(Course course, String title, String description, String contentNotes, 
                  String videoUrl, String attachmentUrl, Integer durationMinutes, Integer orderIndex) {
        this.course = course;
        this.title = title;
        this.description = description;
        this.contentNotes = contentNotes;
        this.videoUrl = videoUrl;
        this.attachmentUrl = attachmentUrl;
        this.durationMinutes = durationMinutes;
        this.orderIndex = orderIndex;
        this.isPublished = true;
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Course getCourse() { return course; }
    public void setCourse(Course course) { this.course = course; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getContentNotes() { return contentNotes; }
    public void setContentNotes(String contentNotes) { this.contentNotes = contentNotes; }

    public String getVideoUrl() { return videoUrl; }
    public void setVideoUrl(String videoUrl) { this.videoUrl = videoUrl; }

    public String getAttachmentUrl() { return attachmentUrl; }
    public void setAttachmentUrl(String attachmentUrl) { this.attachmentUrl = attachmentUrl; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

    public Integer getOrderIndex() { return orderIndex; }
    public void setOrderIndex(Integer orderIndex) { this.orderIndex = orderIndex; }

    public Boolean getIsPublished() { return isPublished; }
    public void setIsPublished(Boolean isPublished) { this.isPublished = isPublished; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
