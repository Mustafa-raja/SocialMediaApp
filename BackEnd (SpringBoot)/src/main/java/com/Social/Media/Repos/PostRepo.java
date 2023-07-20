package com.Social.Media.Repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Social.Media.model.Post;
import com.Social.Media.model.User;

@Repository
public interface PostRepo extends JpaRepository<Post , Integer> {
        public List<Post> findByUser (User user);
        public Post deleteById (Long id);
}
