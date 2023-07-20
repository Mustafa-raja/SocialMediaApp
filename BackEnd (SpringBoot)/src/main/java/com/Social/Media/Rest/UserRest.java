package com.Social.Media.Rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Social.Media.Services.CommentService;
import com.Social.Media.Services.FollowService;
import com.Social.Media.Services.LikeService;
import com.Social.Media.Services.PostService;
import com.Social.Media.Services.UserService;
import com.Social.Media.model.Comment;
import com.Social.Media.model.Follow;
import com.Social.Media.model.Like;
import com.Social.Media.model.Post;
import com.Social.Media.model.User;

@RestController
@RequestMapping("/rest/v1/users")

public class UserRest {
    @Autowired
    private UserService userService;

    @Autowired
    private PostService postService;

    @Autowired
    private FollowService followService;

    @Autowired
    private LikeService likeService;

    @Autowired
    private CommentService commentService;

    @GetMapping ("/")
    public ResponseEntity<List<User>> getUsers (){
        return new ResponseEntity<List<User>>(userService.getUsers(),HttpStatus.OK);
    }

    
    @PostMapping("/NewUser")
    @CrossOrigin(origins = "http://localhost:3000/")
    public ResponseEntity<User> newUser (@RequestBody User user) {
        return new ResponseEntity<User>(userService.newUser(user),HttpStatus.OK);
    }

    @GetMapping("/Login")
    public ResponseEntity<User> getUser (String user) {
        System.out.println(user);
        return new ResponseEntity<User>(userService.aUser(user),HttpStatus.OK);
    }

    @PutMapping("/UpdateUserBio")
    public ResponseEntity<User> updateUser(@RequestParam int id, @RequestParam String bio)
    {
        return new ResponseEntity<User>(userService.UpdateUser(id, bio),HttpStatus.OK);
    }
    @GetMapping("/GetUserById")
    public ResponseEntity<User> getUserById (@RequestParam int id){
        return new ResponseEntity<User>(userService.getUserByID(id),HttpStatus.OK);
    }

    @GetMapping("/GetAllPosts")
    public ResponseEntity<List<Post>> getPost (){
        return new ResponseEntity<List<Post>>(postService.getPosts(), HttpStatus.OK);
    }

    @PostMapping("/newPost")
    public ResponseEntity<Post> newPost (@RequestParam int id, @RequestParam String content) {
    return new ResponseEntity<Post>(postService.newPost(id, content), HttpStatus.OK);
}

    @GetMapping("/getPostByID")
    public ResponseEntity<List<Post>> getPostByID(@RequestParam int id) {
        return new ResponseEntity<List<Post>>(postService.getPostsByUser(id), HttpStatus.OK);
    }

    @PutMapping("/UpdatePost")
    public ResponseEntity<Post> updatePost(@RequestParam int id, @RequestParam String content) {
        return new ResponseEntity<Post>(postService.Updatepost(id, content),HttpStatus.OK);
    }

    @GetMapping("/AllFollows")
    public ResponseEntity<List<Follow>> getFollows (){
        return new ResponseEntity<List<Follow>>(followService.getAllFollows(), HttpStatus.OK);
    }

    @PostMapping("/NewFollow")
    public ResponseEntity<Follow> newFollow (@RequestParam int followerId, @RequestParam int followingIder){
        return new ResponseEntity<Follow>(followService.newFollow( followerId,  followingIder),  HttpStatus.OK);
    }

    @GetMapping ("/FollowSpecific")
    public ResponseEntity<List<Follow>> getSFollow (@RequestParam int id){
        return new ResponseEntity<List<Follow>>(followService.getSFollows(id), HttpStatus.OK);
    }

    @GetMapping("/GetAllLikes")
    public ResponseEntity<List<Like>> getAllLikes () {
        return new ResponseEntity<List<Like>>(likeService.getAllLikes(), HttpStatus.OK);
    }

    @PostMapping("/LikePost")
    public ResponseEntity<Like> setLike (@RequestParam int userId, @RequestParam int postId) {
        return new ResponseEntity<Like>(likeService.postLike(userId, postId), HttpStatus.OK);
    }

    @GetMapping("/GetLikesByPost")
    public ResponseEntity<List<Like>> getLikeByPost (@RequestParam int postId)
    {
        return new ResponseEntity<List<Like>>(likeService.getLikesByPost(postId), HttpStatus.OK);
    }

    @GetMapping("/LikesCountByPost")
    public long getLikeCountByPost(@RequestParam int postId)
    {
        return likeService.LikesCountByPost(postId);
    }
    @GetMapping("/GetAllComments")
    public ResponseEntity<List<Comment>> getComments(){
        return new ResponseEntity<List<Comment>>(commentService.getAllComments(), HttpStatus.OK);
    }

    @PostMapping("/PostComment")
    public ResponseEntity<Comment> postComment(@RequestParam int userId, @RequestParam int postId, @RequestParam String content){
        return new ResponseEntity<Comment>(commentService.PostComment(userId, postId, content), HttpStatus.OK);
    }

    @GetMapping("/GetCommentByPost")
    public ResponseEntity<List<Comment>> getCommentByPost(@RequestParam int postId){
        return new ResponseEntity<List<Comment>>(commentService.getCommentsByPost(postId), HttpStatus.OK);
    }

    @DeleteMapping("/DeletePost")
    public ResponseEntity<Post> deletePost(@RequestParam int id){
        return new ResponseEntity<Post>(postService.DeletePost(id), HttpStatus.OK);
    }
}
