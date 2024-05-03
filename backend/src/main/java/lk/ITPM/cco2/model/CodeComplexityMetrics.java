package lk.ITPM.cco2.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "code_complexity_metrics")
public class CodeComplexityMetrics {
    @Id
    private String id;
    private String userId;
    private String quizId;
    private String code;

    private int linesOfCode;
    private int duplicateCodeBlocks;
    private int maxNestingDepth;
    private String estimatedTimeComplexity;
    private String estimatedSpaceComplexity;
    private int controlFlowComplexity;
}
