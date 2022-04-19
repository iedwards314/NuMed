
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { SessionCheck } from "../../utils/user"
import {getAppointments} from "../../store/appointments.js"


const GetAllAppointments = () => {
    const user = SessionCheck();
    const dispatch = useDispatch();

    console.log("user in Get all apts is...", user);
    const appointmentsObj = user?.appointments;
    let appointmentsArr;
    if(appointmentsObj) appointmentsArr = Object.values(appointmentsObj)
    if(appointmentsArr !== undefined){
        console.log("appointment array values are...", appointmentsArr)

        console.log("index 0 of appointments array is...", appointmentsArr[0])
    }


    useEffect(() => {
        dispatch(getAppointments(user.id))
    },[dispatch])


    const appointmentMap = (user) => {
        return (
            <div>
                <ul>
                    <li>
                        <br />
                        <br />
                        <br />
                        <p>{`${user?.first_name} ${user?.last_name}'s, appointment list `}</p>
                        <p>Example Appointment</p>
                        <p>Example Doctor</p>
                        <p>Example Description</p>
                        <br />
                        <br />
                        <br />
                        <button>eChange </button>
                        <button>eCancel </button>
                    </li>
                </ul>
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
