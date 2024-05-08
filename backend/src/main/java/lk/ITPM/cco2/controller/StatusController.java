package lk.ITPM.cco2.controller;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import lk.ITPM.cco2.model.Status;
import lk.ITPM.cco2.service.StatusService;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class StatusController {

    private StatusService statusService;

    @Autowired
    public StatusController(StatusService statusService) {
        this.statusService = statusService;
    }

    @GetMapping("/status")
    public ResponseEntity<List<Status>> getAllStatus() {
        return ResponseEntity.status(HttpStatus.OK).body(statusService.getAllStatus());
    }

   

    @PostMapping("/status")
    public ResponseEntity<Status> createStatus(@RequestBody Status status) {
        try {
            Status newStatus = statusService.creatStatus(status);
            return ResponseEntity.status(HttpStatus.CREATED).body(newStatus);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }



    
}
