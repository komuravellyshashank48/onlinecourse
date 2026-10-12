package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Announcement;
import com.semicontech.lms.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByCourseOrderByCreatedAtDesc(Course course);
}
