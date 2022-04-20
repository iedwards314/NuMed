import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { UserCheck } from "../../utils/user";
import HeaderFunc from "./header";
import ProfileBody from "./profileBody";
import {getAppointments} from "../../store/appointments.js";
import { getInsurancePolicies } from "../../store/insurance";

import "./styles/ProfilePage.css";
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage = () => {
  const dispatch = useDispatch()
  //appointments, insurance

    const [user, setUser] = useState({});
    const appointments = useSelector((state) => state.session?.appointments?.appointments)
    console.log("appointments in profile page are...", appointments)
    const { userId }  = useParams();

    console.log("user in 'profile page index'...", user);


    useEffect(() => {
      if (!userId) {
        return;
      }
      (async () => {
        const response = await fetch(`/api/users/${userId}`);
        const user = await response.json();
        setUser(user);
      })();
      dispatch(getAppointments(userId))
    }, [dispatch, userId, appointments])

    if (!user) {
      return null;
    }

    const userCheck = UserCheck(user, userId);

    if(userCheck){
        return(
            <>
                <main>
                    <HeaderFunc />
                    <ProfileBody user={user} appointments={appointments} />
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
