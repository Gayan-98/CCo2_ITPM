package lk.ITPM.cco2.dto.request;

import lombok.Data;

@Data
public class CodeComplexityMetricsDTO {
    private String userId;
    private String quizId;
    private String code;
}