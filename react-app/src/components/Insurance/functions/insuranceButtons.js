import { NavLink } from "react-router-dom";

const insuranceButtons = (policy) => {
    const policyId = policy.id;

    return(
        <div>
            <NavLink to={`/insurance/${policyId}`}>
                <p>Edit</p>
            </NavLink>
            <button>Delete</button>
        </div>
    )
}

export default insuranceButtons;
