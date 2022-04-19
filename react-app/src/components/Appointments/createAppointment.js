import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAppointment } from '../../store/appointments';
import { getDoctor } from '../../store/doctors';
import { SessionCheck } from '../../utils/user';
import { maxDateFunc, stringCalenderDateFunc, tomorrowFunc } from './functions/calendarFuncs';

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
    // const {stateDoctor} = useSelector(state => state.doctors.selected);

    const [doctor, setDoctor] = useState("")
    const [apptDate, setApptDate] = useState(placeholder);
    const [appointmentTime, setAppointmentTime] = useState("9");
    const [apptDescription, setApptDescription] = useState("");
    const [hasSubmitted, setHasSubmitted] =useState(false)
    const [errors, setErrors] =useState([]);

    const selectAppointmentTime = (e) => {
        setAppointmentTime(e.target.value)
    }

    const updateApptDescription = (e) => {
        setApptDescription(e.target.value)
    }

    useEffect( () => {
        // console.log("select appointment time is...", appointmentTime);
        // console.log("select appointment date is...", apptDate);
        // console.log("doctorId is...", doctorId);
        console.log("doctor is...", doctor);

        // console.log("Apt description is...", apptDescription);
    }, [apptDate, appointmentTime, doctorId, apptDescription, errors, doctor])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);

        let errors = [];
        if(apptDescription) {
            if(apptDescription.length < 8 || apptDescription.length > 255) errors.push("Please enter a discription of the need for your appointment that is more than 30 but less than 255 characters. Example is 'feel sick' ")
        }

        setErrors(errors);

        if(errors.length) return alert("Error Submitted")

        //clean submission date into correct backend figure
        let submissionDate = stringCalenderDateFunc(apptDate);

        const payload = {
            patient_id: patientId,
            doctor_id: parseInt(doctorId),
            start_time: parseInt(appointmentTime),
            start_date: submissionDate
        }
        let createdAppointment;
        try {
            // Thunk
            // createdAppointment = await dispatch(addAppointment(payload));
            console.log("successfully attempted submission...", payload)
        } catch (error) {
            console.log("There was an error in submitted insurance");
        }

        if(createdAppointment) {
            setHasSubmitted(false);
            history.push(`/users/${patientId}`)
        }
    }

    return (
        <section className='container'>
            <h1>Create Appointment Form</h1>
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
                    <select value={appointmentTime} onChange={selectAppointmentTime}>
                        <option value="09">9:00 AM to 10:00 AM</option>
                        <option value="10">10:00 AM to 11:00 AM</option>
                        <option value="11">10:00 to 11:00 AM</option>
                        <option value="13">1:00 PM to 2:00 PM</option>
                        <option value="14">2:00 PM to 3:00 PM</option>
                        <option value="15">3:00 PM to 4:00 PM</option>
                        <option value="16">4:00 PM to 5:00 PM</option>
                    </select>
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
            </div>
            <div>
                <h2>{`Appointment with Dr. ${doctor?.last_name}`}</h2>
                <p>Doctor Specialty</p>
                <p>Doctor Image</p>
            </div>
        </section>
    )
}

export default CreateAppointmentForm;
