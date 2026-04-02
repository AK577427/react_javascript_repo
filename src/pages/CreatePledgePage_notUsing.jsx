import { useParams,useNavigate } from "react-router-dom";
import CreatePledgeForm from "../components/CreatePledgeForm";

function CreatePledgePage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const handlePledgeSuccess = () => {
    navigate(`/fundraiser/${id}`);
    };

    return (
        <div>
            <h2>Making a pledge for Fundraiser {id}</h2>
            <CreatePledgeForm fundraiserId={id} onPledgeSuccess={handlePledgeSuccess} />
        </div>
    );
}

export default CreatePledgePage;