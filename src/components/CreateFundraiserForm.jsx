import {  useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import postCreateFundraiser from "../api/post-create-fundraiser";

function CreateFundraiserForm(){
    const navigate = useNavigate();
    const [token, setToken] = useState(() => window.localStorage.getItem("token"));
    // const token = window.localStorage.getItem("token");
    const [credentials, setCredentials] = useState({
            title: "",
            description: "",
            goal: "",
            image: "",
            is_open: false
    });
    const [error, setError] = useState(null);

    useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true }); // Redirect if no token
    }
  }, [token, navigate]);


    const handleChange = (event)=>{
        const {id, value, type, checked} = event.target;
        setCredentials((prev)=>({
            ...prev,
            [id]: type === "checkbox" ? checked : value
        }));

    };

    const handleSubmit = (event)=>{
        event.preventDefault();

        if (!credentials.title || !credentials.description || !credentials.goal || !credentials.image) {
            setError("Please fill all required fields.");
        return;
        }

        if(!credentials.is_open){
            setError("Please specify if the fundraiser is open.");
            return;
        }

        if(credentials.title && credentials.description && credentials.goal && credentials.image && credentials.is_open){
            postCreateFundraiser(
            credentials.title,
            credentials.description,
            credentials.goal,
            credentials.image,
            credentials.is_open,
            token
            ).then((response)=>{
                // window.localStorage.setItem("token", response.token);
                // console.log(response.token);
                navigate(`/fundraiser/${response.id}`)
            }).catch((error)=>{
                console.error("Error creating fundraiser:", error);
                setError(error.message ?? "Could not create fundraiser");
            })
            console.log(credentials)

        }
    }

    return(
        <div className="create-fundraiser">
            <h2>Create Fundraiser</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
        <form>
           <div>
                <label htmlFor="title">Title:*</label>
                <input 
                    type="text" 
                    id="title" 
                    placeholder="Enter title" required
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="description">Description:*</label>
                <input 
                    type="text" 
                    id="description" 
                    placeholder="Enter description" required
                    onChange={handleChange}                
                />
            </div>
            <div>
                <label htmlFor="goal">Goal:*</label>
                <input 
                    type="number" 
                    id="goal" 
                    placeholder="Enter goal" required
                    onChange={handleChange}                
                />
            </div>
            <div>
                <label htmlFor="image">Image URL:*</label>
                <input 
                    type="text" 
                    id="image" 
                    placeholder="Enter image URL" required
                    onChange={handleChange}                
                />
            </div>
            <div>
                <label htmlFor="is_open">Is Open:*</label>
                <input 
                    type="checkbox" 
                    id="is_open" 
                    checked={credentials.is_open}
                    onChange={handleChange}                
                />
            </div>
            <button type="submit" onClick={handleSubmit}>
                Create
            </button>
        </form>
        </div>
    )
}

export default CreateFundraiserForm;