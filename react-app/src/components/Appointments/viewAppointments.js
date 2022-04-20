
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SessionCheck } from "../../utils/user"
import {getAppointments} from "../../store/appointments.js"


const GetAllAppointments = (user, appointments) => {
    // const appointmentsObj = useState(state => state?.appointments)
    const state = useState(state => state);
    // console.log("state get appointments", state)
    const appointmentsObj = {}
    // console.log("appointment object is... appointmentsObj")

    let appointmentsArr;
    if(appointmentsObj) appointmentsArr = Object.values(appointmentsObj)
    if(appointmentsArr !== undefined){
        // console.log("appointment array values are...", appointmentsArr)

        // console.log("index 0 of appointments array is...", appointmentsArr[0])
    }

    const appointmentMap = (user) => {
        return (
            <div>
                <ul>
                    {appointmentsArr ? appointmentsArr.map = (appointment, idx) => (
                        <li key={idx}>
                            <p>Hitting appointment number {idx}</p>
                            <button>Change </button>
                            <button>Cancel </button>
                        </li>
                    ): null}
                </ul>
            </div>

        )
    }

    return (
        <section>
            <h3>Appointments</h3>
            {appointmentMap(user)}
        </section>
    )

}

export default GetAllAppointments;
