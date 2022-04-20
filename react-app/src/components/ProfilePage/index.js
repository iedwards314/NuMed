import React, { useState, useEffect } from 'react';
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
    // const dispatch = useDispatch();
    // const appointmentsObj = useState(state => state?.appointments)

    // useEffect(() => {
    //     dispatch(getAppointments(+userId))

    //   }, [dispatch, userId])

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
                          {/* <div className="profile-right">
                              <GetAllAppointments appointmentsObj = {appointmentsObj}/>
                          </div> */}
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
