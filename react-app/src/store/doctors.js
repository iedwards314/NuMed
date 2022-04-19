const LOAD = "doctors/LOAD"
const GET_ONE="doctors/GET_ONE"

const load = (doctors) => ({
    type: LOAD,
    doctors,
})

const getOne = (doctor) => ({
    type: GET_ONE,
    doctor
})

export const getDoctors = () => async (dispatch) => {
    const response = await fetch(`/api/doctors`);
    if (response.ok) {
        const doctors = await response.json();
        dispatch(load(doctors))
        return doctors
    }
}

export const getDoctor = (doctorId) => async (dispatch) => {
    const response = await fetch(`/api/doctors/${doctorId}`)
    if (response.ok) {
        const doctor = await response.json();
        dispatch(getOne(doctor))
        return doctor
    }
}

const initialState = {
    doctors: {},
}

const doctorReducer = (state = initialState, action) => {
    let setState;
    switch (action.type) {
        case LOAD:
            let newState = {}
            const allDoctors = {};
            // console.log("action in store is...", action.doctors.doctors);
            action.doctors.doctors.forEach((doctor) => {
                allDoctors[doctor.id] = doctor
            })
            // console.log("allDoctors is...", allDoctors)
            newState = { ...state, doctors: allDoctors }
            // console.log("new state is", newState)
            return newState
        case GET_ONE:
            setState = {...state, doctors: {...state.doctors}, selected: { [action.doctor.id]: {...action.doctor}}}
            return setState
        default:
            return state;
    }
}

export default doctorReducer;
