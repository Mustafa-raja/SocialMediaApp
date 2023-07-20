package com.Social.Media.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Social.Media.Repos.UserRepo;
import com.Social.Media.model.User;

@Service
public class UserService {
    
    @Autowired
    private UserRepo userRepo;

    public List<User> getUsers() {

        return userRepo.findAll();
    }

    public User getUserByID(int id) {
        return userRepo.findById(id).orElse(null);
    }

    public User newUser (User user) {
        userRepo.save(user);
        return user;
    }

    public User aUser (String name) {
        return userRepo.findByUsername(name);
    }

    public User UpdateUser (int id, String newBio){
        User user = new User();
        Optional <User> Ouser = userRepo.findById(id);
        user = Ouser.orElse(null);
        user.setbio(newBio);
        userRepo.save(user);
        return user;

    }
}
