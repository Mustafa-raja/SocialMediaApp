package com.Social.Media.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Social.Media.Repos.CommentRepo;
import com.Social.Media.Repos.PostRepo;
import com.Social.Media.Repos.UserRepo;
import com.Social.Media.model.Comment;
import com.Social.Media.model.Post;
import com.Social.Media.model.User;

@Service
public class CommentService {
    
    @Autowired
    CommentRepo commentRepo;

     @Autowired
    UserRepo userRepo;

    @Autowired
    PostRepo postRepo;

    public List<Comment> getAllComments() {
        return commentRepo.findAll();
    }

    public Comment PostComment(int userId, int postId, String content) {
        Comment comment = new Comment();
        Optional<User> Ouser= userRepo.findById(userId);
        User user = Ouser.orElse(null);
        System.out.println(user.toString());
        Optional<Post> Opost= postRepo.findById(postId);
        Post post = Opost.orElse(null);
        System.out.println(post.toString());

        comment.setpost(post);
        comment.setuser(user);
        comment.setcontent(content);
        commentRepo.save(comment);
        return comment;
    }

    public List<Comment> getCommentsByPost (int postId) {
        Optional<Post> Opost= postRepo.findById(postId);
        Post post = Opost.orElse(null);
        return commentRepo.findByPost(post);
    }
}
