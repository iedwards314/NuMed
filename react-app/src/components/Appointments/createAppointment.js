import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

const CreateAppointmentForm = () => {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    console.log("tomorrow", tomorrow);
    console.log("CST converted tomorrow time is...", tomorrow.toLocaleDateString('en-US'))

    const placeholder = new Date(tomorrow.toLocaleDateString('en-US'));
    console.log("placeholder is...", placeholder);

    const max = new Date(today)
    max.setDate(max.getDate()+60)
    const maxPlaceholder = new Date(max.toLocaleDateString('en-US'));
    console.log("max placeholder is...", maxPlaceholder)

    const [value, setValue] = useState(placeholder);
    const minDate = placeholder

    useEffect( () => {

    }, [value])

    return (
        <section className='container'>
            <h1>Create Appointment Form</h1>
            <div>
                <form>
                    <label>
                        Start Time (all times are Central Time)
                    </label>
                    <Calendar
                        onChange={setValue}
                        value={value}
                        minDate={minDate}
                        maxDate={maxPlaceholder}
                        tileDisabled={({ date }) => date.getDay()=== 0 || date.getDay() === 6}
                        calendarType={"US"}
                    />
                    <select>
                        <option value="09">9:00 AM</option>
                        <option value="10">10:00 AM</option>
                        <option value="11">10:00 AM</option>
                        <option value="01">1:00 PM</option>
                        <option value="02">2:00 PM</option>
                        <option value="03">3:00 PM</option>
                        <option value="04">4:00 PM</option>
                    </select>
                    <button> Submit </button>
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
