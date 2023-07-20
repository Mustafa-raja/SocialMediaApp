package com.Social.Media.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String email;
    private String password;
    private String profilePicture;
    private String bio;

    public Long getid() {
		return id;
	}
	public void setid(Long id) {
		this.id = id;
	}

    public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

    public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

    public String getpassword() {
		return password;
	}
	public void setpassword(String password) {
		this.password = password;
	}

    public String getprofilePicture() {
		return profilePicture;
	}
	public void setprofilePicture(String profilePicture) {
		this.profilePicture = profilePicture;
	}

    public String getbio() {
		return bio;
	}
	public void setbio(String bio) {
		this.bio = bio;
	}

}
