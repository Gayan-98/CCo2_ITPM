package lk.ITPM.cco2.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpRequest;
import org.springframework.http.client.ClientHttpRequestExecution;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;

@Configuration
public class OpenAIConfig {

    @Value("${openai.api.key}")
    String openaiApiKey;

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        // Adding the interceptor to the RestTemplate
        restTemplate.getInterceptors().add(new ClientHttpRequestInterceptor() {
            @Override
            public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
                // Setting the Authorization header for each request
                request.getHeaders().add("Authorization", "Bearer " + openaiApiKey);

                // Executing the request with the modified headers
                return execution.execute(request, body);
            }
        });

        return restTemplate;
    }
}
