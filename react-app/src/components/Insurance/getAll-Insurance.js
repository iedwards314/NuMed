import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionCheck } from "../../utils/user";
import { getInsurancePolicies } from "../../store/insurance";


const GetAllInsurance = () => {
    const dispatch = useDispatch();
    const user = SessionCheck();

    const state = useSelector((state)=>state);
    const insuranceObj = useSelector((state) => state.insurance_policies.insurance_policies)
    const insuranceArr = Object.values(insuranceObj);

    console.log("state is...", state);
    console.log("insurance Object is...",insuranceObj);
    console.log("insurance Array is...",insuranceArr);


    useEffect(() => {
        dispatch(getInsurancePolicies(user.id))
    }, [dispatch, user.id])

    const insurancePolicyMap = () => {
        return(
            null
        )
    }

    return (
        <div>
            {insurancePolicyMap()}
            <ul>
                <li>
                    <div className="insurance-policy">
                        <p>Insurance Name</p>
                        <p>Subscriber Number</p>
                        <p>Group Number</p>
                        <p>{user ? user.id : null}</p>

                    </div>
                </li>
            </ul>
        </div>
    )

}

export default GetAllInsurance;
