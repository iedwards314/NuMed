import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { editAppointment, getAppointment, getAvailability } from '../../store/appointments';
import { getDoctor } from '../../store/doctors';
import { SessionCheck } from '../../utils/user';
import { maxDateFunc, stringCalenderDateFunc, tomorrowFunc } from './functions/calendarFuncs';
import { apptTimeFunc, dbDateFrontendFunc } from './functions/apptTimeFunc';

const UpdateAppointmentForm = () => {

    const minDate = tomorrowFunc()
    let placeholder = tomorrowFunc()
    const maxPlaceholder = maxDateFunc()
    // form variables
    const dispatch = useDispatch()
    const user = SessionCheck();
    const patientId = user?.id
    const history = useHistory();

    const { apptId } = useParams();
    // const {stateDoctor} = useSelector(state => state.doctors.selected);

    const userApt = useSelector(state => state?.appointments?.appointments[apptId])
    const docAvailArr = useSelector(state => state?.appointments?.availability?.availability)
    const doctor = useSelector(state => state?.appointments?.appointments[apptId]?.doctor_info)

    console.log("the user in update appointment is...", user)
    console.log("the appointment is...", userApt)
    console.log("the doctor in the appointment is...", doctor)
    console.log("doc avail array is...", docAvailArr)

    const doctorId = userApt?.doctor_id

    console.log("the doctor in the appointment is...", doctorId)

    const [apptDate, setApptDate] = useState(placeholder);
    const [appointmentTime, setAppointmentTime] = useState(`${userApt?.start_time}`);
    const [apptDescription, setApptDescription] = useState(userApt?.description);
    const [hasSubmitted, setHasSubmitted] =useState(false)
    const [errors, setErrors] =useState([]);


    const selectAppointmentTime = (e) => {
        setAppointmentTime(e.target.value)
    }

    const updateApptDescription = (e) => {
        setApptDescription(e.target.value)
    }

    useEffect( () => {
        dispatch(getAppointment(apptId))
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
            id: parseInt(apptId),
            patient_id: patientId,
            doctor_id: parseInt(doctorId),
            start_time: parseInt(appointmentTime),
            start_date: submissionDate,
            description: apptDescription
        }
        let updatedAppointment;
        try {
            // Thunk
            console.log("successfully attempted submission...", payload)
            updatedAppointment = await dispatch(editAppointment(payload, apptId));
        } catch (error) {
            console.log("There was an error in submitted insurance");
        }

        if(updatedAppointment) {
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
            <h1>{`Hello ${userApt?.patient_info?.patient_first_name} ${userApt?.patient_info?.patient_last_name}, Please Update the Appointment`}</h1>
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
                    <p>{`Your currently scheduled for ${userApt?.start_date} at ${dbDateFrontendFunc(userApt?.start_time)}`}</p>
                    <p>Please select your updated appointment data and time below:</p>
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
            <div>
                <h2>{`Appointment with Dr. ${doctor?.dr_last_name}`}</h2>
                <p>{`Specialty: ${doctor ? doctor?.dr_specialty : null}`}</p>
                <p>Doctor Image</p>
                <img src={doctor?.dr_image} alt={`Dr.${doctor?.dr_last_name}`} />
            </div>
        </section>
    )
}

export default UpdateAppointmentForm;
