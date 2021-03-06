import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import './styles/signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");

  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const errorCheck = () => {
    const newErrors = [];

    if (first_name.length <= 0 || first_name.length > 100) {
      newErrors.push(
        "Please enter your first name between 1 and 100 characters in length."
      );
    }
    if (last_name.length <= 0 || last_name.length > 100) {
      newErrors.push(
        "Please enter your last name between 1 and 100 characters in length."
      );
    }
    if (username.length <= 2 || username.length > 40) {
      newErrors.push(
        "Please enter a username between 3 and 40 characters in length."
      );
    }
    if (email.length <= 5 || email.length > 255) {
      newErrors.push(
        "Please enter an email between 6 and 255 characters in length."
      );
    }
    if (password.length <= 5 || password > 40) {
      newErrors.push(
        "Please enter a password between 6 and 40 characters in length."
      );
    }
    if (password !== repeatPassword) {
      newErrors.push("Passwords do not match.");
    }
    if (address.length <= 6 || address.length > 255) {
      newErrors.push(
        "Please enter an address between 7 and 255 characters in length."
      );
    }
    if (city.length <= 0 || city.length > 60) {
      newErrors.push(
        "Please enter a city between 1 and 60 characters in length."
      );
    }
    if (state.length <= 1 || state.length > 50) {
      newErrors.push(
        "Please enter a state between 2 and 50 characters in length. "
      );
    }
    if (phone.length <= 9 || phone.length > 15) {
      newErrors.push(
        "Please enter a phone number between 10 and 15 characters in length. "
      );
    }
    return newErrors
  }

  const onSignUp = async (e) => {
    e.preventDefault();
    let submitErrors = errorCheck()
    setErrors(submitErrors)
    if (submitErrors.length) return;
    const payload = {
      first_name,
      last_name,
      username,
      email,
      password,
      address,
      city,
      state,
      phone,
    };
    try {
      const data = await dispatch(signUp(payload));
      if (data) {
        setErrors(data);
      }
    } catch (error) {
      console.log("error in sign up");
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAddress = (e) => {
    setAddress(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updatePhone = (e) => {
    setPhone(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
    <section className="section-signup container grid form-grid center-text">
    <form className="sign-up-container" onSubmit={onSignUp}>
      <h2 className="form-header">Become a member!</h2>
      <div className='errors margin-bottom-md'>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className="form-input">
        <label>First Name*</label>
        <input
          type="text"
          name="first_name"
          placeholder="first name (letters only)"
          pattern="[a-zA-Z]+"
          onChange={updateFirstName}
          value={first_name}
        ></input>
      </div>
      <div className="form-input">
        <label>Last Name*</label>
        <input
          type="text"
          name="last_name"
          placeholder="last name(letters only)"
          pattern="[a-zA-Z]+"
          onChange={updateLastName}
          value={last_name}
        ></input>
      </div>
      <div className="form-input">
        <label>Username*</label>
        <input
          type="text"
          name="username"
          placeholder="userame"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="form-input">
        <label>Email*</label>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="form-input">
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="form-input">
        <label>Repeat Password*</label>
        <input
          type="password"
          name="repeat_password"
          placeholder="confirm password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          // required={true}
        ></input>
      </div>
      <div className="form-input">
        <label>Address*</label>
        <input
          type="text"
          name="address"
          placeholder="address"
          onChange={updateAddress}
          value={address}
        ></input>
      </div>
      <div className="form-input">
        <label>City*</label>
        <input
          type="text"
          name="city"
          placeholder="city (letters only)"
          pattern="[a-zA-Z]+"
          onChange={updateCity}
          value={city}
        ></input>
      </div>
      <div className="form-input">
        <label>State*</label>
        <input
          type="text"
          name="state"
          placeholder="state (letters only)"
          pattern="[a-zA-Z]+"
          onChange={updateState}
          value={state}
        ></input>
      </div>
      <div className="form-input margin-bottom-sm">
        <label>Phone Number*</label>
        <input
          type="text"
          name="phone"
          placeholder="phone (numbers only)"
          pattern="[0-9]{1,15}"
          onChange={updatePhone}
          value={phone}
        ></input>
      </div>
      <p className="footnote">*Required fields for submission</p>
      <p className="footnote">First and last name between 1 - 100 characters</p>
      <p className="footnote">Username must be between 3 and 40 characters in length </p>
      <p className="footnote">Email must be between 7 and 255 characters in length </p>
      <p className="footnote">Password must be between 6 and 40 characters in length </p>
      <p className="footnote">Address must be between 7 and 255 characters in length </p>
      <p className="footnote">City must be between 1 and 60 characters in length </p>
      <p className="footnote">State must be between 2 and 50 characters in length </p>

      <p className="footnote margin-bottom-sm">Phone number must be between 10 and 15 characters in length.</p>
      <button className="btn btn--form" type="submit">
        Become a Patient
      </button>
    </form>
    </section>
    </>
  );
};

export default SignUpForm;
