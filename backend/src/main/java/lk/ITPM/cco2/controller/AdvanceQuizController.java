package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.model.AdvanceQuiz;
import lk.ITPM.cco2.service.AdvanceQuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/advance_quizzes")
public class AdvanceQuizController {

    @Autowired
    private AdvanceQuizService advanceQuizService;

    @PostMapping("/post")
    public AdvanceQuiz createQuiz(@RequestBody AdvanceQuiz quiz) {
        return advanceQuizService.createQuiz(quiz);
    }

    @GetMapping("/get")
    public List<AdvanceQuiz> getAllQuizzes() {
        return advanceQuizService.getAllQuizzes();
    }

    @GetMapping("get/{id}")
    public ResponseEntity<AdvanceQuiz> getQuizById(@PathVariable String id) {
        AdvanceQuiz quiz = advanceQuizService.getQuizById(id);
        return ResponseEntity.ok(quiz);
    }

    @PutMapping("put/{id}")
    public ResponseEntity<AdvanceQuiz> updateQuiz(@PathVariable String id, @RequestBody AdvanceQuiz quizDetails) {
        AdvanceQuiz updatedQuiz = advanceQuizService.updateQuiz(id, quizDetails);
        return ResponseEntity.ok(updatedQuiz);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteQuiz(@PathVariable String id) {
        advanceQuizService.deleteQuiz(id);
        return ResponseEntity.ok().build();
    }
}
