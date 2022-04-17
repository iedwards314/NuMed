
import { SessionCheck } from "../../utils/user"


const GetAllAppointments = () => {
    const user = SessionCheck();

    console.log("user in Get all apts is...", user);

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
