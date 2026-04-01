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
            anonymous: "",
            fundraiser: fundraiserId
    });


    const handleChange = (event) => {
    const { id, value, type, checked } = event.target;
    setPledgeData((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
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

        const cardNumber = pledgeData.cardNumber?.replace(/\s/g, "");
        if (!cardNumber) {
            setError("Card number is required");
            setPledgeData(prev => ({ ...prev, cardNumber: "" }));
            setLoading(false);
        return;
        }
        else if (!/^\d+$/.test(cardNumber)) {
            setError("Card number must contain only digits");
            setPledgeData(prev => ({ ...prev, cardNumber: "" }));
            setLoading(false);
            return;
        }
        else if (cardNumber.length < 13 || cardNumber.length > 19) {
            setError("Card number must be between 13 and 19 digits");
            setPledgeData(prev => ({ ...prev, cardNumber: "" }));
            setLoading(false);
            return;
        }
        
        if (!/^\d{2}\/\d{2}$/.test(pledgeData.expiry)) {
            setError("Expiry must be in MM/YY format");
            setPledgeData(prev => ({ ...prev, expiry: "" }));
            setLoading(false);  
            return;
        }

        if (!/^\d{3,4}$/.test(pledgeData.cvv)) {
            setError("CVV must be 3 or 4 digits");
            setPledgeData(prev => ({ ...prev, cvv: "" }));
            setLoading(false);
            return;
        }

        postCreatePledge(fundraiserId, pledgeData)
        .then((response) => {
            console.log("Pledge created successfully:", response);
//             //{
//     "id": 134,
//     "amount": 22,
//     "comment": "cvbhsdfh",
//     "anonymous": true,
//     "fundraiser": 34
// }
            setPledgeData({
                amount: "",
                comment: "",
                anonymous: false,
                fundraiser: fundraiserId
            });
            if (onPledgeSuccess) onPledgeSuccess(response);
            // navigate(`/fundraiser/${fundraiserId}`, { replace: true });
            navigate(`/fundraiser/${fundraiserId}`);//REMOVE IT LATER
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
        <div className="form-container">
        <form>
            <h2 >Make a Pledge</h2>
                {error && <p className="form-error">{error}</p>}            <div>
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
                <label htmlFor="cardNumber">Card Number:*</label>
                <input
                    type="text"
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="expiry">Expiry Date:*</label>
                <input
                    type="text"
                    id="expiry"
                    placeholder="MM/YY"
                    maxLength="5"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="cvv">CVV:*</label>
                <input
                    type="text"                    
                    id="cvv"
                    placeholder="123"
                    maxLength="4"
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
            <div className="form-container-checkbox">
                <label htmlFor="anonymous">Pledge anonymously:</label>
                    <input
                        type="checkbox"
                        id="anonymous"
                        checked={pledgeData.anonymous}
                        onChange={handleChange}
                    />
            </div>
            <button type="submit" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating Pledge..." : "Create Pledge"}
            </button>
            {/* <button onClick={() => navigate(`/fundraiser/${fundraiserId}`)}>Cancel</button> */}
        </form>
        </div>
    )
};

