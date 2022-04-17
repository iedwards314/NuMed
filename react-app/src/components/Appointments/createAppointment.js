import React, {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

const CreateAppointmentForm = () => {
    const placeholder = new Date("04/18/2022 9:00 AM");
    console.log("placeholder is...", placeholder);

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
