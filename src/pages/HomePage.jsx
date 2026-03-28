// import { allFundraisers } from "../data";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard"
import './HomePage.css'

function HomePage() {

const {fundraisers} = useFundraisers()
    // const {fundraisers, isLoading, error} = useFundraisers();

    
    // if(isLoading){
    //     return(<p>loading......</p>);
    // }

    // if(error) {
    //     return(<p>{error.message}</p>)
    // }

    return (
        <div id="fundraiser-list">
            {fundraisers.map((fundraiserData, key)=>{
                // return <div key={key}>{fundraiserData.title}</div>;
                return <FundraiserCard key={key} fundraiserData={fundraiserData}/>
            })}
        </div>
    );
};

export default HomePage;