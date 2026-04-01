import {Link} from "react-router-dom";
// import "./FundraiserCard.css"
import "../pages/HomePage.css"

function FundraiserCard(props){
    const {fundraiserData}= props;
    // const fundraiserData = props.fundraiserData;
    const fundraiserLink = `fundraiser/${fundraiserData.id}`;
    
    return(
        <div className="fundraiser-card">
            <img src={fundraiserData.image} alt="image"/>
            <h3>{fundraiserData.title}</h3>
            <Link to={fundraiserLink} className="view-btn">
                View Details 
            </Link>

        </div>
       );

};

export default FundraiserCard;