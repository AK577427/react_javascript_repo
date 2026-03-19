// import { allFundraisers } from "../data";
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../compenents/FundraiserCard"
import './HomePage.css'

function HomePage() {

const {fundraisers} = useFundraisers();

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