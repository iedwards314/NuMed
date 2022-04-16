import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import GetAllInsurance from '../Insurance/getAll-Insurance';
import LowerNavProfileButtons from './function/LowerNavButtons';

const ProfileBody = (user) => {
    const [lowerNav, setLowerNav] = useState("")
    const insurance = user?.insurance_policies

    useEffect (()=> {
        LowerNavProfileButtons(lowerNav)
        if(!lowerNav) setLowerNav("Appointments")
    }, [lowerNav, insurance])

    console.log("user in profile page is...", user);

    return (
        <section className="section-profile-body">
            <div className="container grid grid-profile center-text" >
                <div className="profile-left">
                    <h1>Patient Details</h1>
                    <h2>Insurance Details</h2>
                    <div className="insurance-container">
                        <NavLink to="/insurance/create">Add Insurance</NavLink>
                        <GetAllInsurance user={user} />
                    </div>
                </div>
                <div className="profile-right">
                    <ul className="profile-nav-list">
                        <li className="profile-nav-item">
                            <div onClick={() => setLowerNav("Appointments")}>
                                Appointments
                            </div>
                        </li>
                        <li className="profile-nav-item">
                            <div onClick={() => setLowerNav("Messages")}>
                                Messages
                            </div>
                        </li>
                        <li className="profile-nav-item">
                            <div onClick={() => setLowerNav("Medical Notes")}>
                                Medical Notes
                            </div>
                        </li>
                    </ul>
                    <h2>{`View ${lowerNav}`}</h2>
                    <LowerNavProfileButtons lowerNav={lowerNav} user={user} />

                </div>
            </div>
        </section>
    )
}

export default ProfileBody;
