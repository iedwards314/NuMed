import React from 'react';
import { NavLink, useParams } from "react-router-dom";
import { SessionCheck, UserCheck } from "../../utils/user";
import HeaderFunc from "./header";
// import GetAllAppointments from '../Appointments/viewAppointments';
import GetAllInsurance from '../Insurance/getAll-Insurance';
// import { getAppointments } from '../../store/appointments';


import "./styles/ProfilePage.css";
// import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = () => {

    const user = SessionCheck();
    const { userId }  = useParams();
    const userCheck = UserCheck(user, userId);

    if(userCheck){
        return(
            <>
                <main>
                    <HeaderFunc />
                    <section className="section-profile-body">
                      <div className="container grid grid-profile center-text" >
                          <div className="profile-left">
                              <h1>Patient Details</h1>
                              <h2>Insurance Details</h2>
                              <div className="insurance-container">
                                  <NavLink to="/insurance/create">Add Insurance</NavLink>
                                  <GetAllInsurance />
                              </div>
                          </div>
                          <div className="profile-right">
                          <p className='subheading'> Let's take the next step in helping you</p>
                              <div className='profile-page-img-container'>
                                <NavLink className="main-nav-link" to="/doctors">
                                    <img className='profile-page-img' src="https://images.unsplash.com/photo-1581595219315-a187dd40c322?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHhyYXl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" alt="Doctor looking at x-ray" />
                                </NavLink>
                              </div>
                          </div>
                      </div>
                  </section>
                </main>
            </>
        )
    }
    else{
        return (
            <h2 className="center-text">Unauthorized access 401</h2>
        )
    }

}

export default ProfilePage;
