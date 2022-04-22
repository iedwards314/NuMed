import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { addAppointment, getAvailability } from '../../store/appointments';
import { getDoctor } from '../../store/doctors';
import { SessionCheck } from '../../utils/user';
import { maxDateFunc, stringCalenderDateFunc, tomorrowFunc } from './functions/calendarFuncs';
import { apptTimeFunc } from './functions/apptTimeFunc';
import './styles/Appointments.css'

const CreateAppointmentForm = () => {

    const minDate = tomorrowFunc()
    let placeholder = tomorrowFunc()
    const maxPlaceholder = maxDateFunc()
    // form variables
    const dispatch = useDispatch()
    const user = SessionCheck();
    const patientId = user?.id
    const history = useHistory();

    const { doctorId } = useParams();

    const doctor = useSelector(state => state?.doctors?.selected)
    const docAvailArr = useSelector(state => state?.appointments?.availability?.availability)

    console.log("doctor availability is...", docAvailArr)
    // if(docAvailArr){
    //     console.log("doctor avail time is...", docAvailArr[0]?.start_time)
    // }
    const [apptDate, setApptDate] = useState(placeholder);
    const [appointmentTime, setAppointmentTime] = useState("9");
    const [apptDescription, setApptDescription] = useState("");
    const [hasSubmitted, setHasSubmitted] =useState(false)
    const [errors, setErrors] =useState([]);

    // console.log("doctor in the create appt page is...", doctor);
    // console.log("doctor last name in the create appt page is...", doctor[doctorId]?.last_name);

    // console.log("apptDate is...", apptDate)
    // console.log("apptDate as a string submission is...", stringCalenderDateFunc(apptDate))



    const selectAppointmentTime = (e) => {
        setAppointmentTime(e.target.value)
    }

    const updateApptDescription = (e) => {
        setApptDescription(e.target.value)
    }

    useEffect( () => {
        dispatch(getDoctor(doctorId))
        dispatch(getAvailability(stringCalenderDateFunc(apptDate), doctorId))
    }, [dispatch, apptDate, appointmentTime, doctorId, apptDescription, errors])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        let errors = [];
        if(apptDescription) {
            if(apptDescription.length < 4 || apptDescription.length > 255) errors.push("Please enter a discription of the need for your appointment that is more than 4 but less than 255 characters. Example is 'sick' ")
        }

        setErrors(errors);

        if(errors.length) return alert("Error Submitted")

        //clean submission date into correct backend figure
        let submissionDate = stringCalenderDateFunc(apptDate);

        const payload = {
            patient_id: patientId,
            doctor_id: parseInt(doctorId),
            start_time: parseInt(appointmentTime),
            start_date: submissionDate,
            description: apptDescription
        }
        let createdAppointment;
        try {
            // Thunk
            // console.log("successfully attempted submission...", payload)
            createdAppointment = await dispatch(addAppointment(payload));
        } catch (error) {
            console.log("There was an error in submitted insurance");
        }

        if(createdAppointment) {
            setHasSubmitted(false);
            history.push(`/appointments/user/${patientId}`)
        }
    }

    //function to map available time slots
    const availMap = () => {
            // console.log("docAvailArr present...", docAvailArr)
            if(!docAvailArr?.length){
                return(
                    <>
                        {/* {docAvailArr?.map((aptTime, idx) => <p>{aptTime[idx].start_time}</p>)} */}
                        <h1>this is working</h1>
                        <select value={appointmentTime} onChange={selectAppointmentTime}>
                                <option value="09">9:00 AM to 10:00 AM</option>
                                <option value="10">10:00 AM to 11:00 AM</option>
                                <option value="11">11:00 AM to 12:00 PM</option>
                                <option value="13">1:00 PM to 2:00 PM</option>
                                <option value="14">2:00 PM to 3:00 PM</option>
                                <option value="15">3:00 PM to 4:00 PM</option>
                                <option value="16">4:00 PM to 5:00 PM</option>
                        </select>
                    </>
                )
            } else {
                return (
                    <>
                        <p>true</p>
                        <select value={appointmentTime} onChange={selectAppointmentTime}>
                            {apptTimeFunc(docAvailArr)}
                        </select>
                    </>
                )
            }

    }

    return (
        <section className='container'>
            <h1>{`Hello ${user?.first_name}, Please Create an Appointment`}</h1>
            <div>
                <h2>{`Appointment with Dr. ${doctor[doctorId]?.last_name}`}</h2>
                <p>{`Specialty: ${doctor[doctorId]?.specialty}`}</p>
                <div className='doctor-img-container'>
                    <img className='doctor-image' src={doctor[doctorId]?.image} alt={`Dr.${doctor[doctorId]?.last_name}`} />
                </div>
            </div>
            <div>
            {hasSubmitted && errors?.map((error) => (
                <p style={{color: 'red', margin:"0px"}}>{error}</p>
            ))}
                <form onSubmit={handleSubmit}>
                    <Calendar
                        onChange={setApptDate}
                        value={apptDate}
                        minDate={minDate}
                        maxDate={maxPlaceholder}
                        tileDisabled={({ date }) => date.getDay()=== 0 || date.getDay() === 6}
                        calendarType={"US"}
                    />
                    <label>
                        Start Time (all times are Central Time)
                    </label>
                    {availMap()}
                    <textarea
                        placeholder="Please tell us what about the reason for the appointment"
                        wrap='soft'
                        value={apptDescription}
                        onChange={updateApptDescription}
                        required
                    >
                    </textarea>

                    <button type="submit"> Submit </button>
                </form>
                    <NavLink to={`/appointments/user/${user.id}`} exact={true}>
                        Cancel
                    </NavLink>
            </div>

        </section>
    )
}

export default CreateAppointmentForm;
