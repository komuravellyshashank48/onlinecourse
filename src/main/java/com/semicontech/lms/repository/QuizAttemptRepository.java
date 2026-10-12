package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Quiz;
import com.semicontech.lms.entity.QuizAttempt;
import com.semicontech.lms.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {
    List<QuizAttempt> findByStudentOrderBySubmittedAtDesc(User student);
    List<QuizAttempt> findByQuizOrderBySubmittedAtDesc(Quiz quiz);
    List<QuizAttempt> findByStudentAndQuizOrderBySubmittedAtDesc(User student, Quiz quiz);
    boolean existsByStudentAndQuizAndPassedTrue(User student, Quiz quiz);
}
