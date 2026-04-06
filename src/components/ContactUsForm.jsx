import { useState } from "react";   
import { useNavigate } from "react-router-dom";
import "./Form.css";


function ContactUsForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [ submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); // Clear previous error messages
        // Here you would typically send the form data to a server
        if (!formData.name || !formData.email || !formData.message) {
            setError("All fields are required");
        return;
        }
        setSubmitted(true);
        navigate("/"); // Redirect to home page after submission
    };
    
    console.log("contact form submitted:",formData);

    return (
        <div className="form-page">
        <div className="form-container">
            {submitted ? (
                <p>Thank you for reaching out! We will get back to you shortly.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <p className="form-error">{error}</p>}
                    {/* <p>Have a question about a fundraiser, or need help with your account? 
                    We'd love to hear from you.
                    </p> */
                    }
                    <h2>Need help? We’d love to hear from you.</h2>
                    <label htmlFor="name">Name*:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={formData.name} 
                        onChange={handleChange}  />
                    <label htmlFor="email">Email*:</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange}  />
                    <label htmlFor="message">Message*:</label>
                    <textarea id="message" value={formData.message} onChange={handleChange}  />
                    <button type="submit">Send Message</button>
                </form>
            )}
        </div>
        </div>
    );
}

export default ContactUsForm; 