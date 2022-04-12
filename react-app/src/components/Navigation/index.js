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
                    <img class="logo" alt="NuMed logo" src={logo} />
                </NavLink>
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
