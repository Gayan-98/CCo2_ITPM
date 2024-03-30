package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.model.AdvanceQuiz;
import lk.ITPM.cco2.repository.AdvanceQuizRepository;
import lk.ITPM.cco2.service.AdvanceQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvanceQuizServiceImpl implements AdvanceQuizService {

    @Autowired
    private AdvanceQuizRepository advanceQuizRepository;

    @Override
    public AdvanceQuiz createQuiz(AdvanceQuiz quiz) {
        CodeComplexityMetricsServiceImpl measure=new CodeComplexityMetricsServiceImpl();
        String quizAnswer=quiz.getAnswer();
        int quizComplexity=measure.calculateCodeComplexity(quizAnswer);
        quiz.setComplexity(quizComplexity);
        return advanceQuizRepository.save(quiz);
    }

    @Override
    public List<AdvanceQuiz> getAllQuizzes() {
        return advanceQuizRepository.findAll();
    }

    @Override
    public AdvanceQuiz getQuizById(String id) {
        return advanceQuizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found!"));
    }

    @Override
    public AdvanceQuiz updateQuiz(String id, AdvanceQuiz quizDetails) {
        AdvanceQuiz quiz = getQuizById(id);
        quiz.setQuestion(quizDetails.getQuestion());
        quiz.setAnswer(quizDetails.getAnswer());
        return advanceQuizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(String id) {
        advanceQuizRepository.deleteById(id);
    }
}
