

const GetAllAppointments = ({user}) => {

    const appointmentMap = (user) => {
        return (
            <div>
                <ul>
                    <li>
                        <p>{`${user?.last_name} Test Object Access`}</p>
                        <p>Date of Appointment</p>
                        <p>Doctor</p>
                        <p>Description</p>
                        <button>Change </button>
                        <button>Cancel </button>
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
