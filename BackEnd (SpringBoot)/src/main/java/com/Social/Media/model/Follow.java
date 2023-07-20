package com.Social.Media.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "follows")
public class Follow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "follower_id")
    private User follower;

    @ManyToOne
    @JoinColumn(name = "following_id")
    private User following;

    public Long getid() {
		return id;
	}
	public void setid(Long id) {
		this.id = id;
	}

    public User getFollower() {
		return follower;
	}
	public void setFollower(User follower) {
		this.follower = follower;
	}   

    public User getfollowing() {
		return following;
	}
	public void setfollowing(User following) {
		this.following = following;
	}   
}
