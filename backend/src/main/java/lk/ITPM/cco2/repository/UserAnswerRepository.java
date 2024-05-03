package lk.ITPM.cco2.repository;



import lk.ITPM.cco2.model.UserAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserAnswerRepository extends MongoRepository<UserAnswer, String> {
}