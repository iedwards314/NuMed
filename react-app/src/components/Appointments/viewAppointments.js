import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { SessionCheck } from "../../utils/user";
import { NavLink, useParams } from "react-router-dom";
import { getAppointments, deleteAppointment } from "../../store/appointments";
import './styles/Appointments.css'
import { stringCalenderDateFunc } from "./functions/calendarFuncs";
import { dbDateFrontendFunc } from "./functions/apptTimeFunc";

const GetAllAppointments = () => {
  // const user = SessionCheck();
  // console.log("user is...", user)
  const dispatch = useDispatch();
//   const [appts, setAppts] = useState({});
  const { userId } = useParams();
  const state = useSelector(state => state?.appointments.appointments)
  console.log("state GetAllApointments...", state);
  const apptsObj = useSelector((state) => state?.appointments);
  let apptsArr;
  if(apptsObj){
      apptsArr = Object.values(Object.values(apptsObj)[0])
  }
  console.log("appts...", apptsArr)

  //apptsArr[index][key] where appt[idx+1]

  // const doctorId = apptsArr[0]?.doctor_id //doctor Id
  // const doctorObj = apptsArr[0]?.doctor_info //doctor info, keys="dr_image", "dr_last_name", "dr_specialty", "dr_phone"

  // const patientObj = apptsArr[0]?.patient_info // patient info, keys="patient_first_name", "patient_last_name"


  // const variable = apptsArr[0]?.doctor_info?.dr_last_name //doctor Id

  // const formattedDate = userFormatCalendarDateFunc(apptsArr[0]?.start_date)

  // console.log("start date is...", formattedDate)

  const destroyAppt = async (e, apptId) => {
    e.preventDefault();
    const payload = {
        id: parseInt(apptId),
        user_id: userId,
    }
    // let destroyed;
    try {
      console.log("hit distroyed", payload);
        // destroyed = await dispatch(deleteAppointment(payload))
        await dispatch(deleteAppointment(payload))
    } catch (error) {
        console.log("error in delete")
    }

    // if (destroyed?.id) {
    //     history.push(`/users/${userId}`);
    // }
  }

  const editDeleteButtons = (appt) => {
    const today = new Date()
    const todayStr = stringCalenderDateFunc(today)

    console.log(appt?.start_date === `${todayStr}`, "appt.start_date is...", appt?.start_date)
    console.log()

    if(appt?.start_date !== todayStr){
      console.log("Today is not the appt date, you can have reschedule buttons")
      return (
        <>
            <NavLink to={`/appointments/edit/${appt.id}`}>
              <button>edit</button>
            </NavLink>
            <button onClick={(e) => destroyAppt(e, appt.id)}>delete</button>
        </>
      )
    } else {
      console.log("Today is the appt date, you do not get to have reschedule buttons")
      return (
        <p>This event cannot be rescheduled</p>
      )
    }
  }

  const apptMap = () => {
      return(
          <>
          <section className="container">
              <h2 className="heading-secondary">{`Hello ${apptsArr[0]?.patient_info.patient_first_name}`}</h2>
              <p className="heading-third marin-bottom-md">Your appointments are scheduled for the following...</p>
          <ul>

          {apptsArr?.map((appt, idx)=>(
            <li key={idx} className="grid grid--2--cols">
                <div className="doctor-img-container">
                    <img src={appt.doctor_info?.dr_image} alt={`Dr.${appt.doctor_info?.dr_last_name}`}/>
                </div>
                <div className="appointment-info-container">
                    <p>Dr. {appt.doctor_info?.dr_last_name}</p>
                    <p>{appt.doctor_info?.dr_specialty}</p>
                    <p>{`Specialty: ${appt.doctor_info?.dr_specialty}`}</p>
                    <p>{`Date: ${(appt.start_date)}`}</p>
                    <p>{`Start time: ${dbDateFrontendFunc(appt.start_time)}`}</p>
                    {editDeleteButtons(appt)}
                </div>
            </li>
          ))}
          </ul>
          </section>
          </>
      )
  }

//   useEffect(() => {
//     (async () => {
//       const response = await fetch(`/api/appointments/user/${userId}`);
//       const aptList = await response.json();
//       setAppts(aptList);
//     })();
//   }, [dispatch, userId]);

  useEffect(() => {
    dispatch(getAppointments(userId));
}, [dispatch, userId])


if(apptsArr && apptsArr.length > 0){

    return (
      <>
      {apptMap()}
      </>
    );
} else return ("hello")

};

export default GetAllAppointments;
