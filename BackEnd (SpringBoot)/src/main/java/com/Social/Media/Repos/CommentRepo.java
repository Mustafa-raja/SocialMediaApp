package com.Social.Media.Repos;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import com.Social.Media.model.Comment;
import com.Social.Media.model.Post;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Integer>{
    public List<Comment> findByPost (Post post);
}
