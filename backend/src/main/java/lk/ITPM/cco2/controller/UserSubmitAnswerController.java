package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.dto.request.UserSubmitAnswerRequest;
import lk.ITPM.cco2.service.UserSubmitAnswerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserSubmitAnswerController {

    private final UserSubmitAnswerService userSubmitAnswerService;

    @PostMapping("/questions/{question-id}/answers")
    public void create(@RequestBody UserSubmitAnswerRequest request, @PathVariable("question-id") String questionId){
        userSubmitAnswerService.create(request,questionId);
    }
}
