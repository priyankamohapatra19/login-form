import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./NewUser.css";
import UserContext from "../context/UserContext";

const NewUser = () => {
  const [newUserInput, setNewuserInput] = useState();
  const [errMsg, setErrMsg] = useState();
  const ctx = useContext(UserContext);
  const navigate = useNavigate();

  const handleName = (e) => {
    const regex = /^[A-Za-z ]+$/;
    let isValid = regex.test(e.target.value);
    if (!isValid) {
      setErrMsg({ ...errMsg, errName: "Error" });
    } else {
      setErrMsg({ ...errMsg, errName: "" });
    }
    setNewuserInput({
      ...newUserInput,
      id: ctx.users.length + 1,
      name: e.target.value
    });
  };

  const handleuserName = (e) => {
    const input = e.target.value;
    if (input.length > 10) {
      setErrMsg({
        ...errMsg,
        errUserName: "Username should be of length 5!"
      });
    } else {
      setErrMsg({ ...errMsg, errUserName: "" });
    }
    setNewuserInput({ ...newUserInput, username: input });
  };

  const handleMail = (e) => {
    setNewuserInput({ ...newUserInput, email: e.target.value });
  };

  const handlePhone = (e) => {
    const input = e.target.value;
    if (parseInt(input, 10) < 0 || input.length !== 10) {
      setErrMsg({ ...errMsg, phoneErr: "Enter a valid phone number!" });
    } else {
      setErrMsg({ ...errMsg, phoneErr: "" });
    }
    setNewuserInput({ ...newUserInput, phone: input });
  };

  const handlePassword = (e) => {
    setNewuserInput({ ...newUserInput, password: e.target.value });
  };

  const handleConfirmPassword = (e) => {
    console.log("input: ", newUserInput);
    if (e.target.value !== newUserInput.password) {
      setErrMsg({ ...errMsg, passwordErr: "Incorrect Password!" });
    } else {
      setErrMsg({ ...errMsg, passwordErr: "" });
    }
    console.log("eree: ", errMsg);
    setNewuserInput({ ...newUserInput, confirmPassword: e.target.value });
  };

  const handleSignUp = (e) => {
    fetch("http://localhost:9002/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserInput)
    })
      .then((res) => {
        console.log("res: ", res);
        return res.json();
      })
      .then((data) => {
        console.log("data: ", data);
      });
    navigate("/");
  };

  const handleBlur = (e) => {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let isValid = e.target.value.match(mailformat);
    if (!isValid) {
      setErrMsg({
        ...errMsg,
        mailErr: "Invalid email address!"
      });
    } else {
      setErrMsg({ ...errMsg, mailErr: "" });
    }
  };

  return (
    <div className="user-container">
      <div className="user-modal">
        <div className="new-user-text">CREATE NEW ACCOUNT!</div>
        <div>
          <input
            className="input"
            type="text"
            value={newUserInput?.name}
            placeholder="Name"
            onChange={handleName}
          />
        </div>
        {errMsg?.errName && <div className="error-msg">{errMsg.errName}</div>}
        <div>
          <input
            className="input"
            type="text"
            value={newUserInput?.username}
            placeholder="Username"
            onChange={handleuserName}
          />
        </div>
        {errMsg?.errUserName && (
          <div className="error-msg">{errMsg.errUserName}</div>
        )}
        <div>
          <input
            className="input"
            type="mail"
            value={newUserInput?.email}
            placeholder="E-mail"
            onChange={handleMail}
            onBlur={handleBlur}
          />
        </div>
        {errMsg?.mailErr && <div className="error-msg">{errMsg.mailErr}</div>}
        <div>
          <input
            className="input"
            type="number"
            value={newUserInput?.phone}
            placeholder="Phone"
            onChange={handlePhone}
          />
        </div>
        {errMsg?.phoneErr && <div className="error-msg">{errMsg.phoneErr}</div>}
        <div>
          <input
            className="input"
            type="password"
            value={newUserInput?.password}
            placeholder="Password"
            onChange={handlePassword}
          />
        </div>
        <div>
          <input
            className="input"
            type="password"
            placeholder="Confirm Password"
            onChange={handleConfirmPassword}
          />
        </div>
        {errMsg?.passwordErr && (
          <div className="error-msg">{errMsg.passwordErr}</div>
        )}

        <button className="sign-up-btn" onClick={handleSignUp}>
          SIGN UP
        </button>
      </div>
    </div>
  );
};
export default NewUser;
