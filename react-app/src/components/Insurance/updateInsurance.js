import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { SessionCheck } from "../../utils/user";
import { getInsurancePolicy, editInsurancePolicy } from "../../store/insurance";
import "./styles/Insurance.css";

const UpdateInsuranceForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = SessionCheck();
  const patientId = user.id;
  const { policyId } = useParams();

  const insurance = useSelector(
    (state) => state.insurance_policies.insurance_policies[policyId]
  );

  const [insuranceCo, setinsuranceCo] = useState(`${insurance?.insurance_co}`);
  const [subscriberNum, setSubscriberNum] = useState(
    `${insurance?.subscriber_num}`
  );
  const [groupNum, setGroupNum] = useState(`${insurance?.group_num}`);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    let errors = [];
    if (insuranceCo) {
      if (insuranceCo.length === 0 || insuranceCo.length > 100)
        errors.push(
          "Please enter the name of your insurance provider that is between 1 - 100 characters."
        );
    }
    if (!insuranceCo)
      errors.push("Please enter the name of the insurance company");
    if (subscriberNum) {
      if (subscriberNum.length === 0 || subscriberNum.length > 30)
        errors.push(
          "Please enter your subscriber or member number between 1 - 30 characters."
        );
    }
    if (!subscriberNum) errors.push("Please enter the subscriber number");
    if (groupNum) {
      if (groupNum.length === 0 || groupNum.length > 100)
        errors.push(
          "Please enter your group number between 1 - 30 characters."
        );
    }
    if (!groupNum) errors.push("Please enter your insurance group number");

    setErrors(errors);
  }, [insuranceCo, subscriberNum, groupNum]);

  useEffect(() => {
    dispatch(getInsurancePolicy(policyId));
  }, [dispatch, policyId]);

  const updateInsuranceCo = (e) => setinsuranceCo(e.target.value);
  const updateSubscriberNum = (e) => setSubscriberNum(e.target.value);
  const updateGroupNum = (e) => setGroupNum(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert("Error Submitted");
    const payload = {
      id: parseInt(policyId),
      user_id: patientId,
      insurance_co: insuranceCo,
      subscriber_num: subscriberNum,
      group_num: groupNum,
    };
    let updatedInsurance;
    try {
      // Thunk
      updatedInsurance = await dispatch(editInsurancePolicy(payload, policyId));
    } catch (error) {
      console.log(
        "There was an error in submitted insurance info to the database"
      );
    }
    if (updatedInsurance) {
      setHasSubmitted(false);
      history.push(`/users/${patientId}`);
    }
  };

  return (
    <section className="session-update-insurance container grid form-grid center-text">
      {hasSubmitted &&
        errors?.map((error) => (
          <p style={{ color: "red", margin: "0px" }}>{error}</p>
        ))}
      <form className="insurance-form-container" onSubmit={handleSubmit}>
        <h2 className="form-header">Update Your Insurance Info</h2>
        <div className="form-input margin-top-sm">
          <label>Insurance Company Name*</label>
          <input
            type="text"
            name="InsuranceCo"
            placeholder="Enter the name of your insurance carrier (required)"
            value={insuranceCo}
            required
            onChange={updateInsuranceCo}
          />
        </div>
        <div className="form-input">
          <label>Subscriber Number*</label>
            <input
              type="text"
              name="SubscriberNum"
              placeholder="Enter your subscriber number (required)"
              value={subscriberNum}
              required
              onChange={updateSubscriberNum}
            />
        </div>
        <div className="form-input">
        <label>Group Number*</label>
            <input
              type="text"
              name="GroupNum"
              placeholder="Enter your group number (required)"
              value={groupNum}
              required
              onChange={updateGroupNum}
            />
        </div>
        <p className="margin-bottom-sm">*Required fields for submission</p>
        <button className="btn btn--form margin-right-sm" type="submit">
          Add Insurance Info
        </button>
        <NavLink to={`/users/${user?.id}`}>
          <button className="btn btn--form">Cancel</button>
        </NavLink>
      </form>
    </section>
  );
};

export default UpdateInsuranceForm;
