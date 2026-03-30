import { useState } from "react";
import LoginForm from  "../components/LoginForm";

function LoginPage(props) {
    const [error, setError] = useState(null);

    // return <h1>This is the Login Page!</h1>
    return (
    <LoginForm showalert={props.showalert} 
    error={error} setError={setError}/>
    );
}

export default LoginPage;