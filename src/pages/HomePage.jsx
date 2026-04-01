// import { allFundraisers } from "../data";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard"
import './HomePage.css'

function HomePage() {

    const {fundraisers, isLoading, error} = useFundraisers();

    
    if(isLoading){
        return(<p>loading......</p>);
    }

    if(error) {
        return(<p>{error.message}</p>)
    }

    return (
        <div className="homepage">
            <h1>Discover Fundraisers</h1>
            <div className="fundraiser-container">
            <div className="fundraiser-list">
                {fundraisers.map((fundraiserData, key)=>{
                // return <div key={key}>{fundraiserData.title}</div>;
                    return <FundraiserCard key={key} fundraiserData={fundraiserData}/>
                })}
            </div>
            </div>
        </div>
    );
};

export default HomePage;