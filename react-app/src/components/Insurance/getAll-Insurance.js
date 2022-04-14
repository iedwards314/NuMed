import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SessionCheck } from "../../utils/user";
import { getInsurancePolicies } from "../../store/insurance";


const GetAllInsurance = () => {
    const dispatch = useDispatch();
    const user = SessionCheck();

    const state = useSelector((state) => state)
    let projectsArr = [];

    console.log(state);

    useEffect(() => {
        dispatch(getInsurancePolicies(user.id))
    }, [dispatch])


    return (
        <div>
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
