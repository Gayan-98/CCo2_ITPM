package lk.ITPM.cco2.controller;


import lk.ITPM.cco2.service.GPTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bot")
public class GPTController {

    @Autowired
    private GPTService gptService;

    @PostMapping("/chat")
    public String chat(@RequestBody String inputPrompt) {
        return gptService.getResponse(inputPrompt);
    }
}

