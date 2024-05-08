package lk.ITPM.cco2.service;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import lk.ITPM.cco2.model.PlayerMarksEntity;
import lk.ITPM.cco2.repository.PlayerMarksRepository;



@Service
public class PlayerMarksServiceImpl implements PlayerMarksService {
    @Autowired
    private PlayerMarksRepository playerMarksRepository;

    @Override
    public void savePlayerMarks(PlayerMarksEntity playerMarks) {
        playerMarksRepository.save(playerMarks);
    }

    @Override
    public List<PlayerMarksEntity> getAllPlayerMarks() {
        return playerMarksRepository.findAll();
    }

 

     @Override
    public PlayerMarksEntity getPlayerMarksById(String id){
        return playerMarksRepository.findById(id).orElseThrow(() -> new NoSuchElementException("User not fond"+id));
    }
}
