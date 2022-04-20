
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SessionCheck } from "../../utils/user"
import {getAppointments} from "../../store/appointments.js"
import { useParams } from "react-router-dom";


const GetAllAppointments = ({appointmentsObj}) => {

    const user = SessionCheck()
    console.log("user is...", user)
    const dispatch = useDispatch()
    const {userId} = useParams()
    const state = useState(state => state);

    console.log("state in get all appointments is...", appointmentsObj)


    // useEffect(() => {
    //     dispatch(getAppointments(+userId))
    //     console.log("in use effect state",state);
    //   }, [dispatch, userId])

    return (
        <>
            <ul>
                <li key="1">Got this rending no errors</li>
            </ul>
        </>
    )

}

export default GetAllAppointments;
