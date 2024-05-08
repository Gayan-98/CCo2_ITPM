package lk.ITPM.cco2.service.impl;


import lk.ITPM.cco2.dto.request.ChatGPTRequest;

import lk.ITPM.cco2.dto.response.ChatGPTResponse;

import lk.ITPM.cco2.service.ChatGPTService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;


@Service
public class ChatGPTServiceImpl implements ChatGPTService {
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
            String prompt = encodedPrompt + "Generate Coding Questions Based on Keywords:\n\n" +
                "To use this feature, please provide a keyword related to programming concepts.\n" +
                "ChatGPT API will then generate five coding questions based on the provided keyword.\n" +
                "Ensure to choose keywords that are relevant to your coding practice needs.\n\n" ;
                

            ChatGPTRequest request = new ChatGPTRequest(model, prompt);
            ChatGPTResponse ChatGptResponse = restTemplate.postForObject(apiURL, request, ChatGPTResponse.class);
            assert ChatGptResponse != null;
            return ChatGptResponse.getChoices().get(0).getMessage().getContent();
        } catch (Exception e) {
            System.err.println("Error processing prompt: " + e.getMessage());
            return "Error processing prompt: " + e.getMessage();
        }
    }
}


