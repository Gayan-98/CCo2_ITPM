package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.dto.request.UserSubmitAnswerRequest;
import lk.ITPM.cco2.service.UserSubmitAnswerService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class UserSubmitAnswerController {

    private final UserSubmitAnswerService userSubmitAnswerService;

    @PostMapping("/questions/{question-id}/answers")
    public void create(@RequestBody UserSubmitAnswerRequest request, @PathVariable("question-id") String questionId){
        userSubmitAnswerService.create(request,questionId);
    }

    @GetMapping("/{name}/category-counts")
    public List<String> getCorrectAnswerCountByCategory(@PathVariable String name) {
        return userSubmitAnswerService.getCorrectAnswerCountByCategory(name);
    }

    @GetMapping("/{name}/false-answers-keywords")
    public Map<String, List<String>> getFalseAnswersKeywordsByCategory(@PathVariable String name) {
        return userSubmitAnswerService.getFalseAnswersKeywordsByCategory(name);
    }
}
