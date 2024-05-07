package lk.ITPM.cco2.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user_submit_answers")
public class UserSubmitAnswer {
    private String id;
    private String name;
    private String  submitAnswer;
    private Boolean answerStatus;
    private String userId;
    private Question question;
    private Category category;
}
