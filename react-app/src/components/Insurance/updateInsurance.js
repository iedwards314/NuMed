import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { SessionCheck } from "../../utils/user";


const InsuranceForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = SessionCheck();
    const patientId = user.id;
    const {insuranceId} = useParams();
    const insurance = useSelector((state) => state.insurance.selected[insuranceId]);

    const [insuranceCo, setinsuranceCo] = useState(`${insurance?.insuranceCo}`);
    const [subscriberNum, setSubscriberNum] = useState(`${insurance?.subscriberNum}`);
    const [groupNum, setGroupNum] = useState(`${insurance?.groupNum}`);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        let errors = [];
        if(!insuranceCo) errors.push("Please enter the name of the insurance company");
        if(!subscriberNum) errors.push("Please enter the subscriber number");
        if(!groupNum) errors.push("Please enter your insurance group number");

        setErrors(errors);
    }, [insuranceCo, subscriberNum, groupNum])

    const updateInsuranceCo = (e) => setinsuranceCo(e.target.value);
    const updateSubscriberNum = (e) => setSubscriberNum(e.target.value);
    const updateGroupNum = (e) => setGroupNum(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if(errors.length) return alert("Error Submitted")
        const payload = {
            patientId,
            insuranceCo,
            subscriberNum,
            groupNum
        }
        let updatedInsurance;
        try {
            // Thunk
            // updatedInsurance = await dispatch(updateInsurance(payload));
            console.log("Success in submitting insurance");
        } catch (error) {
            console.log("There was an error in submitted insurance info to the database");
        }
        if(updatedInsurance) {
            setHasSubmitted(false);
            history.push(`/users/${patientId}`)
        }
    }

    return(
        <section className="session-update-insurance">
            {hasSubmitted && errors?.map((error) => (
                <p style={{color: 'red', margin:"0px"}}>{error}</p>
            ))}
            <form className="form insurance-form" onSubmit={handleSubmit}>
                <div className="form-input-container">
                    <label className="form-label">
                        <input
                        className="form-input"
                        type="text"
                        name="InsuranceCo"
                        placeholder="Enter the name of your insurance carrier (required)"
                        value={insuranceCo}
                        required
                        onChange={updateInsuranceCo}
                        />
                    </label>
                </div>
                <div className="form-input-container">
                    <label className="form-label">
                        <input
                        className="form-input"
                        type="text"
                        name="SubscriberNum"
                        placeholder="Enter your subscriber number (required)"
                        value={subscriberNum}
                        required
                        onChange={updateSubscriberNum}
                        />
                    </label>
                </div>
                <div className="form-input-container">
                    <label className="form-label">
                        <input
                        className="form-input"
                        type="text"
                        name="GroupNum"
                        placeholder="Enter your group number (required)"
                        value={groupNum}
                        required
                        onChange={updateGroupNum}
                        />
                    </label>
                </div>
                <button type="submit">Add Insurance Info</button>
            </form>
        </section>
    )
}

export default InsuranceForm;
