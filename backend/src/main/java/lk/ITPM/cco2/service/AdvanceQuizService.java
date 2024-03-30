package lk.ITPM.cco2.service;



import lk.ITPM.cco2.model.AdvanceQuiz;

import java.util.List;

public interface AdvanceQuizService {
    AdvanceQuiz createQuiz(AdvanceQuiz quiz);
    List<AdvanceQuiz> getAllQuizzes();
    AdvanceQuiz getQuizById(String id);
    AdvanceQuiz updateQuiz(String id, AdvanceQuiz quiz);
    void deleteQuiz(String id);
}
