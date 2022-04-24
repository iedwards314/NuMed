const LOAD = "appointments/LOAD"
const GET_ONE="appointments/GET_ONE"
const GET_AVAIL="appointments/GET_AVAIL"
const ADD_ONE = "appointments/ADD_ONE"
const DELETE_ONE = "appointments/DELETE_ONE"
const EDIT_ONE = "appointments/EDIT_ONE"

const load = (appointments) => ({
    type: LOAD,
    appointments,
})

const addOne = (appointment) => ({
    type: ADD_ONE,
    appointment,
})

const deleteOne = (appointment) => ({
    type: DELETE_ONE,
    appointment,
})

const editOne = (appointment) => ({
    type: EDIT_ONE,
    appointment,
})

const getOne = (appointment) => ({
    type: GET_ONE,
    appointment
})

const getAvail = (schedule) => ({
    type: GET_AVAIL,
    schedule
})

export const getAppointments = (userId) => async (dispatch) => {

    const response = await fetch(`/api/appointments/user/${userId}`);
    if (response.ok) {
        const appointments = await response.json();
        dispatch(load(appointments))
        return appointments
    }
}

export const getAppointment = (appointmentId) => async (dispatch) => {
    const response = await fetch(`/api/appointments/${appointmentId}`)
    if (response.ok) {
        const appointment = await response.json();
        dispatch(getOne(appointment))
        return appointment
    }
}

export const getAvailability = (start_date, doctor_id) => async (dispatch) => {
    const response = await fetch(`/api/appointments/availability/${start_date}/doctor/${doctor_id}`)
    if (response.ok) {
        const schedule = await response.json();
        dispatch(getAvail(schedule))
        return schedule
    }
}

export const addAppointment = (appointment) => async (dispatch) => {
    const response = await fetch(`/api/appointments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
    });
    if (response.ok) {
        const appointment = await response.json();
        dispatch(addOne(appointment))
        return appointment
    }
}

export const editAppointment = (appointment, id) => async (dispatch) => {
    const response = await fetch(`/api/appointments/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment)
    });
    if (response.ok) {
        const appointment = await response.json();
        dispatch(editOne(appointment))
        return appointment;
    }
}

export const deleteAppointment = (appointment) => async (dispatch) => {
    const response = await fetch(`/api/appointments/delete/${appointment.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(appointment),
    });
    if (response.ok) {
        const appointment = await response.json();
        dispatch(deleteOne(appointment))
        return appointment;
    }
}

const initialState = {
    appointments: {},
    selected: {},
    availability: {},
}

const appointmentsReducer = (state = initialState, action) => {
    let setState;
    switch (action.type) {
        case LOAD:
            let newState = {...state}
            const allAppointments = {};
            action.appointments.appointments.forEach((appointment) => {
                allAppointments[appointment.id] = appointment
            })
            newState = { ...state, appointments: allAppointments }
            setState = {...newState}
            return setState
        case ADD_ONE:
            setState = {...state, appointments: {...state.appointments, [action.appointment.id]: action.appointment}, selected: {...state.selected}}
            return setState
        case DELETE_ONE:
            let deleteNewState = {...state}
            delete deleteNewState.appointments[action.appointment.id];
            setState = {...deleteNewState}
            return setState
        case EDIT_ONE:
            setState = {...state, appointments: {...state.appointments, [action.appointment.id]: action.appointment}, selected: {...state.selected}}
            return setState
        case GET_ONE:
            setState = {...state, appointments: {...state.appointments}, selected: { [action.appointment.id]: {...action.appointment}}}
            return setState
        case GET_AVAIL:
            setState = {...state, appointments: {...state.appointments}, selected: {...state.selected}, availability: {...action.schedule}}
            return setState

        default:
            return state;
    }
}

export default appointmentsReducer;
