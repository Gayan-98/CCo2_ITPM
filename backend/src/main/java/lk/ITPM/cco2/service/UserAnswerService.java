package lk.ITPM.cco2.service;



import lk.ITPM.cco2.model.AdvanceQuiz;
import lk.ITPM.cco2.model.UserAnswer;

import java.util.List;

public interface UserAnswerService {
    UserAnswer sendAnswer(UserAnswer answer);
//    List<AdvanceQuiz> getAllQuizzes();
      UserAnswer getAnswerById(String id);
//    AdvanceQuiz updateQuiz(String id, AdvanceQuiz quiz);
//    void deleteQuiz(String id);
}
