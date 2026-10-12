package com.semicontech.lms.dto;

import java.util.List;

public class AdminStatsDto {
    private long totalStudents;
    private long totalInstructors;
    private long totalCourses;
    private long totalEnrollments;
    private long publishedCourses;
    private long draftCourses;
    private double averagePlatformRating;
    private List<String> recentActivities;

    public AdminStatsDto() {}

    public long getTotalStudents() { return totalStudents; }
    public void setTotalStudents(long totalStudents) { this.totalStudents = totalStudents; }

    public long getTotalInstructors() { return totalInstructors; }
    public void setTotalInstructors(long totalInstructors) { this.totalInstructors = totalInstructors; }

    public long getTotalCourses() { return totalCourses; }
    public void setTotalCourses(long totalCourses) { this.totalCourses = totalCourses; }

    public long getTotalEnrollments() { return totalEnrollments; }
    public void setTotalEnrollments(long totalEnrollments) { this.totalEnrollments = totalEnrollments; }

    public long getPublishedCourses() { return publishedCourses; }
    public void setPublishedCourses(long publishedCourses) { this.publishedCourses = publishedCourses; }

    public long getDraftCourses() { return draftCourses; }
    public void setDraftCourses(long draftCourses) { this.draftCourses = draftCourses; }

    public double getAveragePlatformRating() { return averagePlatformRating; }
    public void setAveragePlatformRating(double averagePlatformRating) { this.averagePlatformRating = averagePlatformRating; }

    public List<String> getRecentActivities() { return recentActivities; }
    public void setRecentActivities(List<String> recentActivities) { this.recentActivities = recentActivities; }
}
