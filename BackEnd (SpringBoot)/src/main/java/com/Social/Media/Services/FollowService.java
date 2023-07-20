package com.Social.Media.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Social.Media.Repos.FollowRepo;
import com.Social.Media.Repos.UserRepo;
import com.Social.Media.model.Follow;
import com.Social.Media.model.User;

@Service
public class FollowService {
    
    @Autowired
    FollowRepo followRepo ;
    
    User user = new User() ;
    Boolean CheckLike = false ;
    @Autowired
    UserRepo userRepo;

    public List<Follow> getAllFollows() {
        return followRepo.findAll();
    }

    public Follow newFollow (int followId, int followingId) {
        Follow follow = new Follow();

        List<Follow> FValue = followRepo.findAll();
        Optional<User> followUser = userRepo.findById(followId);
        User user = followUser.orElse(null);
    Optional<User> followingUser = userRepo.findById(followingId);
        User userF = followingUser.orElse(null);

        FValue.forEach(efollow -> {
            if (efollow.getFollower()== user && efollow.getfollowing() == userF) {
                followRepo.delete(efollow); 
                CheckLike = true;
        }}
        );
        follow.setFollower(user);
        follow.setfollowing( userF);
        if(CheckLike == true) {
            CheckLike = false;
            return follow;
        }
        else {
        followRepo.save(follow);
        return follow;
    }}

    public List<Follow> getSFollows(int id) {
        Optional<User> userOptional = userRepo.findById(id);
        user = userOptional.orElse(null);

        return followRepo.findByFollower(user);

    }
}
