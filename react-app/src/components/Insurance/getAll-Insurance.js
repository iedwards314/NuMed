import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionCheck } from "../../utils/user";
import { getInsurancePolicies } from "../../store/insurance";
import insuranceButtons from "./functions/insuranceButtons";
import './styles/Insurance.css'


const GetAllInsurance = () => {
    const dispatch = useDispatch();
    const user = SessionCheck();

    const insuranceObj = useSelector((state) => state.insurance_policies.insurance_policies)
    const insuranceArr = Object.values(insuranceObj);

    useEffect(() => {
        dispatch(getInsurancePolicies(user.id))
    }, [dispatch, user.id])

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
                            {insuranceButtons(policy)}
                        </li>
                    ))}
                </ul>
            )
        } else {
            return null
        }
    }

    return (
        <div className="insurance-policies-container">
            {insurancePolicyMap()}

        </div>
    )

}

export default GetAllInsurance;
