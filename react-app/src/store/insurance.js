const LOAD = "insurance/LOAD"
const GET_ONE="insurance/GET_ONE"
const ADD_ONE = "insurance/ADD_ONE"
const DELETE_ONE = "insurance/DELETE_ONE"
const EDIT_ONE = "insurance/EDIT_ONE"

const load = (insurance_policies) => ({
    type: LOAD,
    insurance_policies,
})

const addOne = (insurance_policy) => ({
    type: ADD_ONE,
    insurance_policy,
})

const deleteOne = (insurance_policy) => ({
    type: DELETE_ONE,
    insurance_policy,
})

const editOne = (insurance_policy) => ({
    type: EDIT_ONE,
    insurance_policy,
})

const getOne = (insurance_policy) => ({
    type: GET_ONE,
    insurance_policy
})

export const getInsurancePolicies = (userId) => async (dispatch) => {
    const response = await fetch(`/api/insurance/user/${userId}`);
    if (response.ok) {
        const insurance_policies = await response.json();
        dispatch(load(insurance_policies))
        return insurance_policies
    }
}

export const getInsurancePolicy = (insurancePolicyId) => async (dispatch) => {
    const response = await fetch(`/api/insurance/${insurancePolicyId}`)
    if (response.ok) {
        const insurance_policy = await response.json();
        dispatch(getOne(insurance_policy))
        return insurance_policy
    }
}

export const addInsurancePolicy = (insurance_policy) => async (dispatch) => {
    const response = await fetch(`/api/insurance/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(insurance_policy),
    });
    if (response.ok) {
        const insurance_policy = await response.json();
        dispatch(addOne(insurance_policy))
        return insurance_policy
    }
}

export const editInsurancePolicy = (insurance_policy, id) => async (dispatch) => {
    const response = await fetch(`/api/insurance/edit/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(insurance_policy)
    });
    if (response.ok) {
        const insurance_policy = await response.json();
        dispatch(editOne(insurance_policy))
        return insurance_policy;
    }
}

export const deleteInsurancePolicy = (insurance_policy) => async (dispatch) => {
    const response = await fetch(`/api/insurance/delete/${insurance_policy.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(insurance_policy),
    });
    if (response.ok) {
        const insurance_policy = await response.json();
        dispatch(deleteOne(insurance_policy))
        return insurance_policy;
    }
}

const initialState = {
    insurance_policies: {},
    selected: {}
}

const insuranceReducer = (state = initialState, action) => {
    let setState;
    switch (action.type) {
        case LOAD:
            let newState = {}
            const allInsurancePolicies = {};
            action.insurance_policies.insurance_policies.forEach((insurance_policy) => {
                allInsurancePolicies[insurance_policy.id] = insurance_policy
            })
            newState = { ...state, insurance_policies: allInsurancePolicies }
            return newState
        case ADD_ONE:
            setState = {...state, insurance_policies: {...state.insurance_policies, [action.insurance_policy.id]: action.insurance_policy}, selected: {...state.selected}}
            return setState
        case DELETE_ONE:
            setState = {...state, insurance_policies: {...state.insurance_policies}, selected: {...state.selected}}
            delete setState.insurance_policies[action.insurance_policyId];
            return setState
        case EDIT_ONE:
            setState = {...state, insurance_policies: {...state.insurance_policies, [action.insurance_policy.id]: action.insurance_policy}, selected: {...state.selected}}
            return setState
        case GET_ONE:
            setState = {...state, insurance_policies: {...state.insurance_policies}, selected: { [action.insurance_policy.id]: {...action.insurance_policy}}}
            return setState
        default:
            return state;
    }
}

export default insuranceReducer;
