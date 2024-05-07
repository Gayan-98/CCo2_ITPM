package lk.ITPM.cco2.dto.request;

import lombok.Data;

@Data
public class UserSubmitAnswerRequest {
    private String id;
    private String name;
    private String submitAnswer;
    private String userId;
    private Boolean answerStatus;
}
