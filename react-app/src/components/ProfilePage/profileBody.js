import React from 'react';
import { NavLink } from 'react-router-dom';
// import { SessionCheck } from '../../utils/user';
import GetAllInsurance from '../Insurance/getAll-Insurance';

const ProfileBody = () => {
    // const user = SessionCheck();


    return (
        <section className="section-profile-body">
            <div className="container grid grid-profile center-text" >
                <div className="profile-left">
                    <h1>Patient Details</h1>
                    <h2>Insurance Details</h2>
                    <div className="insurance-container">
                        {GetAllInsurance()}
                        <NavLink to="/insurance/create">Add/Update Insurance</NavLink>
                    </div>
                </div>
                <div className="profile-right">
                    <ul className="profile-nav-list">
                        <li className="profile-nav-item">Appointments</li>
                        <li className="profile-nav-item">Messages</li>
                        <li className="profile-nav-item">Medical Notes</li>
                    </ul>
                    <h1>Patient Objects</h1>

                </div>
            </div>
        </section>
    )
}

export default ProfileBody;
