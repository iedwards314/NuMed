import { NavLink } from "react-router-dom";

const InsuranceButtons = ({policy, user}) => {
    const policyId = policy?.id;

    // console.log("policyId is...", policyId);
    // console.log("user in Insurance buttons is...", user)

    return(
        <div>
            <NavLink to={`/insurance/${policyId}`} >
                <p>Edit</p>
            </NavLink>
            <NavLink to={`/insurance/delete/${policyId}`} >
                <p>Delete</p>
            </NavLink>
        </div>
    )
}

export default InsuranceButtons;
