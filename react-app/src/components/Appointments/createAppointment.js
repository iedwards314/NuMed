import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addAppointment } from '../../store/appointments';
import { SessionCheck } from '../../utils/user';

const CreateAppointmentForm = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    // compute tomorrow
    tomorrow.setDate(tomorrow.getDate() + 1)
    //convert to local time
    const placeholder = new Date(tomorrow.toLocaleDateString('en-US'));
    // Patients must select apt at least next day
    const minDate = placeholder

    const max = new Date(today)
    // 2 month selection window
    max.setDate(max.getDate()+60)
    const maxPlaceholder = new Date(max.toLocaleDateString('en-US'));
    console.log("max placeholder is...", maxPlaceholder)

    const dispatch = useDispatch()
    const user = SessionCheck();
    const patientId = user?.id
    const history = useHistory();

    const { doctorId } = useParams();


    const [value, setValue] = useState(placeholder);
    const [appointmentTime, setAppointmentTime] = useState("9");
    const [doctor, setDoctor] = useState({})
    const [hasSubmitted, setHasSubmitted] =useState(false)
    const [errors, setErrors] =useState([]);

    const selectAppointmentTime = (e) => {
        setAppointmentTime(e.target.value)
    }

    useEffect( () => {
        console.log("select appointment time is...", appointmentTime);
        console.log("select appointment date is...", value);
        console.log("doctor is...", doctorId)

        if (!doctorId) {
            return;
          }
          (async () => {
            const response = await fetch(`/api/users/${doctorId}`);
            const doctor = await response.json();
            setDoctor(doctor);
          })();

    }, [value, appointmentTime, doctorId])

    if (!doctor) {
        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if(errors.length) return alert("Error Submitted")
        const payload = {
        }
        let createdAppointment;
        try {
            // Thunk
            // createdAppointment = await dispatch(addAppointment(payload));
            console.log("successfully submitted...", payload)
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
                        onChange={setValue}
                        value={value}
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
                    <button type="submit"> Submit </button>
                </form>
            </div>
            <div>
                <h2>Doctor Name</h2>
                <p>Doctor Specialty</p>
                <p>Doctor Image</p>
            </div>
        </section>
    )
}

export default CreateAppointmentForm;
