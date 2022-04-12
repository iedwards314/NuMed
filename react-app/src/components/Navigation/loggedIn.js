
import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const LoggedInNav = () => {
  return (
    <nav className="main-nav">
      <ul class="main-nav-list">
        <li>
          <NavLink className="main-nav-link" to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="main-nav-link" to="/users" exact={true} activeClassName="active">
            Users
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
