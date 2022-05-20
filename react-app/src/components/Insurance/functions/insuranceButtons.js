import { NavLink } from "react-router-dom";

const InsuranceButtons = ({policy, user}) => {
    const policyId = policy?.id;

    return(
        <div className="insurance-btns-container">
            <NavLink to={`/insurance/${policyId}`} >
                <button className="btn-insurance margin-right-sm">Edit</button>
            </NavLink>
            <NavLink to={`/insurance/delete/${policyId}`} >
                <button className="btn-insurance margin-bottom-sm">Delete</button>
            </NavLink>
        </div>
    )
}

export default InsuranceButtons;
