package com.semicontech.lms.dto;

import java.util.List;

public class QuizResultDto {
    private Long attemptId;
    private Long quizId;
    private String quizTitle;
    private int score;
    private int totalQuestions;
    private int percentage;
    private boolean passed;
    private int passingScore;
    private List<QuestionFeedback> feedbackList;

    public static class QuestionFeedback {
        private Long questionId;
        private String questionText;
        private String selectedOption;
        private String correctOption;
        private boolean isCorrect;
        private String explanation;

        public QuestionFeedback() {}

        public QuestionFeedback(Long questionId, String questionText, String selectedOption, 
                                String correctOption, boolean isCorrect, String explanation) {
            this.questionId = questionId;
            this.questionText = questionText;
            this.selectedOption = selectedOption;
            this.correctOption = correctOption;
            this.isCorrect = isCorrect;
            this.explanation = explanation;
        }

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }

        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }

        public String getSelectedOption() { return selectedOption; }
        public void setSelectedOption(String selectedOption) { this.selectedOption = selectedOption; }

        public String getCorrectOption() { return correctOption; }
        public void setCorrectOption(String correctOption) { this.correctOption = correctOption; }

        public boolean isCorrect() { return isCorrect; }
        public void setCorrect(boolean correct) { isCorrect = correct; }

        public String getExplanation() { return explanation; }
        public void setExplanation(String explanation) { this.explanation = explanation; }
    }

    public QuizResultDto() {}

    public Long getAttemptId() { return attemptId; }
    public void setAttemptId(Long attemptId) { this.attemptId = attemptId; }

    public Long getQuizId() { return quizId; }
    public void setQuizId(Long quizId) { this.quizId = quizId; }

    public String getQuizTitle() { return quizTitle; }
    public void setQuizTitle(String quizTitle) { this.quizTitle = quizTitle; }

    public int getScore() { return score; }
    public void setScore(int score) { this.score = score; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getPercentage() { return percentage; }
    public void setPercentage(int percentage) { this.percentage = percentage; }

    public boolean isPassed() { return passed; }
    public void setPassed(boolean passed) { this.passed = passed; }

    public int getPassingScore() { return passingScore; }
    public void setPassingScore(int passingScore) { this.passingScore = passingScore; }

    public List<QuestionFeedback> getFeedbackList() { return feedbackList; }
    public void setFeedbackList(List<QuestionFeedback> feedbackList) { this.feedbackList = feedbackList; }
}
