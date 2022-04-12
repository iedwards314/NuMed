
import React from 'react';
import { NavLink } from 'react-router-dom';

const LoggedOutNav = () => {
  return (
    <nav className="main-nav">
      <ul class="main-nav-list">
        <li>
          <NavLink className="main-nav-link" to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink className="main-nav-link nav-cta" to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default LoggedOutNav;
