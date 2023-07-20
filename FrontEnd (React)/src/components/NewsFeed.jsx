import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardActions, Button, Modal, TextField } from "@mui/material";
import { ThumbUp, Comment } from "@mui/icons-material";

import Search from "./search";
const NewsFeed = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state.id;
    const [follow, setFollow] = useState([]);
    const [followingPosts, setFollowingPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showOverlay, setShowOverlay] = useState(false); 
    const [newPostContent, setNewPostContent] = useState(""); 
    const [showCommentOverlay, setShowCommentOverlay] = useState(false); 
    const [commentContent, setCommentContent] = useState("");
    const [selectedPostId, setSelectedPostId] = useState(""); 
    const [comments, setComments] = useState([]);
    const [reRender , setReRender] = useState(true)
    const [showLikeOverlay, setShowLikeOverlay] = useState(false);
    const [PostLikes ,  setPostLikes] = useState([]);

    useEffect(() => {
        let appendPost = [];
        const fetchData = async () => {
          try {
            const followResponse = await fetch(
              `http://localhost:8080/rest/v1/users/FollowSpecific?id=${userId}`
            );
            if (followResponse.ok) {
              const followData = await followResponse.json();
              console.log("Follow Data:", followData);
              setFollow(followData);
            } else {
              console.error("Error:", followResponse.status);
            }
          } catch (error) {
            console.error("Error:", error);
          }
      
          try {
            const postsResponse = await fetch(
              `http://localhost:8080/rest/v1/users/GetAllPosts`
            );
            if (postsResponse.ok) {
              const postsData = await postsResponse.json();
              console.log("Posts Data:", postsData);
              const filteredPosts = postsData.filter((post) =>
                follow.some((insaan) => post.user.id === insaan.following.id)
              );
              setFollowingPosts(filteredPosts);
      
              const fetchLikesCountPromises = filteredPosts.map((post) => {
                return fetch(
                  `http://localhost:8080/rest/v1/users/LikesCountByPost?postId=${post.id}`,
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((data) => {
                    console.log(data);
                    post = {
                      ...post,
                      count: data,
                    };
                    console.log(post);
                    appendPost.push(post);
                    console.log(appendPost);
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              });
      
              Promise.all(fetchLikesCountPromises).then(() => {
                console.log("WADDA NIGGA CHOTA NIGGA");
                setFollowingPosts(appendPost);
                setLoading(false);
              });
            } else {
              console.error("Error:", postsResponse.status);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
      
        fetchData();
      }, [userId, loading, reRender]);
      
    const handleClick = () => {
        console.log(userId);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    const handlePostClick = () => {
        setShowOverlay(true); 
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false); 
    };

    const handleNewPostChange = (event) => {
        setNewPostContent(event.target.value); 
    };
    const handleCommentClick = (postId) => {
        setSelectedPostId(postId); 
        setComments([]);
        fetch(`http://localhost:8080/rest/v1/users/GetCommentByPost?postId=${postId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setComments(data);
            })
            .catch((error) => {
                console.error(error);
            });
        setShowCommentOverlay(true); 
    };

    const handleCloseCommentOverlay = () => {
        setShowCommentOverlay(false); 
        setCommentContent(""); 
    };



    const handleCommentSubmit = () => {
        // Handle the comment submission logic here
        console.log("New Comment:", commentContent);
        const userIdInt = parseInt(userId);
        fetch(`http://localhost:8080/rest/v1/users/PostComment?userId=${userIdInt}&postId=${selectedPostId}&content=${commentContent}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
        setCommentContent("");
        setShowCommentOverlay(false);
    };

    const handleNewPostSubmit = (event) => {
        event.preventDefault();


        const userIdInt = parseInt(userId);

        
        fetch(`http://localhost:8080/rest/v1/users/newPost?id=${userIdInt}&content=${newPostContent}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });

        setNewPostContent("");
        setShowOverlay(false);
    };

    const handleLikeUser = (user) => {

        fetch(`http://localhost:8080/rest/v1/users/GetLikesByPost?postId=${user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPostLikes(data);
            })
            .catch((error) => {
                console.error(error);
            });
            setShowLikeOverlay(true);
    }

   const handleCloseLikeOverlay =()=>{
        setShowLikeOverlay(false); 

    }

    const handleLike = (id) => {
        
        console.log(followingPosts)
        const userIdInt = parseInt(userId);
        fetch(`http://localhost:8080/rest/v1/users/LikePost?userId=${userIdInt}&postId=${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setReRender(!reRender)
            })
            .catch((error) => {
                console.error(error);
            });

    }

    const Post = () => {
        return followingPosts.map((post) => (
            <Card key={post.id} style={{ marginBottom: "20px" }}>
                <CardContent>
                    <Typography variant="subtitle1" component="div" sx={{ display: "flex", alignItems: "center" }}>
                        {post.user.username}
                    </Typography>
                    <Typography variant="body1">{post.content}</Typography>
                </CardContent>
                <hr />
                <Button onClick={() => handleLikeUser(post.id)} size="small" sx={{ marginRight: "10px" }}>
                {post.count} Likes
                </Button>
                <hr />
                <CardActions>
                    <Button onClick={() => handleLike(post.id)} size="small" startIcon={<ThumbUp />} sx={{ marginRight: "10px" }}>
                        Like
                    </Button>
                    <Button onClick={() => handleCommentClick(post.id)} size="small" startIcon={<Comment />}>
                        Comment
                    </Button>
                </CardActions>
            </Card>
        ));
    };


    return (
        <div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
            <div style={{ flex: 0.2, borderRight: "1px solid", borderColor: "#909090" }}>
                <div style={{ marginTop: "50px", height: "150px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div
                        className="mango"
                        style={{
                            width: "30vh",
                            backgroundColor: "#d3d3d3",
                            height: "45px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => { navigate("/NewsFeed", { state: { id: userId } }); }}

                    >
                        <h5>NewsFeed</h5>
                    </div>
                    <div
                        className="mango"
                        style={{
                            width: "30vh",
                            backgroundColor: "#d3d3d3",
                            height: "45px",
                            marginBottom: "10px",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={() => { navigate("/Profile", { state: { id: userId } }); }}
                    >
                        <h5>Profile</h5>
                    </div>
                    <div
                        className="post"
                        style={{
                            width: "30vh",
                            backgroundColor: "#d3d3d3",
                            height: "45px",
                            borderRadius: "8px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                        }}
                        onClick={handlePostClick}
                    >
                        <h5>New Post</h5>
                    </div>
                </div>
            </div>
            <div style={{ flex: 0.7, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h3>News Feed</h3>
                <div style={{ width: "50%", height: "100vh" }}>
                    <Post />
                </div>
            </div>
            <div style={{ flex: 0.3, borderLeft: "1px solid" }}>
                <Search userId = {userId}/>
            </div>
            {/* Overlay */}
            <Modal open={showOverlay} onClose={handleCloseOverlay} aria-labelledby="overlay-modal-title">
                <Card
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "400px",
                        width: "90%",
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" id="overlay-modal-title" gutterBottom>
                            Create a New Post
                        </Typography>
                        <TextField
                            label="Post Content"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={newPostContent}
                            onChange={handleNewPostChange}
                            sx={{ marginBottom: "20px" }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleCloseOverlay}>Close</Button>
                        <Button onClick={handleNewPostSubmit} variant="contained" color="primary">
                            Post
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
            {/* Comment Overlay */}
            <Modal open={showCommentOverlay} onClose={handleCloseCommentOverlay} aria-labelledby="comment-overlay-modal-title">
                <Card
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "400px",
                        minHeight: "400px",
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" id="comment-overlay-modal-title" gutterBottom>
                            Comments
                        </Typography>
                        {/* Comment section */}
                        {/* Add your comment section here */}
                        {/* Example: */}
                        <div style={{ flex: "1 1 auto", overflowY: "scroll" }}>
                            {comments.map((comment) => {
                                return (
                                    <p key={comment.id}>{comment.content}</p>
                                )
                            })}
                        </div>
                        {/* Comment input */}
                        <TextField
                            label="Write a comment"
                            multiline
                            rows={1}
                            variant="outlined"
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            sx={{ marginBottom: "20px" }}
                        />
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleCloseCommentOverlay}>Close</Button>
                        <Button onClick={handleCommentSubmit} variant="contained" color="primary">
                            Post Comment
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
            {/* Like Overlay */}
            <Modal open={showLikeOverlay} onClose={handleCloseLikeOverlay} aria-labelledby="comment-overlay-modal-title">
                <Card
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        maxWidth: "400px",
                        minHeight: "400px",
                        width: "90%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <CardContent>
                        <Typography variant="h6" id="comment-overlay-modal-title" gutterBottom>
                            Liked by
                        </Typography>
                        {/* Comment section */}
                        {/* Add your comment section here */}
                        {/* Example: */}
                        <div style={{ flex: "1 1 auto", overflowY: "scroll" }}>
                            {PostLikes.map((likes) => {
                                return (
                                    <p key={likes.id}>{likes.user.username}</p>
                                )
                            })}
                        </div>    
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleCloseLikeOverlay}>Close</Button>
                    </CardActions>
                </Card>
            </Modal>
        </div>
    );
};

export default NewsFeed;
