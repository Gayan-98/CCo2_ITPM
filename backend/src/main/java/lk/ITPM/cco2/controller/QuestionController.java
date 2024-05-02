package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.dto.request.QuestionRequest;
import lk.ITPM.cco2.dto.response.QuestionResponse;
import lk.ITPM.cco2.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class QuestionController {

    private final QuestionService questionService;

    @PostMapping("/categories/{category-id}/questions")
    public QuestionResponse create(@RequestBody QuestionRequest request, @PathVariable("category-id") String categoryId) {
        return questionService.create(request, categoryId);
    }

    @GetMapping("/categories/{category-id}/questions")
    public List<QuestionResponse> get(@PathVariable("category-id") String categoryId) {
        return questionService.getCategoryQuestion(categoryId);
    }

    @GetMapping("/questions/{question-id}")
    public QuestionResponse getQuestionById(@PathVariable ("question-id") String questionId){
        return questionService.getQuestionById(questionId);
    }

    @PutMapping("/questions/{question-id}")
    public QuestionResponse update(@RequestBody QuestionRequest request,
                                         @PathVariable ("question-id") String questionId){
        return questionService.update(request,questionId);
    }

    @DeleteMapping("/questions/{question-id}")
    public void delete(@PathVariable ("question-id") String questionId){
        questionService.delete(questionId);
    }

    @GetMapping("/random")
    public List<QuestionResponse> getRandomQuestionsPerCategory() {
        return questionService.getRandomQuestionsPerCategory();
    }
}