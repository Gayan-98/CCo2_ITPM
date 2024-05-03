package lk.ITPM.cco2.repository;

import lk.ITPM.cco2.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends MongoRepository<User, UUID> {


  User findByUsername(String username);
}