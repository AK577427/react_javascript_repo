import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";
import postLogin from "../api/post-login.js";
import "./Form.css"

function LoginForm(props){
    const navigate = useNavigate();
    const { setAuth } = useAuth();
    const [error, setError] = useState(null);

    // Display error message if it exists
    // {setError && <p className="form-error">{setError}</p>}
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
        setError(null); // Clear previous error messages
        if (!credentials.username || !credentials.password) {
            setError("Enter username and password");
            return;
        }
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
                setError("Login failed. Please check your username and password and try again.");
            })
        }
    }

    return(
        <div className="form-page">
        <div className="form-container">
        <h2>Login</h2>
        <form>
            {error && <p className="form-error">{error}</p>}            
            {props.showalert && <p>Please log in to create a new fundraiser</p>}
            <div>
                <label htmlFor="username">Username*:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Password*:</label>
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
        </div>
        </div>
    )
}

export default LoginForm;