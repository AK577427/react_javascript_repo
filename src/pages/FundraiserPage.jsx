import {useParams} from "react-router-dom"
import useFundraiser from "../hooks/use-fundraiser";
import CreatePledgeForm from "../components/CreatePledgeForm";
import { useState } from "react";
import "./FundraiserPage.css"


function FundraiserPage() {
    //Here we use a hook that comes for free in react router called `useParams` to get the id from the URL so that we can pass
    const {id} = useParams();
    //useFundraiser returns three pieces of info, so we need to grab them all here
    
    const [refresh, setRefresh] = useState(0);
    const {fundraiser, isLoading, error} = useFundraiser(id,refresh)
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
        setRefresh(prev => prev + 1); // Trigger a re-render to refresh the fundraiser data
    };

    return (
        <div className="card-container">
        <div className="card-content">
            <div className="card-left">
                <h2>{fundraiser.title}</h2>
                <img src={fundraiser.image} alt={fundraiser.title} />
                <ul>
                    <h2>{fundraiser.description}</h2>
                    <p>Created at: {new Date(fundraiser.date_created).toLocaleDateString('en-AU', {
                        day: '2-digit',month: '2-digit',year: 'numeric',
                        hour: '2-digit',minute: '2-digit',hour12: true
                    })}</p>
                    <p>Goal: ${fundraiser.goal.toFixed(2)}</p>
                    {(() => {
                    const raised = fundraiser.pledges.reduce((sum, p) => sum + p.amount, 0);
                    const percent = Math.min((raised / fundraiser.goal) * 100, 100).toFixed(1);
                    return (
                        <div className="progress-section">
                        <div className="progress-labels">
                            <span>${raised.toFixed(2)} raised</span>
                        </div>
                        <div className="progress-bar">
                        <div className="progress-fill" style={{ width: `${percent}%` }} />
                        </div>
                        <p className="progress-percent">{percent}% funded</p>
        </div>
    );
})()}
                    <p>{`Status: ${fundraiser.is_open ? 'Open' : 'Closed'}`}</p>
                </ul>
                {!showPledgeForm ? (
                <button onClick={() => setShowPledgeForm(true)}>Make a Pledge</button>
            ) : (
                <div className="pledge-form">
                    <CreatePledgeForm fundraiserId={id} onPledgeSuccess={handlePledgeSuccess} />
                    <button onClick={() => setShowPledgeForm(false)}>Cancel</button>
                </div>
            )} 
            </div>

            <div className="card-right">
                <h3>Pledges:</h3>
                <ul>
                    {fundraiser.pledges.map((pledgeData, key)=>{
                        return (
                        <li key={key}>
                            {pledgeData.anonymous
                            ? `$${pledgeData.amount}.00 from Anonymous`
                            : `$${pledgeData.amount}.00 from ${pledgeData.supporter}`}
                        </li>
                        );
                    })}
                </ul>
            </div>
        </div>
        </div>
    );
};

export default FundraiserPage;