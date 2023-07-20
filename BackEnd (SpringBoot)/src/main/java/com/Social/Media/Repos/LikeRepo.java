package com.Social.Media.Repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Social.Media.model.Like;
import com.Social.Media.model.Post;

@Repository
public interface LikeRepo extends JpaRepository<Like, Integer>{
    
    public List<Like> deleteAllByPost (Post post);
    public List<Like> findByPost(Post post);
    public long countByPost (Post post);
}
