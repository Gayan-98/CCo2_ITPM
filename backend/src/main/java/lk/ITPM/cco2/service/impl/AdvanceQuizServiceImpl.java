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

        quiz.setLinesOfCode(measure.countLinesOfCode(quiz.getAnswer()));
        quiz.setDuplicateCodeBlocks(measure.findDuplicateCodeBlocks(quiz.getAnswer()));
        quiz.setMaxNestingDepth(measure.calculateMaxNestingDepth(quiz.getAnswer()));
        quiz.setEstimatedTimeComplexity(measure.estimateTimeComplexity(quiz.getAnswer()));
        quiz.setEstimatedSpaceComplexity(measure.estimateSpaceComplexity(quiz.getAnswer()));
        quiz.setControlFlowComplexity(measure.calculateControlFlowComplexity(quiz.getAnswer()));


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
