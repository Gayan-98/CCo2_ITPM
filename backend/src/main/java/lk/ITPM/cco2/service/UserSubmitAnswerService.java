package lk.ITPM.cco2.service;

import lk.ITPM.cco2.dto.request.UserSubmitAnswerRequest;

public interface UserSubmitAnswerService {
    void create(UserSubmitAnswerRequest request, String questionId);

}
