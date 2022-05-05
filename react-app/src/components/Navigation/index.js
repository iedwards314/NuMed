import "./styles/navigation.css"
import LoggedInNav from "./loggedIn";
import LoggedOutNav from "./loggedOut";
import { SessionCheck } from "../../utils/user";
import logo from "../../logos/NuMed-Logo-blue.png"
import { NavLink } from "react-router-dom";

const Navigation = () => {

    const user = SessionCheck();

    const logoNavLinks = () => {
        return(
            <>
                <NavLink to="/">
                    <img className="logo" alt="NuMed logo" src={logo} />
                </NavLink>
                <NavLink className="main-nav-link" to="/doctors">
                    <div>Doctors</div>
                </NavLink>
                {(user?.doctor_id) ? <NavLink className="main-nav-link" to="/patients"><div>Patients</div></NavLink> : null}
            </>
        )
    }

    if(user){
        return (
            <header className="header">
                {logoNavLinks()}
                <LoggedInNav />
            </header>
        )
    } else {
        return (
            <header className="header">
                {logoNavLinks()}
                <LoggedOutNav />
            </header>
        )
    }
}

export default Navigation;
