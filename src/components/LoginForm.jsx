import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../hooks/use-auth.js"

import postLogin from "../api/post-login.js";

function LoginForm(props){
    const navigate = useNavigate();
    const {auth, setAuth} = useAuth();
    // return<h1>This is the Login Page!</h1>
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    })

    const handleChange = (event)=>{
        const {id, value} = event.target;
        setCredentials((prevCredentials)=>({
            ...prevCredentials,
            [id]:value
        }));

    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(credentials.username && credentials.password){
            postLogin(
            credentials.username,
            credentials.password
            ).then((response)=>{
                window.localStorage.setItem("token", response.token);
                setAuth({token: response.token});
                if(props.showalert){
                    navigate("/create-fundraiser")
                } else{
                    navigate("/")
                }
            }).catch(()=>{
               alert("Login failed. Please check your username and password and try again.");
            })
        }
    }

    return(
        <form>
            {props.showalert && <p>Please log in to create a new fundraiser</p>}
            <div>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="Password"
                    onChange={handleChange}                
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Login
            </button>
        </form>
    )
}

export default LoginForm;