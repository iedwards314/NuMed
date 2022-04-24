import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAppointments, deleteAppointment } from "../../store/appointments";
import './styles/Appointments.css';
import { dbDateFrontendFunc } from "./functions/apptTimeFunc";
import { UserCheck, SessionCheck } from "../../utils/user";
import './styles/Appointments.css'

const GetAllAppointments = () => {
  const dispatch = useDispatch();
  const user = SessionCheck();
  const { userId } = useParams();
  const userCheck = UserCheck(user, userId);
  const apptsObj = useSelector((state) => state?.appointments);
  let apptsArr;
  if(apptsObj){
      apptsArr = Object.values(Object.values(apptsObj)[0])
  }

  const destroyAppt = async (e, apptId) => {
    e.preventDefault();
    const payload = {
        id: parseInt(apptId),
        user_id: userId,
    }
    // let destroyed;
    try {
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
    const aptDateObj = new Date(appt?.start_date)

    if(aptDateObj > today){
      return (
        <div className="appointment-btn-container margin-top-sm margin-bottom-sm">
            <NavLink to={`/appointments/edit/${appt.id}`}>
              <button className="btn btn--form margin-right-sm">edit</button>
            </NavLink>
            <button className="btn btn--form" onClick={(e) => destroyAppt(e, appt.id)}>delete</button>
        </div>
      )
    } else {
      return (
        <div className="appointment-btn-container margin-top-sm">
          <p className="footnote">This event cannot be rescheduled</p>
        </div>
      )
    }
  }

  const apptMap = () => {
    if(userCheck){
      return(
          <>
          <section className="section-specialties center-text">
            <div className="">

            </div>
              <h2 className="heading-secondary specialty-heading">{`Hello ${apptsArr[0]?.patient_info.patient_first_name} ${apptsArr[0]?.patient_info.patient_last_name}`}</h2>
              <p className="subheading margin-bottom-sm">Your appointments are scheduled for the following...</p>
          <ul className="container grid grid--3--cols">

          {apptsArr?.map((appt, idx)=>(
            <li key={idx} className="doctor-apt-list-info-card">
                <div className="doctor-img-container">
                    <img src={appt.doctor_info?.dr_image} alt={`Dr.${appt.doctor_info?.dr_last_name}`}/>
                </div>
                <div className="appointment-info-container">
                    <p className="appointment-detail"> Appointment: Dr. {appt.doctor_info?.dr_last_name}</p>
                    <p className="appointment-detail">{`Specialty: ${appt.doctor_info?.dr_specialty}`}</p>
                    <p className="appointment-detail">{`Date: ${(appt.start_date)}`}</p>
                    <p className="appointment-detail">{`Start time: ${dbDateFrontendFunc(appt.start_time)}`}</p>
                    {editDeleteButtons(appt)}
                </div>
            </li>
          ))}
          </ul>
          </section>
          </>
      )
    } else {
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

  useEffect(() => {
    dispatch(getAppointments(userId));
}, [dispatch, userId])

  if(userCheck){
    if(apptsArr && apptsArr.length > 0){

        return (
          <>
          {apptMap()}
          </>
        );
    } else {
      return (
        <>
          <section className="section-no-appts center-text">
            <div className="no-appts-container">
              <h2 className="heading-secondary no-appts-header">You have no appointments scheduled</h2>
              <img className="no-appts-img" src="https://images.unsplash.com/photo-1631217871099-88310a909a32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Njd8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Staff helping patient" />
            </div>
          </section>
        </>
      )}
  } else {
    return (
    <section className="section-unauthorized-access">
      <div className="center-text">
        <h2 className="heading-secondary unathorized-header">Unauthorized access 401</h2>
        <img className="unathorized-image" src="https://images.unsplash.com/photo-1612943680768-d82060323fd5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nzl8fGRvY3RvcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Disappointed doctor" />
      </div>
    </section>
    )
  }
};

export default GetAllAppointments;
