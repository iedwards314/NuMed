
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
                                <p className="insurance-header">Insurance Name</p>
                                <p>{policy.insurance_co}</p>
                                <p className="insurance-header">Subscriber Number</p>
                                <p>{policy.subscriber_num}</p>
                                <p className="insurance-header">Group Number</p>
                                <p>{policy.group_num}</p>
                            </div>
                            <InsuranceButtons user={user} policy={policy} />
                        </li>
                    ))}
                </ul>
            )
        } else {
            return (
                <>
                    <div>
                        <p>We have no insurance on file for you. Payment will be expected at time of service.</p>
                    </div>
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
