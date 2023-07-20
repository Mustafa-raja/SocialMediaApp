package com.Social.Media.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.Social.Media.model.User;

@Repository
public interface UserRepo extends JpaRepository<User, Integer> {
    
    public User findByUsername (String username);
}
