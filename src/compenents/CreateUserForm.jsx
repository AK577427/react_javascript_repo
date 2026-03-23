import { useState } from "react";
import { useNavigate } from "react-router-dom";

import postCreateUser from "../api/post-create-user";

function CreateUserForm(){
    const navigate = useNavigate();
    // return<h1>This is the Login Page!</h1>
    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
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
        if(credentials.username && credentials.email && credentials.password){
            postCreateUser(
            credentials.username,
            credentials.email,
            credentials.password
            ).then((response)=>{
                window.localStorage.setItem("token", response.token);
                navigate("/")
            })
        }
    }

    return(
        <form>
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
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="emial" 
                    placeholder="Email"
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
                Register
            </button>
        </form>
    )
}

export default CreateUserForm;