import {Link, Outlet} from 'react-router';
import {useAuth} from "../hooks/use-auth.js"; 


function NavBar(){
    const {auth, setAuth} = useAuth();

    const handleLogout = () => {
        window.localStorage.removeItem("token");
        setAuth({ token: null });
    };

    console.log(auth);
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                {auth.token ? 
                (<div>
                   <Link to="/create-fundraiser">Create Fundraiser</Link>
                   <Link to="/" onClick={handleLogout}>Log Out</Link>
                </div>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link> 
                        <Link to="/create-fundraiser">Create Fundraiser</Link>
                </div>
                )}
                           
                
           </nav>
            <Outlet/>
        </div>
    );
};

export default NavBar;