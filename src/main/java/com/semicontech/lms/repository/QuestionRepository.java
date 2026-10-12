package com.semicontech.lms.repository;

import com.semicontech.lms.entity.Question;
import com.semicontech.lms.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizOrderByOrderIndexAsc(Quiz quiz);
}
