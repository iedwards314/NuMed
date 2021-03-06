import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./styles/login.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to={`/users/${user.id}`} />;
  }

  const demoLogin = async () => {
    await dispatch(login("demo@aa.io", "password"));
  };

  return (
    <>
      <section className="section-login container grid form-grid center-text">
        <form className="login-container" onSubmit={onLogin}>
          <h2 className="form-header">Login!</h2>
          <div className="errors">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="form-input">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="form-input margin-bottom-sm">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <button className="btn btn--form" type="submit">
            I Need a Doctor
          </button>
          <div className="login-tosignup">
            <p
              className="demo-login-text"
              style={{ margin: "0px 5px 0px 0px", padding: "20px 0px" }}
            >
              Want to try the site?
            </p>
            <p
              className="main-nav-link"
              onClick={demoLogin}
              style={{ color: "#1f6fe5", cursor: "pointer" }}
            >
              Click here! Demo Patient Login
            </p>
          </div>
        </form>
      </section>
    </>
  );
};

export default LoginForm;
