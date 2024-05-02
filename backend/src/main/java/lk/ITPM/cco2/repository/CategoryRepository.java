package lk.ITPM.cco2.repository;

import lk.ITPM.cco2.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category,String> {
}
