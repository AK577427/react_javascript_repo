import {Link, Outlet} from 'react-router-dom';
import {useAuth} from "../hooks/use-auth.js"; 
import "./NavBar.css"
import logo from "../images/countonme_1.jpeg";


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
                <Link to="/" className="logo"><img src={logo} alt="CountOnMe" /></Link>
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