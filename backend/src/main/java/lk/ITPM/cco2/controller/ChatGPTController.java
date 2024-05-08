package lk.ITPM.cco2.controller;


import lk.ITPM.cco2.service.ChatGPTService;
import lk.ITPM.cco2.service.GPTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bot")
public class ChatGPTController {

    @Autowired
    private ChatGPTService chatgptService;

    @PostMapping("/quiz")
    public String chat(@RequestBody String inputPrompt) {
        return chatgptService.getResponse(inputPrompt);
    }
}

