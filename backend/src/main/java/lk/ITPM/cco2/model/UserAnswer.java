package lk.ITPM.cco2.model;



import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "user_advance_answer")
public class UserAnswer {

    @Id
    private String id;
    private String questionId;
    private String answer;

    private int complexity;
}
