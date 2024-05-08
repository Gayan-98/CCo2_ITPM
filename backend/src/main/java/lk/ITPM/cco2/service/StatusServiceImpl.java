package lk.ITPM.cco2.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.ITPM.cco2.MarksCalculater;
import lk.ITPM.cco2.model.Status;
import lk.ITPM.cco2.repository.StatusRepositary;



@Service
public class StatusServiceImpl implements StatusService {

    private StatusRepositary statusRepositary;

    // Inject the QuizApplication bean
    @Autowired
    private MarksCalculater marksCalculater;

    @Autowired
    public StatusServiceImpl(StatusRepositary statusRepositary) {
        this.statusRepositary = statusRepositary;
    }

    @Override
    public Status creatStatus(Status status) {
        // Calculate total weighted score and determine level of knowledge
        float totalWeightedScore = (float) marksCalculater.calculateTotalWeightedScore();
        String levelOfKnowledge = marksCalculater.determineLevelOfKnowledge();
        
        // Set the calculated values to the status object
        status.setMarks(totalWeightedScore);
        status.setStatus(levelOfKnowledge);
        status.setUserid("1"); // Assuming userid is hardcoded here

        return statusRepositary.save(status);
    }

    @Override
    public List<Status> getAllStatus() {
        return statusRepositary.findAll();
    }
}
