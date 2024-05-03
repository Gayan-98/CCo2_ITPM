package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.dto.request.GPTRequest;
import lk.ITPM.cco2.dto.response.GPTResponse;
import lk.ITPM.cco2.model.AdvanceQuiz;
import lk.ITPM.cco2.model.CodeComplexityMetrics;
import lk.ITPM.cco2.repository.AdvanceQuizRepository;
import lk.ITPM.cco2.repository.CodeComplexityMetricsRepository;
import lk.ITPM.cco2.service.GPTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class GPTServiceImpl implements GPTService {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private CodeComplexityMetricsRepository metricsRepository;

    @Autowired
    private AdvanceQuizRepository advanceQuizRepository;

    @Override
    public String getResponse(String id) {
        if (id == null || id.isEmpty()) {
            return "Error: Prompt cannot be empty";

        }

        try {
            // Retrieve data from the database
            CodeComplexityMetrics metrics = metricsRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Quiz not found!"));

            AdvanceQuiz qustion = advanceQuizRepository.findById(metrics.getQuizId())
                    .orElseThrow(() -> new RuntimeException("question not found!"));

            // Prepare the prompt with the retrieved data
            String prompt = preparePrompt(metrics,qustion);


            // Encode the input prompt to handle special characters
            String encodedPrompt = URLEncoder.encode(prompt, StandardCharsets.UTF_8);

            // Make a request to the GPT API service
            GPTRequest request = new GPTRequest(model, encodedPrompt);
            GPTResponse gptResponse = restTemplate.postForObject(apiURL, request, GPTResponse.class);

            assert gptResponse != null;
            return gptResponse.getChoices().get(0).getMessage().getContent();

        } catch (Exception e) {
            System.err.println("Error processing prompt: " + e.getMessage());
            return "Error processing prompt: " + e.getMessage();
        }
    }

    private String preparePrompt(CodeComplexityMetrics metrics, AdvanceQuiz quesion) {
        StringBuilder promptBuilder = new StringBuilder();

        // Add prompt asking GPT to analyze the code complexity value and provide suggestions
        promptBuilder.append("Please analyze the following code and provide insights on its complexity. ")
                .append("Additionally, identify any issues present in the code and suggest ideal data structures and clean code practices.\n\n");

        // Add the code snippet to the prompt
        promptBuilder.append("Code:\n")
                .append(metrics.getCode()).append("\n\n");

        // Add the question to the prompt
        promptBuilder.append("Question:\n")
                .append(quesion.getQuestion()).append("\n\n");


        // Add details of code complexity metrics
        promptBuilder.append("Code Complexity Metrics:\n")
                .append("Lines of Code: ").append(metrics.getLinesOfCode()).append("\n")
                .append("Duplicate Code Blocks: ").append(metrics.getDuplicateCodeBlocks()).append("\n")
                .append("Max Nesting Depth: ").append(metrics.getMaxNestingDepth()).append("\n")
                .append("Estimated Time Complexity: ").append(metrics.getEstimatedTimeComplexity()).append("\n")
                .append("Estimated Space Complexity: ").append(metrics.getEstimatedSpaceComplexity()).append("\n")
                .append("Control Flow Complexity: ").append(metrics.getControlFlowComplexity()).append("\n\n");

        // Add prompt asking for explanations of issues and suggestions for clean code
        promptBuilder.append("Please provide explanations for any issues identified in the code and suggest ideal data structures and clean code practices.\n");
        promptBuilder.append("Please provide clean code for the question as a answer code.\n");

        return promptBuilder.toString();
    }

}
