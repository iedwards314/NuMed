import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { SessionCheck } from "../../utils/user";
import { getInsurancePolicy, deleteInsurancePolicy  } from "../../store/insurance";


const DeleteInsurance = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = SessionCheck();
    const patientId = user.id;
    const { policyId } = useParams();

    const state = useSelector((state => state))
    console.log("policyId is...", policyId)
    console.log("state is...",state.session.user.insurance_policies);

    const insurance = useSelector((state) => state.insurance_policies.insurance_policies[policyId]);

    // removed setState functions as they were not used in this method

    const [insuranceCo] = useState(`${insurance?.insurance_co}`);
    const [subscriberNum] = useState(`${insurance?.subscriber_num}`);
    const [groupNum] = useState(`${insurance?.group_num}`);

    useEffect(() => {
        dispatch(getInsurancePolicy(policyId))
      }, [dispatch, policyId]);

    const destroyInsurancePolicy = async (e) => {
        e.preventDefault();
        const payload = {
            id: parseInt(policyId),
            user_id: patientId,
        }
        let destroyed;
        try {
            destroyed = await dispatch(deleteInsurancePolicy(payload))
        } catch (error) {
            console.log("error in delete")
        }

        if (destroyed?.id) {
            history.push(`/users/${patientId}`);
        }
    }

    return(
        <>
        <section className="session-update-insurance">
            <form className="form insurance-form" onSubmit={destroyInsurancePolicy}>
                <div className="form-input-container">
                    <p>{insuranceCo}</p>
                </div>
                <div className="form-input-container">
                    <p>{subscriberNum}</p>
                </div>
                <div className="form-input-container">
                    <p>{groupNum}</p>
                </div>
                <div className="form-input-container">
                    <p>Do you really want to delete this insurance info?</p>
                </div>
                <button type="submit">Delete Insurance Info</button>
                <NavLink to={`/users/${user.id}`}>
                    <div>
                        <p>Cancel</p>
                    </div>
                </NavLink>
            </form>
        </section>
        </>
    )
}

export default DeleteInsurance;
