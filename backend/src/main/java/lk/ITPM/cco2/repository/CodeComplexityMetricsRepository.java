package lk.ITPM.cco2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import lk.ITPM.cco2.model.CodeComplexityMetrics;

@Repository
public interface CodeComplexityMetricsRepository extends MongoRepository<CodeComplexityMetrics, String> {
}
