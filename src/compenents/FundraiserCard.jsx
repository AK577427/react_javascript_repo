import {Link} from "react-router-dom";
import "./FundraiserCard.css"

function FundraiserCard(props){
    const {fundraiserData}= props;
    // const fundraiserData = props.fundraiserData;
    const fundraiserLink = `fundraiser/${fundraiserData.id}`;
    
    return(
        <div className="fundraiser-card">
            <Link to={fundraiserLink}>
            <img src={fundraiserData.image} alt="image"/>
            <h3>{fundraiserData.title}</h3>
            <button>Make a Pledge</button>
            <button>Details</button>
            </Link>
        </div>
       );

};

export default FundraiserCard;