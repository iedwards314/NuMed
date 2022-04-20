
import InsuranceButtons from "./functions/insuranceButtons";
import { getInsurancePolicies } from "../../store/insurance"
import './styles/Insurance.css'
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const GetAllInsurance = ({user}) => {

    const dispatch = useDispatch();
    const insuranceObj = user?.insurance_policies;
    const insuranceArr = Object.values(insuranceObj);

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
