package com.Social.Media.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Social.Media.Repos.LikeRepo;
import com.Social.Media.Repos.PostRepo;
import com.Social.Media.Repos.UserRepo;
import com.Social.Media.model.Like;
import com.Social.Media.model.Post;
import com.Social.Media.model.User;

@Service
public class LikeService {
    
    @Autowired
    LikeRepo likeRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    PostRepo postRepo;

    Boolean CheckLike = false;

    public List<Like> getAllLikes(){
        return likeRepo.findAll();
    }

    public Like postLike (int userId, int postId){

        
        List <Like> likeList = likeRepo.findAll();
        Like like = new Like();
        Optional<User> Ouser= userRepo.findById(userId);
        User user = Ouser.orElse(null);
        System.out.println(user.toString());
        Optional<Post> Opost= postRepo.findById(postId);
        Post post = Opost.orElse(null);
        System.out.println(post.toString());

        likeList.forEach(elike -> {
            if (elike.getpost() == post && elike.getuser() == user) {
                likeRepo.delete(elike); 
                CheckLike = true;
        }}
        );
        
        if(CheckLike == true) {
            CheckLike = false;
            return like;
        }
        else {
        like.setuser(user);
        like.setpost(post);
        like.getid();

        likeRepo.save(like);
        return like ;
        }
    }

    public List<Like> getLikesByPost(int postId) {
        Optional<Post> Opost= postRepo.findById(postId);
        Post post = Opost.orElse(null);
        
        return likeRepo.findByPost(post);
    }

    public long LikesCountByPost(int postId) {
        Optional<Post> Opost= postRepo.findById(postId);
        Post post = Opost.orElse(null);
        return likeRepo.countByPost(post);
    }
}
