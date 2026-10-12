package com.semicontech.lms.service;

import com.semicontech.lms.dto.QuizResultDto;
import com.semicontech.lms.dto.QuizSubmissionDto;
import com.semicontech.lms.entity.Course;
import com.semicontech.lms.entity.Question;
import com.semicontech.lms.entity.Quiz;
import com.semicontech.lms.entity.QuizAttempt;
import com.semicontech.lms.entity.User;
import com.semicontech.lms.exception.ResourceNotFoundException;
import com.semicontech.lms.repository.CourseRepository;
import com.semicontech.lms.repository.QuestionRepository;
import com.semicontech.lms.repository.QuizAttemptRepository;
import com.semicontech.lms.repository.QuizRepository;
import com.semicontech.lms.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final QuizAttemptRepository attemptRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    public QuizService(QuizRepository quizRepository,
                       QuestionRepository questionRepository,
                       QuizAttemptRepository attemptRepository,
                       CourseRepository courseRepository,
                       UserRepository userRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.attemptRepository = attemptRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public List<Quiz> getQuizzesForCourse(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        return quizRepository.findByCourse(course);
    }

    public Quiz getQuizById(Long quizId) {
        return quizRepository.findById(quizId)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found: " + quizId));
    }

    public List<Question> getQuestionsForQuiz(Long quizId) {
        Quiz quiz = getQuizById(quizId);
        return questionRepository.findByQuizOrderByOrderIndexAsc(quiz);
    }

    @Transactional
    public QuizResultDto submitQuiz(Long quizId, String studentEmail, QuizSubmissionDto submission) {
        Quiz quiz = getQuizById(quizId);
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));

        List<Question> questions = questionRepository.findByQuizOrderByOrderIndexAsc(quiz);
        Map<Long, String> answers = submission.getAnswers();

        int correctCount = 0;
        List<QuizResultDto.QuestionFeedback> feedbackList = new ArrayList<>();

        for (Question q : questions) {
            String selected = (answers != null && answers.containsKey(q.getId())) ? answers.get(q.getId()).trim().toUpperCase() : "";
            boolean isCorrect = q.getCorrectOption().trim().equalsIgnoreCase(selected);
            if (isCorrect) correctCount++;

            feedbackList.add(new QuizResultDto.QuestionFeedback(
                    q.getId(),
                    q.getQuestionText(),
                    selected,
                    q.getCorrectOption(),
                    isCorrect,
                    q.getExplanation()
            ));
        }

        int total = questions.size();
        int percentage = total > 0 ? (int) Math.round(((double) correctCount / total) * 100.0) : 100;
        boolean passed = percentage >= quiz.getPassingScore();

        QuizAttempt attempt = new QuizAttempt(student, quiz, correctCount, total, percentage, passed);
        QuizAttempt savedAttempt = attemptRepository.save(attempt);

        QuizResultDto result = new QuizResultDto();
        result.setAttemptId(savedAttempt.getId());
        result.setQuizId(quiz.getId());
        result.setQuizTitle(quiz.getTitle());
        result.setScore(correctCount);
        result.setTotalQuestions(total);
        result.setPercentage(percentage);
        result.setPassed(passed);
        result.setPassingScore(quiz.getPassingScore());
        result.setFeedbackList(feedbackList);

        return result;
    }

    @Transactional
    public Quiz createQuiz(Long courseId, Quiz quiz) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new ResourceNotFoundException("Course not found: " + courseId));
        quiz.setCourse(course);
        return quizRepository.save(quiz);
    }

    @Transactional
    public Question addQuestion(Long quizId, Question question) {
        Quiz quiz = getQuizById(quizId);
        question.setQuiz(quiz);
        return questionRepository.save(question);
    }

    public List<QuizAttempt> getStudentAttempts(String studentEmail) {
        User student = userRepository.findByEmail(studentEmail)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found: " + studentEmail));
        return attemptRepository.findByStudentOrderBySubmittedAtDesc(student);
    }
}
