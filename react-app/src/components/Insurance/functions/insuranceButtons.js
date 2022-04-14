import { NavLink } from "react-router-dom";

const insuranceButtons = (policy) => {
    const policyId = policy.id;

    return(
        <div>
            <NavLink to={`/insurance/${policyId}`}>
                <p>Edit</p>
            </NavLink>
            <NavLink to={`/insurance/delete/${policyId}`}>
                <p>Delete</p>
            </NavLink>
        </div>
    )
}

export default insuranceButtons;
