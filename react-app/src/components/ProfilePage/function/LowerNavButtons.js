import GetAllAppointments from "../../Appointments/viewAppointments"

const LowerNavProfileButtons = ({lowerNav, user, appointments}) => {

    if(lowerNav === "Appointments"){
        return (
            <>
                {GetAllAppointments(user, appointments)}
            </>
        )
    }
    if(lowerNav === "Messages") {
        return (
            <>
                <h2>Feature coming soon</h2>
            </>
        )
    }
    if(lowerNav === "Medical Notes") {
        return (
            <>
                <h2>Feature coming soon</h2>
            </>
        )
    } else return null;
}

export default LowerNavProfileButtons;
