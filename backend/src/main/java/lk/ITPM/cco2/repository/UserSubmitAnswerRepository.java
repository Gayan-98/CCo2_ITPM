package lk.ITPM.cco2.repository;

import lk.ITPM.cco2.model.UserSubmitAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserSubmitAnswerRepository extends MongoRepository<UserSubmitAnswer,String> {
}
