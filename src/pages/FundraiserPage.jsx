import {useParams} from "react-router-dom"
import useFundraiser from "../hooks/use-fundraiser";
import CreatePledgeForm from "../components/CreatePledgeForm";
import { useState } from "react";


function FundraiserPage() {
    //Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass
    const {id} = useParams();
    //useFundraiser returns three pieces of info, so we need to grab them all here
    const {fundraiser, isLoading, error} = useFundraiser(id)
    const [showPledgeForm, setShowPledgeForm] = useState(false);
    
    if(isLoading){
        return(<p>loading......</p>);
    }

    if(error) {
        return(<p>{error.message}</p>)
    }

    const handlePledgeSuccess = () => {
        setShowPledgeForm(false);
        // Optionally refresh fundraiser data here
    };

    return (
        <div>
            <h2>{fundraiser.title}</h2>
            <h3>Created at: {fundraiser.date_created}</h3>
            <h3>{`Status: ${fundraiser.is_open}`}</h3>
            <h3>Pledges:</h3>
            <ul>
                {fundraiser.pledges.map((pledgeData, key)=>{
                    return (
                    <li key={key}>
                        {`$${pledgeData.amount}.00 from ${pledgeData.supporter}`}
                    </li>
                    );
                })}
            </ul>
            {!showPledgeForm ? (
                <button onClick={() => setShowPledgeForm(true)}>Make a Pledge</button>
            ) : (
                <div>
                    <CreatePledgeForm fundraiserId={id} onPledgeSuccess={handlePledgeSuccess} />
                    <button onClick={() => setShowPledgeForm(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default FundraiserPage;