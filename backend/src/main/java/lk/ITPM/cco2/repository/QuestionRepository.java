package lk.ITPM.cco2.repository;

import lk.ITPM.cco2.model.Category;
import lk.ITPM.cco2.model.Question;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;


public interface QuestionRepository extends MongoRepository<Question, String> {
    List<Question> findByCategory(Category category);

    List<Question> findByCategory_Category(String category);
}
