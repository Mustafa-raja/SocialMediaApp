package com.Social.Media.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.Social.Media.Repos.LikeRepo;
import com.Social.Media.Repos.PostRepo;
import com.Social.Media.Repos.UserRepo;
import com.Social.Media.Rest.UserRest;
import com.Social.Media.model.Post;
import com.Social.Media.model.User;

import jakarta.transaction.Transactional;

@Service
public class PostService {

    @Autowired
    PostRepo postRepo ;

    @Autowired
    UserRepo userRepo;

    @Autowired
    LikeRepo likeRepo ;

    public List<Post> getPosts() {
        return postRepo.findAll();
    }

    public Post newPost (int id, String content) {
        Post post = new Post();
        User user = new User();
        
        Optional<User> opuse = userRepo.findById(id);

        user = opuse.orElse(null);

        post.setuser(user);
        post.setcontent(content);
        postRepo.save(post);
        return post;
    }

    public List<Post> getPostsByUser(int userId) {
        User user = new User();
        Optional<User> opuse = userRepo.findById(userId);
        user = opuse.orElse(null);
        return postRepo.findByUser(user);
    }

    public Post Updatepost (int id, String upContent)
    {
        Post post = new Post();
        Optional<Post> pos = postRepo.findById(id);
        post = pos.orElse(null);
        post.setcontent(upContent);
        postRepo.save(post);
        return post;
    }

    @Transactional
    public Post DeletePost (int id){
        Post post = new Post();
        Optional <Post> pos = postRepo.findById(id);
        post = pos.orElse(null);
        likeRepo.deleteAllByPost(post);
        postRepo.delete(post);
        return post;
    }
}
