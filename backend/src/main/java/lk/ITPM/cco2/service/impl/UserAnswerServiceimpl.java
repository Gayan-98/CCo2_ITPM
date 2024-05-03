package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.model.AdvanceQuiz;
import lk.ITPM.cco2.model.UserAnswer;
import lk.ITPM.cco2.repository.AdvanceQuizRepository;
import lk.ITPM.cco2.repository.UserAnswerRepository;
import lk.ITPM.cco2.service.AdvanceQuizService;
import lk.ITPM.cco2.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAnswerServiceimpl implements UserAnswerService {


    @Autowired
    private UserAnswerRepository userAnswerRepository;

    @Override
    public UserAnswer sendAnswer(UserAnswer answer) {
        CodeComplexityMetricsServiceImpl measure=new CodeComplexityMetricsServiceImpl();
        String quizAnswer=answer.getAnswer();
        int quizComplexity=measure.countLinesOfCode(quizAnswer);
        answer.setComplexity(quizComplexity);
        answer.setQuestionId("1");
        return userAnswerRepository.save(answer);
    }

//    @Override
//    public List<AdvanceQuiz> getAllQuizzes() {
//        return advanceQuizRepository.findAll();
//    }
//
    @Override
    public UserAnswer getAnswerById(String id) {
        return userAnswerRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found!"));
    }

//    @Override
//    public AdvanceQuiz updateQuiz(String id, AdvanceQuiz quizDetails) {
//        AdvanceQuiz quiz = getQuizById(id);
//        quiz.setQuestion(quizDetails.getQuestion());
//        quiz.setAnswer(quizDetails.getAnswer());
//        return advanceQuizRepository.save(quiz);
//    }
//
//    @Override
//    public void deleteQuiz(String id) {
//        advanceQuizRepository.deleteById(id);
//    }
}
