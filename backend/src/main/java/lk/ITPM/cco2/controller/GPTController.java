package lk.ITPM.cco2.controller;


import lk.ITPM.cco2.service.GPTService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bot")
public class GPTController {

    @Autowired
    private GPTService gptService;

    @PostMapping("/chat/{id}")
    public String chat(@PathVariable String id) {
        return gptService.getResponse(id);
    }

}

