import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { SessionCheck } from "../../utils/user";
import {
  getInsurancePolicy,
  deleteInsurancePolicy,
} from "../../store/insurance";
import "./styles/Insurance.css";


const DeleteInsurance = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = SessionCheck();

  const patientId = user?.id;
  const { policyId } = useParams();
  const insurance = useSelector(
    (state) => state.insurance_policies.insurance_policies[policyId]
  );

  // removed setState functions as they were not used in this method

  const [insuranceCo] = useState(`${insurance?.insurance_co}`);
  const [subscriberNum] = useState(`${insurance?.subscriber_num}`);
  const [groupNum] = useState(`${insurance?.group_num}`);

  useEffect(() => {
    dispatch(getInsurancePolicy(policyId));
  }, [dispatch, policyId]);

  const destroyInsurancePolicy = async (e) => {
    e.preventDefault();
    const payload = {
      id: parseInt(policyId),
      user_id: patientId,
    };
    let destroyed;
    try {
      destroyed = await dispatch(deleteInsurancePolicy(payload));
    } catch (error) {
      console.log("error in delete");
    }

    if (destroyed?.id) {
      history.push(`/users/${patientId}`);
    }
  };

  return (
    <>
      <section className="section-delete-insurance container grid form-grid center-text">
        <form className="insurance-form-container" onSubmit={destroyInsurancePolicy}>
          <h2 className="form-header">Do you really want to delete this insurance info?</h2>
          <div className="form-input">
          <label>Insurance Company Name</label>
          <input
            type="text"
            name="InsuranceCo"
            placeholder="Provider Name (letters and spaces only)"
            pattern="[a-zA-Z\s]+"
            value={insuranceCo}
            disabled
          />
          </div>
          <div className="form-input">
          <label>Subscriber Number</label>
          <input
            type="text"
            name="SubscriberNum"
            pattern="[0-9]{1,30}"
            placeholder="Subscriber number (Numbers only)"
            value={subscriberNum}
            disabled
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
            disabled
          />
          </div>
          <button className="btn btn--form margin-right-sm" type="submit">
            Delete Insurance Info
          </button>
          <NavLink to={`/users/${user?.id}`}>
            <button className="btn btn--form">Cancel</button>
          </NavLink>
        </form>
      </section>
    </>
  );
};

export default DeleteInsurance;
