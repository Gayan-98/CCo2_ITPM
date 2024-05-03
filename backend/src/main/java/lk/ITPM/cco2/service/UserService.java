package com.paf.userservice.service;


import com.paf.userservice.model.User;

public interface UserService {
    User registerUser(User user);
    User loginUser(String username, String password);
}
