package lk.ITPM.cco2.service;

import lk.ITPM.cco2.dto.request.QuestionRequest;
import lk.ITPM.cco2.dto.response.QuestionResponse;

import java.util.List;

public interface QuestionService {
    QuestionResponse create(QuestionRequest request, String categoryId);

    List<QuestionResponse> getCategoryQuestion(String category);

    QuestionResponse getQuestionById(String questionId);

    QuestionResponse update(QuestionRequest request, String questionId);

    void delete(String questionId);

    List<QuestionResponse> getRandomQuestionsPerCategory();
}
