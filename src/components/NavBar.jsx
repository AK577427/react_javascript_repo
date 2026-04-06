import {Link, Outlet} from 'react-router-dom';
import {useAuth} from "../hooks/use-auth.js"; 
import "./NavBar.css"


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
                <Link to="/"><img src="/src/images/countonme_1.jpeg" alt="CountOnMe" /></Link>
                {auth.token ? 
                (<div>
                   <Link to="/create-fundraiser">Create Fundraiser</Link>
                   <Link to="/contact">Contact Us</Link>
                   <Link to="/" onClick={handleLogout}>Log Out</Link>
                </div>
                ) : (
                    <div>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link> 
                        <Link to="/create-fundraiser">Create Fundraiser</Link>
                        <Link to="/contact">Contact Us</Link>
                </div>
                )}
                           
                
           </nav>
            <Outlet/>
        </div>
    );
};

export default NavBar;