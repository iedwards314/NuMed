import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { SessionCheck } from "../../utils/user";
import { addInsurancePolicy } from "../../store/insurance";
import "./styles/Insurance.css";

const InsuranceForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = SessionCheck();

  const patientId = user?.id;

  const [insuranceCo, setinsuranceCo] = useState("");
  const [subscriberNum, setSubscriberNum] = useState("");
  const [groupNum, setGroupNum] = useState("");
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
      if (groupNum.length === 0 || groupNum.length > 30)
        errors.push(
          "Please enter your group number between 1 - 30 characters."
        );
    }
    if (!groupNum) errors.push("Please enter your insurance group number");

    setErrors(errors);
  }, [insuranceCo, subscriberNum, groupNum]);

  const createInsuranceCo = (e) => setinsuranceCo(e.target.value);
  const createSubscriberNum = (e) => setSubscriberNum(e.target.value);
  const createGroupNum = (e) => setGroupNum(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length) return alert("Error Submitted");
    const payload = {
      user_id: patientId,
      insurance_co: insuranceCo,
      subscriber_num: subscriberNum,
      group_num: groupNum,
    };
    let createdInsurance;
    try {
      // Thunk
      createdInsurance = await dispatch(addInsurancePolicy(payload));
    } catch (error) {
      console.log("There was an error in submitted insurance");
    }

    if (createdInsurance) {
      setHasSubmitted(false);
      history.push(`/users/${patientId}`);
    }
  };

  return (
    <section className="section-create-insurance container grid form-grid center-text">
      <form className="insurance-form-container" onSubmit={handleSubmit}>
        <h2 className="form-header">Insurance Info form</h2>
        {hasSubmitted &&
          errors?.map((error) => (
            <p style={{ color: "red", margin: "0px" }}>{error}</p>
          ))}
        <div className="form-input margin-top-sm">
          <label>Insurance Company Name*</label>
          <input
            type="text"
            name="InsuranceCo"
            placeholder="Provider Name (letters and spaces only)"
            pattern="[a-zA-Z\s]+"
            value={insuranceCo}
            required
            onChange={createInsuranceCo}
          />
        </div>
        <div className="form-input">
          <label>Subscriber Number*</label>
          <input
            type="text"
            name="SubscriberNum"
            pattern="[0-9]{1,30}"
            placeholder="Subscriber number (Numbers only)"
            value={subscriberNum}
            required
            onChange={createSubscriberNum}
          />
        </div>
        <div className="form-input">
          <label>Group Number*</label>
          <input
            type="text"
            name="GroupNum"
            pattern="[a-zA-Z0-9-]+"
            placeholder="Group Number (numbers/letters only)"
            value={groupNum}
            required
            onChange={createGroupNum}
          />
        </div>
        <p className="footnote">*Required fields for submission</p>
        <p className="footnote">Insurance co takes letters and spaces</p>
        <p className="footnote">Subscriber number takes only numbers </p>
        <p className="footnote margin-bottom-sm">Group number takes numbers and letters</p>
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

export default InsuranceForm;
