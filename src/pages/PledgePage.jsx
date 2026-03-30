import { useParams } from "react-router-dom";
import CreatePledgeForm from "../components/CreatePledgeForm";

function PledgePage() {
    const {id} = useParams();
    const navigate = useNavigate();

    const handlePledgeSuccess = () => {
    navigate(`/fundraiser/${id}`);
    };

    return (
        <div>
            <h2>Make a Pledge</h2>
            <CreatePledgeForm fundraiserId={id} onPledgeSuccess={handlePledgeSuccess} />
        </div>
    );
}

export default PledgePage;