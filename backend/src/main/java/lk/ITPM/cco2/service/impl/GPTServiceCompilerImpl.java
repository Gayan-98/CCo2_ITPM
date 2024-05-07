package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.service.GptServiceCompiler;
import lk.ITPM.cco2.dto.request.GPTRequest;
import lk.ITPM.cco2.dto.response.GPTResponse;
import lk.ITPM.cco2.service.GPTService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

public class GPTServiceCompilerImpl implements GptServiceCompiler {
    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;


    @Autowired
    private RestTemplate restTemplate;

    @Override
    public String getResponse(String inputPrompt) {
        if (inputPrompt == null || inputPrompt.isEmpty()) {
            return "Error: Prompt cannot be empty";
        }

        try {
            // Encode the input prompt to handle special characters
            String encodedPrompt = URLEncoder.encode(inputPrompt, StandardCharsets.UTF_8);
            String prompt = encodedPrompt + "analise the code if code is correct then say your code is correct if not highly" +
                    " ght the error and also give the correct code snippet   and also need code coverage like how may " +
                    "unclear code line are there is this a clean code or not like SonarQube give us output give those";

            GPTRequest request = new GPTRequest(model, prompt);
            GPTResponse GptResponse = restTemplate.postForObject(apiURL, request, GPTResponse.class);
            assert GptResponse != null;
            return GptResponse.getChoices().get(0).getMessage().getContent();
        } catch (Exception e) {
            System.err.println("Error processing prompt: " + e.getMessage());
            return "Error processing prompt: " + e.getMessage();
        }
    }

}
