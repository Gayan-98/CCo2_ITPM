package lk.ITPM.cco2.model;



import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@Document(collection = "advance_quizzes")
public class AdvanceQuiz {

    @Id
    private String id;
    private String question;
    private String answer;

    private int linesOfCode;
    private int duplicateCodeBlocks;
    private int maxNestingDepth;
    private String estimatedTimeComplexity;
    private String estimatedSpaceComplexity;
    private int controlFlowComplexity;


}
