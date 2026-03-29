import {useAuth} from "../hooks/use-auth.js";

async function postCreateFundraiser(title,description,goal,image,is_open, token){
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

      const authHeader = token.startsWith("Token ") || token.startsWith("Bearer ")
    ? token
    : `Token ${token}`;
    
    const url = `${import.meta.env.VITE_API_URL}/fundraisers/`;

    const response = await fetch(url, {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": authHeader,
        },
        body: JSON.stringify({
            "title": title,
            "description": description,
            "goal": goal,
            "image":image,
            "is_open": is_open,
        }),
    });

    
    if(!response.ok){
        const fallbackError = "Error creating fundraiseer";

        const data = await response.json().catch(() =>{
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
    }

    return await response.json();
    
}

export default postCreateFundraiser;