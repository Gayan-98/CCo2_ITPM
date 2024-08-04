package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.dto.request.QuestionRequest;
import lk.ITPM.cco2.dto.response.QuestionResponse;
import lk.ITPM.cco2.model.Category;
import lk.ITPM.cco2.model.Question;
import lk.ITPM.cco2.repository.CategoryRepository;
import lk.ITPM.cco2.repository.QuestionRepository;
import lk.ITPM.cco2.service.QuestionService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class QuestionServiceImpl implements QuestionService {

    private final CategoryRepository categoryRepository;
    private final QuestionRepository questionRepository;

    @Override
    public QuestionResponse create(QuestionRequest request, String categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isPresent()) {
            Category category = categoryOptional.get();

            Question question = new Question();
            question.setId(request.getId());
            question.setQuestion(request.getQuestion());
            question.setOption1(request.getOption1());
            question.setOption2(request.getOption2());
            question.setOption3(request.getOption3());
            question.setOption4(request.getOption4());
            question.setCorrectAnswer(request.getCorrectAnswer());
            question.setKeyWord(request.getKeyWord());

            question.setCategory(category);

            questionRepository.save(question);
        }

        return null;
    }

    @Override
    public List<QuestionResponse> getCategoryQuestion(String categoryId) {
        Optional<Category> categoryOptional = categoryRepository.findById(categoryId);

        if (categoryOptional.isPresent()){
            Category category = categoryOptional.get();

            List<Question> questions = questionRepository.findByCategory((category));

            return questions.stream()
                    .map(question -> QuestionResponse.builder()
                            .id(question.getId())
                            .question(question.getQuestion())
                            .option1(question.getOption1())
                            .option2(question.getOption2())
                            .option3(question.getOption3())
                            .option4(question.getOption4())
                            .correctAnswer(question.getCorrectAnswer())
                            .keyWord(question.getKeyWord())
                            .category(String.valueOf(question.getCategory()))
                            .build())
                    .toList();
        }

        return null;
    }

    @Override
    public QuestionResponse getQuestionById(String questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);

        if ((questionOptional.isPresent())){
            Question question = questionOptional.get();

            return QuestionResponse.builder()
                    .id(question.getId())
                    .question(question.getQuestion())
                    .option1(question.getOption1())
                    .option2(question.getOption2())
                    .option3(question.getOption3())
                    .option4(question.getOption4())
                    .correctAnswer(question.getCorrectAnswer())
                    .keyWord(question.getKeyWord())
                    .category(String.valueOf(question.getCategory()))
                    .build();
        }
        return null;
    }

    @Override
    public QuestionResponse update(QuestionRequest request, String questionId) {

        Optional<Question> questionOptional = questionRepository.findById(questionId);

        if (questionOptional.isPresent()){
            Question question = questionOptional.get();

            question.setQuestion(request.getQuestion());
            question.setOption1(request.getOption1());
            question.setOption2(request.getOption2());
            question.setOption3(request.getOption3());
            question.setOption4(request.getOption4());
            question.setCorrectAnswer(request.getCorrectAnswer());
            question.setKeyWord(request.getKeyWord());

            questionRepository.save(question);
        }
        return null;
    }

    @Override
    public void delete(String questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);

        if (questionOptional.isPresent()){
            Question question = questionOptional.get();

            questionRepository.delete(question);
        }
    }

    @Override
    public List<QuestionResponse> getRandomQuestionsPerCategory() {
        List<String> categories = List.of("A", "B", "C");
        List<QuestionResponse> result = new ArrayList<>();

        for (String category : categories) {
            List<Question> allQuestionsInCategory = questionRepository.findByCategory_Category(category);

            if (allQuestionsInCategory.size() >= 10) {
                Collections.shuffle(allQuestionsInCategory);
                List<Question> selectedQuestions = allQuestionsInCategory.subList(0, 10);

                result.addAll(selectedQuestions.stream()
                        .map(question -> QuestionResponse.builder()
                                .id(question.getId())
                                .question(question.getQuestion())
                                .option1(question.getOption1())
                                .option2(question.getOption2())
                                .option3(question.getOption3())
                                .option4(question.getOption4())
                                .correctAnswer(question.getCorrectAnswer())
                                .category(question.getCategory().getCategory())
                                .keyWord(question.getKeyWord())
                                .build())
                        .toList());
            }
        }

        Collections.shuffle(result);

        return result;
    }
}