package lk.ITPM.cco2.service;

import java.util.List;

import org.springframework.stereotype.Service;

import lk.ITPM.cco2.model.PlayerMarksEntity;






@Service
public interface PlayerMarksService {
    void savePlayerMarks(PlayerMarksEntity playerMarks);
    List<PlayerMarksEntity> getAllPlayerMarks();
    
    PlayerMarksEntity getPlayerMarksById(String id);

}
