package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.model.AdvanceQuiz;
import lk.ITPM.cco2.model.UserAnswer;
import lk.ITPM.cco2.service.UserAnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/advance_quizzes/answer")
public class UserQuizAnswer {

    @Autowired
    private UserAnswerService userAnswerService;

    @PostMapping("/post")
    public UserAnswer createQuiz(@RequestBody UserAnswer answer) {
        return userAnswerService.sendAnswer(answer);
    }


    @GetMapping("get/{id}")
    public ResponseEntity<UserAnswer> getQuizById(@PathVariable String id) {
        UserAnswer answer = userAnswerService.getAnswerById(id);
        return ResponseEntity.ok(answer);
    }
}
