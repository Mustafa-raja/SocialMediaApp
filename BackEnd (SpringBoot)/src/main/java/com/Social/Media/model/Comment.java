package com.Social.Media.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    private String content;

    public Long getid() {
		return id;
	}
	public void setid(Long id) {
		this.id = id;
	}

    public User getuser() {
		return user;
	}
	public void setuser(User user) {
		this.user = user;
	}   

    public Post getpost() {
		return post;
	}
	public void setpost(Post post) {
		this.post = post;
	}   

    public String getcontent() {
		return content;
	}
	public void setcontent(String content) {
		this.content = content;
	}   
}

