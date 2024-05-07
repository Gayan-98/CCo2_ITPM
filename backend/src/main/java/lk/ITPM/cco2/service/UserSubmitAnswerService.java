package lk.ITPM.cco2.service;

import lk.ITPM.cco2.dto.request.UserSubmitAnswerRequest;

import java.util.List;
import java.util.Map;

public interface UserSubmitAnswerService {
    void create(UserSubmitAnswerRequest request, String questionId);

    List<Long> getCorrectAnswerCountByCategory(String name);

    Map<String, List<String>> getFalseAnswersKeywordsByCategory(String name);
}
