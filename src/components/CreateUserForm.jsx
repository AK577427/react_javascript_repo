import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import postCreateUser from "../api/post-create-user";
import "./Form.css"


function CreateUserForm(){
    const navigate = useNavigate();
    const [token, setToken] = useState(null);
    const [error, setError] = useState(null);

    const [credentials, setCredentials] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    
    useState(() => {
    // useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    setToken(storedToken);
    }, []);

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
        if (!credentials.username || !credentials.email || !credentials.password || !credentials.confirmPassword) {
            setError("Please fill all fields");
            return;
        }
        if (credentials.password !== credentials.confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        // console.log("I m trying debug", credentials);
        if(credentials.username && credentials.email && credentials.password){
            postCreateUser(
            credentials.username,
            credentials.email,
            credentials.password
            ).then((response)=>{
                window.localStorage.setItem("token", response.token);
                navigate("/login");
            }).catch((error)=>{
                console.error("Error creating user:", error);
            })
        }
    }

    return(
        <div className="form-page">
        <div className="form-container">
        <h2>Be part of something meaningful—register now.</h2>
        <form>
            {error && <p className="form-error">{error}</p>}            <div>
                <label htmlFor="username">Username*:</label>
                <input 
                    type="text" 
                    id="username" 
                    placeholder="Enter username" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="email">Email*:</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="Email"
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
            <div>
            <label htmlFor="confirmPassword">Confirm Password*:</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Join
            </button>
        </form>
        </div>
        </div>
    )
}

export default CreateUserForm;