package lk.ITPM.cco2.dto.request;

import lk.ITPM.cco2.dto.Message;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;

@Data
public class GPTRequest {
    private String model;
    private List<Message> messages;

    public GPTRequest(String model, String prompt) {
        this.model = model;
        this.messages = new ArrayList<>();
        this.messages.add(new Message("user",prompt));
    }

}
