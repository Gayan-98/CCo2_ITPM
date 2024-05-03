package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.dto.request.CodeComplexityMetricsDTO;
import lk.ITPM.cco2.model.CodeComplexityMetrics;
import lk.ITPM.cco2.repository.CodeComplexityMetricsRepository;
import lk.ITPM.cco2.service.CodeComplexityMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CodeComplexityMetricsServiceImpl implements CodeComplexityMetricsService {

    @Autowired
    private CodeComplexityMetricsRepository repository;

    @Override
    public void saveCodeComplexityMetrics(CodeComplexityMetricsDTO dto) {
        if (!StringUtils.hasText(dto.getCode())) {
            throw new IllegalArgumentException("Code is empty or null");
        }

        // Calculate code complexity metrics
        CodeComplexityMetrics metrics = new CodeComplexityMetrics();
        metrics.setUserId(dto.getUserId());
        metrics.setQuizId(dto.getQuizId());
        metrics.setCode(dto.getCode());
        metrics.setLinesOfCode(countLinesOfCode(dto.getCode()));
        metrics.setDuplicateCodeBlocks(findDuplicateCodeBlocks(dto.getCode()));
        metrics.setMaxNestingDepth(calculateMaxNestingDepth(dto.getCode()));
        metrics.setEstimatedTimeComplexity(estimateTimeComplexity(dto.getCode()));
        metrics.setEstimatedSpaceComplexity(estimateSpaceComplexity(dto.getCode()));
        metrics.setControlFlowComplexity(calculateControlFlowComplexity(dto.getCode()));

        // Save the metrics to the database
        repository.save(metrics);
    }

    public int countLinesOfCode(String code) {
        return (int) code.lines().filter(line -> !line.trim().isEmpty()).count();
    }

    public int findDuplicateCodeBlocks(String code) {
        String[] lines = code.split("\\r?\\n");
        int duplicateCount = 0;
        for (int i = 0; i < lines.length; i++) {
            for (int j = i + 1; j < lines.length; j++) {
                if (lines[i].trim().equals(lines[j].trim())) {
                    duplicateCount++;
                    break;
                }
            }
        }
        return duplicateCount;
    }

    public int calculateMaxNestingDepth(String code) {
        int currentDepth = 0, maxDepth = 0;
        for (char ch : code.toCharArray()) {
            if (ch == '{') {
                currentDepth++;
                maxDepth = Math.max(maxDepth, currentDepth);
            } else if (ch == '}') {
                currentDepth--;
            }
        }
        return maxDepth;
    }

    public String estimateTimeComplexity(String code) {
        // Estimation based on counting loops and conditionals
        int complexity = 1; // Default is O(1)
        // Count occurrences of common loops and conditionals
        int loopCount = countOccurrences(code, "\\bfor\\b|\\bwhile\\b");
        int ifCount = countOccurrences(code, "\\bif\\b");
        // Update complexity based on counts
        complexity += loopCount; // Each loop contributes O(n)
        complexity += ifCount;   // Each if statement contributes O(1)
        return "O(" + complexity + ")";
    }

    public int countOccurrences(String code, String pattern) {
        Pattern p = Pattern.compile(pattern);
        Matcher m = p.matcher(code);
        int count = 0;
        while (m.find()) {
            count++;
        }
        return count;
    }

    public String estimateSpaceComplexity(String code) {
        // Estimation based on counting variable declarations
        int varCount = countOccurrences(code, "\\bint\\b|\\bdouble\\b|\\bfloat\\b|\\bString\\b");
        return "O(" + varCount + ")";
    }

    public int calculateControlFlowComplexity(String code) {
        // Placeholder calculation
        int complexity = 1; // Base complexity for single path
        // You can enhance this by counting loops, conditionals, etc.
        return complexity;
    }
}
