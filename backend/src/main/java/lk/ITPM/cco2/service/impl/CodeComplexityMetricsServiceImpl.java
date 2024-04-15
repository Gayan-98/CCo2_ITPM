package lk.ITPM.cco2.service.impl;

import com.github.javaparser.JavaParser;
import com.github.javaparser.ParseResult;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.stmt.ForEachStmt;
import com.github.javaparser.ast.stmt.ForStmt;
import com.github.javaparser.ast.stmt.IfStmt;
import com.github.javaparser.ast.visitor.VoidVisitorAdapter;
import lk.ITPM.cco2.dto.request.CodeComplexityMetricsDTO;
import lk.ITPM.cco2.repository.CodeComplexityMetricsRepository;
import lk.ITPM.cco2.service.CodeComplexityMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import lk.ITPM.cco2.model.CodeComplexityMetrics;

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
        int complexityValue = calculateCodeComplexity(dto.getCode());

        // Create a new CodeComplexityMetrics object
        CodeComplexityMetrics metrics = new CodeComplexityMetrics();
        metrics.setUserId(dto.getUserId());
        metrics.setQuizId(dto.getQuizId());
        metrics.setComplexityValue(complexityValue);

        // Save the metrics to the database
        repository.save(metrics);
    }

    public int calculateCodeComplexity(String code) {
        JavaParser javaParser = new JavaParser();
        ParseResult<CompilationUnit> parseResult = javaParser.parse(code);

        // Check if parsing was successful
        if (parseResult.isSuccessful()) {
            CompilationUnit compilationUnit = parseResult.getResult().orElseThrow(() -> new IllegalArgumentException("Parsing failed"));

            // Visitor to traverse the AST (Abstract Syntax Tree) and calculate cyclomatic complexity
            CyclomaticComplexityVisitor visitor = new CyclomaticComplexityVisitor();
            compilationUnit.accept(visitor, null);

            return visitor.getCyclomaticComplexity();
        } else {
            // Handle parsing failure
            throw new IllegalArgumentException("Parsing failed");
        }
    }


    // Visitor class to traverse the AST and calculate cyclomatic complexity
    public class CyclomaticComplexityVisitor extends VoidVisitorAdapter<Void> {
        private int cyclomaticComplexity = 1; // Default complexity is 1 for the entry point

        @Override
        public void visit(IfStmt n, Void arg) {
            cyclomaticComplexity++; // Increment complexity for each if statement
            super.visit(n, arg);
        }

        @Override
        public void visit(ForStmt n, Void arg) {
            cyclomaticComplexity++; // Increment complexity for each for loop
            super.visit(n, arg);
        }

        @Override
        public void visit(ForEachStmt n, Void arg) {
            cyclomaticComplexity++; // Increment complexity for each foreach loop
            super.visit(n, arg);
        }

        // Implement similar methods for other control flow structures such as while loops, switch statements, etc.

        public int getCyclomaticComplexity() {
            return cyclomaticComplexity;
        }
    }
}
