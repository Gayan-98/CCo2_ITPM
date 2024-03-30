package lk.ITPM.cco2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoClientDatabaseFactory;

@Configuration
public class MongoConfig {

    @Bean
    public MongoTemplate mongoTemplate() {

        String connectionString = "mongodb+srv://cco2:123@itpm.6quld6g.mongodb.net/CCO2?retryWrites=true&w=majority";

        // Use your MongoDB Atlas connection URI
        return new MongoTemplate(new SimpleMongoClientDatabaseFactory(connectionString));
    }
}
