package lk.ITPM.cco2.repository;

import lk.ITPM.cco2.model.UserSubmitAnswer;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface UserSubmitAnswerRepository extends MongoRepository<UserSubmitAnswer,String> {
    List<UserSubmitAnswer> findByAnswerStatusTrue(String name);

    List<UserSubmitAnswer> findByAnswerStatusFalse(String name);
}
