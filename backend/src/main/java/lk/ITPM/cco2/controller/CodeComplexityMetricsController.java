package lk.ITPM.cco2.controller;

import lk.ITPM.cco2.dto.request.CodeComplexityMetricsDTO;
import lk.ITPM.cco2.service.CodeComplexityMetricsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//users answer is going to be analysed by this

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/code")
public class CodeComplexityMetricsController {

    @Autowired
    private CodeComplexityMetricsService codeComplexityMetricsService;

    @PostMapping("/measure")
    public ResponseEntity<String> measureCodeComplexity(@RequestBody CodeComplexityMetricsDTO dto) {
        codeComplexityMetricsService.saveCodeComplexityMetrics(dto);
        return new ResponseEntity<>("Code complexity metrics saved successfully", HttpStatus.OK);
    }
}
