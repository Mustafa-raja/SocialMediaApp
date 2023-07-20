import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardActions, Button, Modal, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ThumbUp, Comment } from "@mui/icons-material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';


export default function Profile () {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state.id;
    const [showOverlay, setShowOverlay] = useState(false); 
    const [newPostContent, setNewPostContent] = useState(""); 
    const [loading, setLoading] = useState(true);
    const [Profile, setProfile] = useState({})
    const [posts ,setPosts] = useState([]);
    const [showCommentOverlay, setShowCommentOverlay] = useState(false); 
    const [commentContent, setCommentContent] = useState(""); 
    const [selectedPostId, setSelectedPostId] = useState(""); 
    const [comments, setComments] = useState([]);
    const [showEditOverlay, setShowEditOverlay] = useState(false);
    const [showBioOverlay, setShowBioOverlay] = useState(false);
    const [bioContent, setBioContent] = useState(""); 
  

    const Post = () => {
        return posts.map((post) => (
            <Card key={post.id} style={{ marginBottom: "20px", minHeight: "200px" }}>
                <CardContent>
                    <Typography variant="subtitle1" component="div" sx={{ display: "flex", alignItems: "center" }}>
                        {post.user.username}
                        <Button onClick={() => handleDelete(post.id)} color="error" size="small" startIcon={< DeleteOutlineRoundedIcon/>} sx={{ marginRight: "10px" }}/>
                    </Typography>
                    <Typography variant="body1">{post.content}</Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleLike(post.id)} size="small" startIcon={<ThumbUp />} sx={{ marginRight: "10px" }}>
                        Like
                    </Button>
                    <Button onClick={() => handleCommentClick(post.id)} size="small" startIcon={<Comment />} sx={{ marginRight: "10px" }}>
                        Comment
                    </Button>
                    <Button onClick={() => handleEdit(post.id)} size="small" startIcon={<EditOutlinedIcon />} >
                        Edit
                    </Button>
                </CardActions>
            </Card>
        ));
    };


    const handleDelete = (id) => {
        console.log(`Delete ${id}`);
        fetch(`http://localhost:8080/rest/v1/users/DeletePost?id=${id}`, {
            method: "DELETE",
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

    }

    const handleEdit = (id) =>{
        console.log("Edit", id);
        setSelectedPostId(id);
        setShowEditOverlay(true); 

    }
    const handleCloseEditOverlay = () => {
        setShowEditOverlay(false); 
      };
    
      const handleEditSubmit = () => {
        fetch(`http://localhost:8080/rest/v1/users/UpdatePost?id=${selectedPostId}&content=${newPostContent}`, {
            method: "PUT",
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
        setShowEditOverlay(false); 
      };  
    const handleLike = (id) => {
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
            })
            .catch((error) => {
                console.error(error);
            });

    }

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

    const handleCommentSubmit = () => {
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


    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:8080/rest/v1/users/GetUserById?id=${userId}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  setProfile(data);
                  setLoading(false)
              })
                .catch((error) => {
                  console.error(error);
                });


                fetch(`http://localhost:8080/rest/v1/users/getPostByID?id=${userId}`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      setPosts(data);
                      setLoading(false)
                  })
                    .catch((error) => {
                      console.error(error);
                    });
        };

        fetchData();
    }, [userId, loading]);
    
    const handlePostClick = () => {
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false); 
    };
    const handleCloseCommentOverlay = () => {
        setShowCommentOverlay(false); 
        setCommentContent(""); 
    };
    const handleNewPostChange = (event) => {
        setNewPostContent(event.target.value); 
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
        // Close the overlay
        setShowOverlay(false);
    };

    
    const handleBioEdit = () => {
        setBioContent(Profile.bio); 
        setShowBioOverlay(true); 
      };
    
    const  handleCloseBioOverlay = () => {
        setShowBioOverlay(false); 
      };
    
      const handleBioChange = (event) => {
        setBioContent(event.target.value); 
      };
    
      const handleBioSubmit = () => {
        console.log("New Bio:", bioContent);
        fetch(`http://localhost:8080/rest/v1/users/UpdateUserBio?id=${userId}&bio=${bioContent}`, {
            method: "PUT",
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
        setShowBioOverlay(false); 
      };
    

    return (<div style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
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
                onClick={ () => {navigate("/NewsFeed", { state: { id: userId } }); }}

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
                onClick={ () => {navigate("/Profile", { state: { id: userId } }); }}
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
    <div style={{ flex: 0.7, display: "flex", flexDirection: "column", alignItems: "center", overflowY: "auto" }}>
        <h3>Profile</h3>
        <h4>{Profile.username}</h4>
        <p>{Profile.bio}<Button onClick={() => handleBioEdit(userId)} size="small" startIcon={<EditOutlinedIcon />} >
                        Edit
                    </Button></p>
        <h3>Posts</h3>   
        <Post/>
        <div style={{ width: "50%", height: "100vh" }}>
        </div>
    </div>
    <div style={{ flex: 0.3, borderLeft: "1px solid" }}>
        <p>kjhdf</p>
    </div>
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
            justifyContent: "space-between", // Adjusts vertical alignment
          }}
        >
          <CardContent>
            <Typography variant="h6" id="comment-overlay-modal-title" gutterBottom>
              Comments
            </Typography>
            
            <div style={{ flex: "1 1 auto", overflowY: "scroll" }}>
              {comments.map((comment) => {
                return(
                    <p key = {comment.id}>{comment.content}</p>
                )
              })}
            </div>
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
      <Modal open={showEditOverlay} onClose={handleCloseEditOverlay} aria-labelledby="edit-overlay-modal-title">
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
            <Typography variant="h6" id="edit-overlay-modal-title" gutterBottom>
              Edit Post
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
            <Button onClick={handleCloseEditOverlay}>Close</Button>
            <Button onClick={handleEditSubmit} variant="contained" color="primary">
              Save Changes
            </Button>
          </CardActions>
        </Card>
      </Modal>
      <Modal open={showBioOverlay} onClose={handleCloseEditOverlay} aria-labelledby="edit-overlay-modal-title">
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
            <Typography variant="h6" id="edit-overlay-modal-title" gutterBottom>
              Edit Bio
            </Typography>
            <TextField
              label="Bio Content"
              multiline
              rows={4}
              variant="outlined"
              value={bioContent}
              onChange={handleBioChange}
              sx={{ marginBottom: "20px" }}
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleCloseBioOverlay}>Close</Button>
            <Button onClick={handleBioSubmit} variant="contained" color="primary">
              Save Changes
            </Button>
          </CardActions>
        </Card>
      </Modal>


</div>)
}