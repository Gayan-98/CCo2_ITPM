package lk.ITPM.cco2.service;


import lk.ITPM.cco2.model.User;

public interface UserService {
    User registerUser(User user);
    User loginUser(String username, String password);
}
