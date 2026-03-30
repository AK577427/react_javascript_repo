export default async function  postCreatePledge(fundraiserId,pledgeData) {
    const token = window.localStorage.getItem("token");
    // const url = `${import.meta.env.VITE_API_URL}/fundraisers/${fundraiserId}/pledges/`;
    const url = `${import.meta.env.VITE_API_URL}/pledges/`;
    const { amount, comment, anonymous } = pledgeData;
    console.log("Creating pledge with:", {
        fundraiserId,
        amount,
        comment,
        anonymous,
        url,
        // requestBody,
        token: token ? "present" : "missing"
    });

    try {

        // console.log("Pledge request sent with body:", JSON.stringify(requestBody))
        const response = await fetch(url, {
        method: "POST",
        headers:{   
            "Content-Type": "application/json",
            "Authorization": token ? `Token ${token}` : "",
        },
        body: JSON.stringify(
            pledgeData
    ),
    });
    console.log("Pledge response status:", response.status);

    if(!response.ok){
        const fallbackError = "Error creating pledge";

        const data = await response.json().catch(() =>{
            throw new Error(fallbackError);
        });
        const errorMessage = data?.detail ?? fallbackError;
        console.error("Pledge error response:", data);
        throw new Error(errorMessage);
    }
    const data = await response.json();
    console.log("Pledge created successfully:", data);
    return data;
    }catch (error) {
    console.error("Error creating pledge:", error.errorMessage);
    throw error;
    }
}