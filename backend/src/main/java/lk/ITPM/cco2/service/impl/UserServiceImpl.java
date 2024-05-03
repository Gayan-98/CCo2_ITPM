package lk.ITPM.cco2.service.impl;

import lk.ITPM.cco2.model.User;
import lk.ITPM.cco2.repository.UserRepository;
import lk.ITPM.cco2.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
        if (!isValidEmail(user.getEmail())) {
            System.out.println("Invalid email format: " + user.getEmail());

            throw new IllegalArgumentException("Invalid email format");
        }

        return userRepository.save(user);
    }

    @Override
    public User loginUser(String username, String password) {
        User user = userRepository.findByUsername(username);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        }
        return null;
    }

    private boolean isValidEmail(String email) {
        return email != null && email.matches("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}");
    }
}
