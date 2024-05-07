package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.service.GptServiceCompiler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bot")
public class GPTCompilerController {

    @Autowired
    private GptServiceCompiler gptServiceCompiler;

    @PostMapping("/chat")
    public String chat(@RequestBody String inputPrompt) {
        return gptServiceCompiler.getResponsecom(inputPrompt);
    }
}
