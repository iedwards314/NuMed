import React from 'react';
import { NavLink, useParams } from "react-router-dom";
import { SessionCheck, UserCheck, DocCheck } from "../../utils/user";
import HeaderFunc from "./header";
import PatientView from './Patient';
import DoctorView from './Doctor';
import GetAllInsurance from '../Insurance/getAll-Insurance';


import "./styles/ProfilePage.css";

const ProfilePage = () => {

    const user = SessionCheck();
    const { userId }  = useParams();
    const userCheck = UserCheck(user, userId);

    if(userCheck){

        DocCheck(user); // use utility to establish a doctor view vs a patient view
        if(DocCheck(user) === false){
            return(
                <>
                    <main>
                        <HeaderFunc />
                        <PatientView />
                    </main>
                </>
            )
        }
        else {
            return(
                <>
                    <main>
                        <HeaderFunc />
                        <DoctorView />
                    </main>
                </>
            )
        }
    }
    else{
        return (
            <section className="section-unauthorized-access">
                <div className="center-text">
                    <h2 className="heading-secondary unathorized-header">Unauthorized access 401</h2>
                    <img className="unathorized-image" src="https://images.unsplash.com/photo-1612943680768-d82060323fd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Disappointed doctor" />
                </div>
            </section>
        )
    }

}

export default ProfilePage;
