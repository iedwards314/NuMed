import { NavLink } from "react-router-dom";

const insuranceButtons = (policy) => {
    const policyId = policy.id;

    return(
        <div>
            <NavLink to={`/insurance/${policy.id}`}>
                <p>Edit</p>
            </NavLink>
            <button>Delete</button>
        </div>
    )
}

export default insuranceButtons;
