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
    const maxDate = new Date("06/18/2022 4:00 PM")

    console.log("value is...", value);
    console.log("minDate is...", minDate);
    console.log("maxDate is...", maxDate);

    console.log("value.getYear()", value.getFullYear());
    console.log("value.getMonth()", value.getMonth());
    console.log("value.getDate()", value.getDate());
    console.log("value.getHours()", value.getHours());


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
                        maxDate={maxDate}
                        tileDisabled={({ date }) => date.getDay()=== 0 || date.getDay() === 6}
                        calendarType={"US"}
                    />
                    <select>
                        <option value="9:00 AM">9:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">10:00 AM</option>
                        <option value="01:00 PM">1:00 PM</option>
                        <option value="02:00 PM">2:00 PM</option>
                        <option value="03:00 PM">3:00 PM</option>
                        <option value="04:00 PM">4:00 PM</option>
                    </select>
                    <button> Submit </button>
                </form>
            </div>
        </section>
    )
}

export default CreateAppointmentForm;
