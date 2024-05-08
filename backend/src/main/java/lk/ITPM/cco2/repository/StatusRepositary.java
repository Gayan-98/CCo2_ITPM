package lk.ITPM.cco2.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import lk.ITPM.cco2.model.Status;





public interface StatusRepositary extends MongoRepository<Status, String>  {


    
} 
