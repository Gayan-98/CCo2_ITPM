package lk.ITPM.cco2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ITPM.cco2.model.Status;



@Service

public interface StatusService {
    Status creatStatus(Status ststus);
    List<Status> getAllStatus();

    
} 
