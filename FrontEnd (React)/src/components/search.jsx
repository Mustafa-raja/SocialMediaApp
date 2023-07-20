import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Card, CardContent, CardActions, Button, Modal, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

export default function Search({ userId }) {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [follower, setFollower] = useState([]);
    const [reRender , setReRender] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            fetch(`http://localhost:8080/rest/v1/users/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                   
                    console.log(data);
                    setUsers(data);
                })
                .catch((error) => {
                   
                    console.error(error);
                });

            fetch(`http://localhost:8080/rest/v1/users/FollowSpecific?id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    setFollower(data);
                })
                .catch((error) => {
             
                    console.error(error);
                });
        };

        fetchData();
    }, [userId,reRender]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFollow = ( user) =>{
        fetch(`http://localhost:8080/rest/v1/users/NewFollow?followerId=${userId}&followingIder=${user.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
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
    const filteredUsers = users.filter((user) =>
        user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <TextField
                label="Search Users"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
            />

            {filteredUsers.map((user) => (
                <Card key={user.id}>
                    <CardContent>
                        <Typography variant="h6">{user.username}</Typography>
                    </CardContent>
                    <CardActions>
                        <CardActions>
                            {follower.some((item) => item.following.id === user.id) ? (
                                <Button onClick= {()=>handleFollow(user)} startIcon={<RemoveCircleOutlineIcon />}> Unfollow</Button>
                            ) : (
                                <Button onClick= {()=>handleFollow(user)} startIcon={<AddIcon />}> Follow</Button>
                            )}
                        </CardActions>
                    </CardActions>
                </Card>
            ))}
        </div>
    );
}
