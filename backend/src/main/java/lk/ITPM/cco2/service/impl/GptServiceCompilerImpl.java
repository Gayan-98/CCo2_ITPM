package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.dto.request.GPTRequest;
import lk.ITPM.cco2.dto.response.GPTResponse;
import lk.ITPM.cco2.service.GptServiceCompiler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class GptServiceCompilerImpl implements GptServiceCompiler {

    @Value("${openai.model}")
    private String model;

    @Value("${openai.api.url}")
    private String apiURL;

    @Autowired
    private RestTemplate restTemplate;




    @Override
    public String getResponsecom(String inputPrompt) {
        if (inputPrompt == null || inputPrompt.isEmpty()) {
            return "Error: Prompt cannot be empty";
        }

        try {
            String encodedPrompt = URLEncoder.encode(inputPrompt, StandardCharsets.UTF_8);
            String prompt = encodedPrompt + "Perform an in-depth analysis of the provided code snippet. Identify potential errors, suggest optimizations for performance, readability, and maintainability, and provide relevant code examples where applicable. Additionally, evaluate the code's compliance with best practices and industry standards. Your response should include detailed explanations and actionable recommendations.";

            GPTRequest request = new GPTRequest(model, prompt);
            GPTResponse gptResponse = restTemplate.postForObject(apiURL, request, GPTResponse.class);
            assert gptResponse != null;
            return gptResponse.getChoices().get(0).getMessage().getContent();
        } catch (Exception e) {
            System.err.println("Error processing prompt: " + e.getMessage());
            return "Error processing prompt: " + e.getMessage();
        }
    }


}
