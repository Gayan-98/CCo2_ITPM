package lk.ITPM.cco2.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "question_category")
public class Category {

    private String id;
    private String category;
}
