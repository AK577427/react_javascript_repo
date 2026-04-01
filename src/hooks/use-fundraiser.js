import { useState, useEffect } from "react";

import getFundraiser from "../api/get-fundraiser";

export default function useFundraiser(fundraiserId, refresh) {
    const [fundraiser, setFundraiser] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(()=> {
        // Here we pass fundraiser Id to the ferFundraiser func
        console.log("Fetching fundraiser with ID:", fundraiserId);
        console.log("Refresh state:", refresh);
        getFundraiser(fundraiserId)
        .then((fundraiser)=>{
            setFundraiser(fundraiser);
            setIsLoading(false);
        })
        .catch((error)=> {
            setError(error);
            setIsLoading(false);
        })
        //This time we pass the fundraiserId to the dependency array so that the hook will re-run if the fundraiserId changes.
    }, [fundraiserId, refresh]);

    return {fundraiser, isLoading, error};
}