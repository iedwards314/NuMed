
import React from "react";
import { NavLink } from "react-router-dom";
import { SessionCheck } from "../../utils/user";
import LogoutButton from "../auth/LogoutButton";

const LoggedInNav = () => {
  const user = SessionCheck();
  return (
    <nav className="main-nav">
      <ul className="main-nav-list">
      <li>
          <NavLink className="main-nav-link" to={`/appointments/user/${user.id}`} exact={true} activeClassName="active">
            My Appointments
          </NavLink>
        </li>
        <li>
          <NavLink className="main-nav-link" to={`/users/${user.id}`} exact={true} activeClassName="active">
            My Profile
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
  );
}

export default LoggedInNav;
