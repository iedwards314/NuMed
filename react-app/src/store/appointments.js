const LOAD = "appointments/LOAD"
const GET_ONE="appointments/GET_ONE"
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

export const getAppointments = (userId) => async (dispatch) => {
    const response = await fetch(`/api/appointments/user/${userId}`);
    if (response.ok) {
        const insurance_policies = await response.json();
        dispatch(load(insurance_policies))
        return insurance_policies
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

export const addAppointment = (appointment) => async (dispatch) => {
    const response = await fetch(`/api/appointment/create`, {
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
    const response = await fetch(`/api/appointment/edit/${id}`, {
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
    const response = await fetch(`/api/insurance/delete/${appointment.id}`, {
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
}

const appointmentsReducer = (state = initialState, action) => {
    let setState;
    switch (action.type) {
        case LOAD:
            let newState = {}
            const allAppointments = {};
            // console.log("action in store is...", action.appointments.appointments);
            action.appointments.appointments.forEach((appointment) => {
                allAppointments[appointment.id] = appointment
            })
            // console.log("allAppointments is...", allAppointments)
            newState = { ...state, appointments: allAppointments }
            // console.log("new state is", newState)
            return newState
        case ADD_ONE:
            setState = {...state, appointments: {...state.appointments, [action.appointment.id]: action.appointment}, selected: {...state.selected}}
            return setState
        case DELETE_ONE:
            setState = {...state, appointments: {...state.appointments}, selected: {...state.selected}}
            delete setState.appointments[action.appointmentId];
            return setState
        case EDIT_ONE:
            setState = {...state, appointments: {...state.appointments, [action.appointment.id]: action.appointment}, selected: {...state.selected}}
            return setState
        case GET_ONE:
            setState = {...state, appointments: {...state.appointments}, selected: { [action.appointment.id]: {...action.appointment}}}
            return setState
        default:
            return state;
    }
}

export default appointmentsReducer;