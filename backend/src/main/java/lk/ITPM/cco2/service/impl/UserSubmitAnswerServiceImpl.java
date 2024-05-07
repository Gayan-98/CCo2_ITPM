package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.dto.request.UserSubmitAnswerRequest;
import lk.ITPM.cco2.model.Question;
import lk.ITPM.cco2.model.UserSubmitAnswer;
import lk.ITPM.cco2.repository.QuestionRepository;
import lk.ITPM.cco2.repository.UserSubmitAnswerRepository;
import lk.ITPM.cco2.service.UserSubmitAnswerService;
import lombok.AllArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class UserSubmitAnswerServiceImpl implements UserSubmitAnswerService {

    private final UserSubmitAnswerRepository userSubmitAnswerRepository;
    private final QuestionRepository questionRepository;

    @Override
    public void create(UserSubmitAnswerRequest request, String questionId) {
        Optional<Question> questionOptional = questionRepository.findById(questionId);

        if (questionOptional.isPresent()) {
            Question question = questionOptional.get();

            UserSubmitAnswer userSubmitAnswer = new UserSubmitAnswer();
            BeanUtils.copyProperties(request, userSubmitAnswer);
            userSubmitAnswer.setQuestion(question);

            String submittedAnswer = request.getSubmitAnswer();
            boolean isCorrect = submittedAnswer != null && submittedAnswer.equals(question.getCorrectAnswer());

            userSubmitAnswer.setAnswerStatus(isCorrect);

            userSubmitAnswerRepository.save(userSubmitAnswer);
        }
    }

    public List<Long> getCorrectAnswerCountByCategory(String name) {
        List<UserSubmitAnswer> userSubmitAnswers = userSubmitAnswerRepository.findByAnswerStatusTrue(name);
    
        Map<String, Long> countByCategory = userSubmitAnswers.stream()
                .collect(Collectors.groupingBy(
                        userSubmitAnswer -> userSubmitAnswer.getQuestion().getCategory().toString(),
                        Collectors.counting()
                ));
    
        List<Long> result = new ArrayList<>();
        for (Map.Entry<String, Long> entry : countByCategory.entrySet()) {
            Long count = entry.getValue();
            result.add(count);
        }
    
        return result;
    }

    @Override
    public Map<String, List<String>> getFalseAnswersKeywordsByCategory(String name) {
        List<UserSubmitAnswer> userSubmitAnswers = userSubmitAnswerRepository.findByAnswerStatusFalse(name);

        return userSubmitAnswers.stream()
                .filter(userSubmitAnswer -> userSubmitAnswer.getQuestion() != null && userSubmitAnswer.getQuestion().getKeyWord() != null)
                .collect(Collectors.groupingBy(
                        userSubmitAnswer -> userSubmitAnswer.getQuestion().getCategory().toString(),
                        Collectors.mapping(userSubmitAnswer -> userSubmitAnswer.getQuestion().getKeyWord(), Collectors.toList())
                ));
    }
}
