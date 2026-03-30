import { useState } from "react";
import {useNavigate} from "react-router-dom";
import postCreatePledge from "../api/post-create-pledge";

export default function CreatePledgeForm({fundraiserId,onPledgeSuccess}){
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [pledgeData, setPledgeData] = useState({
            amount: "",
            comment: "",
            anonymous: false,
            fundraiser: fundraiserId
    });

    const handleChange = (event) => {
    const { id, value } = event.target;
    setPledgeData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    setLoading(true);  

    if (!pledgeData.amount || pledgeData.amount <= 0) {
      setError("Please enter a valid pledge amount");
      setLoading(false);
      return;
    }

    postCreatePledge(fundraiserId, pledgeData)
    .then((response) => {
        console.log("Pledge created successfully:", response);
        setPledgeData({
            amount: "",
            comment: "",
            anonymous: false,
            fundraiser: fundraiserId
        });
        if (onPledgeSuccess) onPledgeSuccess(response);
        navigate(`/fundraiser/${fundraiserId}`);
    })
    .catch((error) => {
        console.error("Error creating pledge:", error);
        setError(error.message || "An error occurred while creating the pledge.");
    })
    .finally(() => {
        setLoading(false);
    });     
    };
    return(
        <form>
        {/* // <div className="create-pledge"> */}
            <h2>Make a Pledge</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
                <label htmlFor="amount">Amount:*</label>
                <input
                    type="number"
                    id="amount"
                    value={pledgeData.amount}
                    placeholder="Enter pledge amount" required
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="comment">Comment:</label>
                <textarea
                    id="comment"
                    value={pledgeData.comment}
                    placeholder="Optional comment" 
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="anonymous">
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={pledgeData.anonymous}
                        onChange={handleChange}
                    />
                    Pledge anonymously
                </label>
            </div>
            <button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating Pledge..." : "Create Pledge"}
            </button>
        </form>
    )
};

