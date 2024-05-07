package lk.ITPM.cco2.dto.request;
import lombok.Data;

@Data
public class QuestionRequest {
    private String id;
    private String question;
    private String option1;
    private String option2;
    private String option3;
    private String option4;
    private String correctAnswer;
    private String keyWord;
}