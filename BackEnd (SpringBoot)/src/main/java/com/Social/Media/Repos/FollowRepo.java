package com.Social.Media.Repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Social.Media.model.Follow;
import com.Social.Media.model.User;

@Repository
public interface FollowRepo extends JpaRepository<Follow, Integer>{
    
    public List<Follow> findByFollower (User Follower);


}
