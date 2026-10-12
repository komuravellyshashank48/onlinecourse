package com.semicontech.lms.dto;

import java.util.Map;

public class QuizSubmissionDto {
    private Long quizId;
    // Map of questionId -> selectedOption (e.g. {1: "B", 2: "C"})
    private Map<Long, String> answers;

    public QuizSubmissionDto() {}

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public Map<Long, String> getAnswers() { return answers; }
    public void setAnswers(Map<Long, String> answers) { this.answers = answers; }
}
