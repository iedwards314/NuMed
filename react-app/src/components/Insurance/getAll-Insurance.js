
import InsuranceButtons from "./functions/insuranceButtons";
import { getInsurancePolicies } from "../../store/insurance"
import './styles/Insurance.css'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionCheck } from "../../utils/user";
import { useParams } from "react-router-dom";


const GetAllInsurance = () => {

    const dispatch = useDispatch();
    const user = SessionCheck();
    const {userId} = useParams();
    const insurance = useSelector(state => state.insurance_policies);
    const insuranceObj = insurance?.insurance_policies;
    const insuranceArr = Object.values(insuranceObj);

    useEffect (() => {
        dispatch(getInsurancePolicies(userId))
    }, [dispatch, userId])

    const insurancePolicyMap = () => {
        if(insuranceArr.length > 0){
            return(
                <ul>
                    {insuranceArr?.map(policy => (
                        <li key={policy.id} className="insurance-policy-card">
                            <div className="insurance-policy">
                                <p className="insurance-policy-header">Insurance Name</p>
                                <p className="insurance-policy-info">{policy.insurance_co}</p>
                                <p className="insurance-policy-header">Subscriber Number</p>
                                <p className="insurance-policy-info">{policy.subscriber_num}</p>
                                <p className="insurance-policy-header">Group Number</p>
                                <p className="insurance-policy-info">{policy.group_num}</p>
                            </div>
                            <InsuranceButtons user={user} policy={policy} />
                        </li>
                    ))}
                </ul>
            )
        } else {
            return (
                <>

                    <h3 className="header-third footnote">We have no insurance on file for you. Payment will be expected at time of service.</h3>

                </>
            )
        }
    }

    return (
        <div className="insurance-policies-container">
            {insurancePolicyMap()}

        </div>
    )

}

export default GetAllInsurance;
