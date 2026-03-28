import {  useState } from "react";
import { useNavigate } from "react-router-dom";

import postCreateFundraiser from "../api/post-create-fundraiser";

function CreateFundraiserForm(){
    const navigate = useNavigate();
    // const [token, setToken] = useState(() => window.localStorage.getItem("token"));
    // const token = window.localStorage.getItem("token");
    const [credentials, setCredentials] = useState({
            title: "",
            description: "",
            goal: "",
            image: "",
            is_open: false
    });

    const handleChange = (event)=>{
        const {id, value} = event.target;
        setCredentials((prevCredentials)=>({
            ...prevCredentials,
            [id]:value
        }));

    };

    const handleSubmit = (event)=>{
        event.preventDefault();
        if(credentials.title && credentials.description && credentials.goal && credentials.image && credentials.is_open){
            postCreateFundraiser(
            credentials.title,
            credentials.description,
            credentials.goal,
            credentials.image,
            credentials.is_open,
            ).then((response)=>{
                // window.localStorage.setItem("token", response.token);
                // console.log(response.token);
                navigate(`/fundraiser/${response.id}`)
            }).catch((error)=>{
                console.error("Error creating fundraiser:", error);
            })
            console.log(credentials)

        }
    }

    return(
        <form>
           <div>
                <label htmlFor="title">Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    placeholder="Enter title" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:</label>
                <input 
                    type="text" 
                    id="description" 
                    placeholder="Enter description" 
                    onChange={handleChange}                
                />
            </div>
            <div>
                <label htmlFor="goal">Goal:</label>
                <input 
                    type="number" 
                    id="goal" 
                    placeholder="Enter goal" 
                    onChange={handleChange}                
                />
            </div>
            <div>
                <label htmlFor="image">Image URL:</label>
                <input 
                    type="text" 
                    id="image" 
                    placeholder="Enter image URL" 
                    onChange={handleChange}                
                />
            </div>
            <div>
                <label htmlFor="is_open">Is Open:</label>
                <input 
                    type="checkbox" 
                    id="is_open" 
                    onChange={handleChange}                
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Create Fundraiser
            </button>
        </form>
    )
}

export default CreateFundraiserForm;