package com.semicontech.lms.dto;

import java.util.List;

public class DashboardStatsDto {
    private long enrolledCourses;
    private long inProgressCourses;
    private long completedCourses;
    private int overallProgress;
    private List<EnrolledCourseSummary> myLearning;
    private List<RecentActivityDto> recentActivities;

    public static class EnrolledCourseSummary {
        private Long courseId;
        private String courseTitle;
        private String category;
        private String thumbnailUrl;
        private int progressPercentage;
        private long completedLessons;
        private long totalLessons;
        private String status;
        private boolean hasCertificate;
        private String certificateCode;

        public EnrolledCourseSummary() {}

        public Long getCourseId() { return courseId; }
        public void setCourseId(Long courseId) { this.courseId = courseId; }

        public String getCourseTitle() { return courseTitle; }
        public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

        public String getCategory() { return category; }
        public void setCategory(String category) { this.category = category; }

        public String getThumbnailUrl() { return thumbnailUrl; }
        public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }

        public int getProgressPercentage() { return progressPercentage; }
        public void setProgressPercentage(int progressPercentage) { this.progressPercentage = progressPercentage; }

        public long getCompletedLessons() { return completedLessons; }
        public void setCompletedLessons(long completedLessons) { this.completedLessons = completedLessons; }

        public long getTotalLessons() { return totalLessons; }
        public void setTotalLessons(long totalLessons) { this.totalLessons = totalLessons; }

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }

        public boolean isHasCertificate() { return hasCertificate; }
        public void setHasCertificate(boolean hasCertificate) { this.hasCertificate = hasCertificate; }

        public String getCertificateCode() { return certificateCode; }
        public void setCertificateCode(String certificateCode) { this.certificateCode = certificateCode; }
    }

    public static class RecentActivityDto {
        private String description;
        private String timeAgo;
        private String type; // LESSON, QUIZ, ENROLLMENT, CERTIFICATE

        public RecentActivityDto() {}

        public RecentActivityDto(String description, String timeAgo, String type) {
            this.description = description;
            this.timeAgo = timeAgo;
            this.type = type;
        }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public String getTimeAgo() { return timeAgo; }
        public void setTimeAgo(String timeAgo) { this.timeAgo = timeAgo; }

        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
    }

    public DashboardStatsDto() {}

    public long getEnrolledCourses() { return enrolledCourses; }
    public void setEnrolledCourses(long enrolledCourses) { this.enrolledCourses = enrolledCourses; }

    public long getInProgressCourses() { return inProgressCourses; }
    public void setInProgressCourses(long inProgressCourses) { this.inProgressCourses = inProgressCourses; }

    public long getCompletedCourses() { return completedCourses; }
    public void setCompletedCourses(long completedCourses) { this.completedCourses = completedCourses; }

    public int getOverallProgress() { return overallProgress; }
    public void setOverallProgress(int overallProgress) { this.overallProgress = overallProgress; }

    public List<EnrolledCourseSummary> getMyLearning() { return myLearning; }
    public void setMyLearning(List<EnrolledCourseSummary> myLearning) { this.myLearning = myLearning; }

    public List<RecentActivityDto> getRecentActivities() { return recentActivities; }
    public void setRecentActivities(List<RecentActivityDto> recentActivities) { this.recentActivities = recentActivities; }
}
