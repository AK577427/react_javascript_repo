import {Link, Outlet} from 'react-router';


function NavBar(){
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/login">Log in</Link>
            </nav>
            <Outlet/>
        </div>
    );
};

export default NavBar;