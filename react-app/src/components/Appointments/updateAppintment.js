import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import {
  editAppointment,
  getAppointment,
  getAvailability,
} from "../../store/appointments";
// import { getDoctor } from '../../store/doctors';
import { SessionCheck } from "../../utils/user";
import {
  maxDateFunc,
  stringCalenderDateFunc,
  tomorrowFunc,
} from "./functions/calendarFuncs";
import { apptTimeFunc, dbDateFrontendFunc } from "./functions/apptTimeFunc";
import "./styles/Appointments.css";

const UpdateAppointmentForm = () => {
  const minDate = tomorrowFunc();
  let placeholder = tomorrowFunc();
  const maxPlaceholder = maxDateFunc();
  // form variables
  const dispatch = useDispatch();
  const user = SessionCheck();
  const patientId = user?.id;
  const history = useHistory();

  const { apptId } = useParams();
  // const {stateDoctor} = useSelector(state => state.doctors.selected);

  const userApt = useSelector(
    (state) => state?.appointments?.appointments[apptId]
  );
  const docAvailArr = useSelector(
    (state) => state?.appointments?.availability?.availability
  );
  const doctor = useSelector(
    (state) => state?.appointments?.appointments[apptId]?.doctor_info
  );

  const doctorId = userApt?.doctor_id;

  const [apptDate, setApptDate] = useState(placeholder);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [apptDescription, setApptDescription] = useState(userApt?.description);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const selectAppointmentTime = (e) => {
    setAppointmentTime(e.target.value);
  };

  const updateApptDescription = (e) => {
    setApptDescription(e.target.value);
  };

  useEffect(() => {
    dispatch(getAppointment(apptId));
    dispatch(getAvailability(stringCalenderDateFunc(apptDate), doctorId));
  }, [
    dispatch,
    apptId,
    apptDate,
    appointmentTime,
    doctorId,
    apptDescription,
    errors,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    let errors = [];
    if (apptDescription) {
      if (apptDescription.length < 4 || apptDescription.length > 255)
        errors.push(
          "Please enter a discription of the need for your appointment that is more than 4 but less than 255 characters. Example is 'sick' "
        );
    }
    if (appointmentTime === null) {
      errors.push("Please select an updated time for your appointment.");
    }

    setErrors(errors);

    if (errors.length) return alert("Error Submitted");

    //clean submission date into correct backend figure
    let submissionDate = stringCalenderDateFunc(apptDate);

    const payload = {
      id: parseInt(apptId),
      patient_id: patientId,
      doctor_id: parseInt(doctorId),
      start_time: parseInt(appointmentTime),
      start_date: submissionDate,
      description: apptDescription,
    };
    let updatedAppointment;
    try {
      updatedAppointment = await dispatch(editAppointment(payload, apptId));
    } catch (error) {
      console.log("There was an error in submitted insurance");
    }

    if (updatedAppointment) {
      setHasSubmitted(false);
      history.push(`/appointments/user/${patientId}`);
    }
  };

  //function to map available time slots
  const availMap = () => {
    if (!docAvailArr?.length) {
      return (
        <>
          {/* {docAvailArr?.map((aptTime, idx) => <p>{aptTime[idx].start_time}</p>)} */}
          <select
            value={appointmentTime}
            onChange={selectAppointmentTime}
            required
          >
            <option value="" disabled hidden>
              Choose Here for Appointment time
            </option>
            <option value="09">9:00 AM to 10:00 AM</option>
            <option value="10">10:00 AM to 11:00 AM</option>
            <option value="11">11:00 AM to 12:00 PM</option>
            <option value="13">1:00 PM to 2:00 PM</option>
            <option value="14">2:00 PM to 3:00 PM</option>
            <option value="15">3:00 PM to 4:00 PM</option>
            <option value="16">4:00 PM to 5:00 PM</option>
          </select>
        </>
      );
    } else {
      return (
        <>
          <select
            value={appointmentTime}
            required
            onChange={selectAppointmentTime}
          >
            <option value="" selected disabled hidden>
              Choose Here for the Updated Appointment time
            </option>
            {apptTimeFunc(docAvailArr)}
          </select>
        </>
      );
    }
  };

  return (
    <section className="section-create-appointment grid form-grid center-text">
      <h2 className="form-header">{`Hello ${userApt?.patient_info?.patient_first_name} ${userApt?.patient_info?.patient_last_name}, Please Update the Appointment`}</h2>
      <div className="grid form-grid center-text grid--2--cols">
        <div className="doctor-apt-info-card">
          <h3 className="form-header-secondary margin-top-sm">{`Appointment with Dr. ${doctor?.dr_last_name}`}</h3>
          <div className="doctor-info-appt-form">
            <div className="doctor-img-container">
              <img src={doctor?.dr_image} alt={`Dr.${doctor?.dr_last_name}`} />
            </div>
            <p className="subheading">{`Specialty: ${doctor ? doctor?.dr_specialty : null}`}</p>
          </div>
        </div>
        <div>
          {hasSubmitted &&
            errors?.map((error) => (
              <p style={{ color: "red", margin: "0px" }}>{error}</p>
            ))}

          <form className="appointment-form-container" onSubmit={handleSubmit}>
            <div className="margin-bottom-sm appointment-form-calendar">
              <Calendar
                onChange={setApptDate}
                value={apptDate}
                minDate={minDate}
                maxDate={maxPlaceholder}
                tileDisabled={({ date }) =>
                  date.getDay() === 0 || date.getDay() === 6
                }
                calendarType={"US"}
              />
            </div>
            <div className="margin-bottom-sm subheading">
              <p className="appointment-update-current-info">{`Your currently scheduled for ${
                userApt?.start_date
              } at ${dbDateFrontendFunc(userApt?.start_time)}`}</p>
              <p className="footnote">Please select your updated appointment time and update data below:</p>
            </div>
            <div className="form-input">
            <label>Appointment Time (all times are Central Time)</label>
            {availMap()}
            </div>
            <div className="form-input">
            <textarea
              placeholder="Please tell us what about the reason for the appointment"
              wrap="soft"
              value={apptDescription}
              onChange={updateApptDescription}
              required
            ></textarea>
            </div>

            <div className="appointment-btn-container">
              <button className="btn btn--form margin-right-sm" type="submit">
                {" "}
                Submit{" "}
              </button>
              <NavLink to={`/appointments/user/${user.id}`} exact={true}>
                <button className="btn btn--form">Cancel</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateAppointmentForm;
