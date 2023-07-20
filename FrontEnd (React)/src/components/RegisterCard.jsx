import React, { PureComponent } from "react";
import { Outlet, Link } from "react-router-dom";
import "../Styles/Register.css";

class Register extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        };
    }

    handleNameChange = (event) => {
        this.setState({ name: event.target.value });
    };
    
    handleEmailChange = (event) => {
        this.setState({ email: event.target.value });
    };
    
    handlePasswordChange = (event) => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = (event) => {
        event.preventDefault();
    
        const { name, email, password } = this.state;
    
        const requestBody = {
            username: name,
            email: email,
            password: password,
        };
    
        fetch("http://localhost:8080/rest/v1/users/NewUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error(error);
            });
    };
    
    render() {
        return (
            <div className="container">
                <div className="card">
                    <h1>Register</h1>
                    <h3>Sign up to see thoughts, photos and videos from your friends.</h3>
                    <form onSubmit={this.handleSubmit}>
                    
                            <input type="text" value={this.state.name} placeholder="Username" name="Username" onChange={this.handleNameChange} />
                            <input type="text" value={this.state.email} placeholder="Email" name="Email" onChange={this.handleEmailChange}/>
                            <input type="text" value={this.state.password} placeholder="Password" name="Password" onChange={this.handlePasswordChange} />
                      
                        <input type="submit" value="Submit" />
                    </form>
                    <p>People who use our service may have uploaded your contact information to Instagram.</p>
                    <p>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy.</p>
                    <p>Already have an account? <Link to="/Login">Login</Link></p>
                </div>
                <Outlet />
            </div>
        );
    }
}

export default Register;
