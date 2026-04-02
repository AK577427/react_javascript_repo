import { useState } from "react";

function ProfilePage(user, onUpdateUser) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: user.username,
        email: user.email,
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser(formData);
        setIsEditing(false);
    };

    return (
        <div className="profile-page">  
            <h2>Profile</h2>
            {isEditing ? (
                <>
                <p><strong>Username:</strong> {formData.username}</p>
                <p><strong>Email:</strong> {formData.email}</p>

                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </>
            ):(
                <form onSubmit={handleSubmit}>
                    <input type="text" 
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    />
                    <input type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    />
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            )}

        </div>
    )   
}   

export default ProfilePage;