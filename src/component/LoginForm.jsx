import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./../context/UserContext";
import "./LoginForm.css";

const LoginForm = () => {
  const [input, setInput] = useState();
  const [errMsg, setErrMsg] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();
  const ctx = useContext(UserContext);

  const handleUserName = (e) => {
    setInput({ ...input, username: e.target.value });
  };
  const handlePassword = (e) => {
    setInput({ ...input, password: e.target.value });
  };
  const handleLogin = () => {
    fetch(`http://localhost:9002/login/${input.username}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("dataaaa: ", data);
        if (data?.message === "Login successful!") {
          localStorage.setItem("user", data?._doc.username);
          navigate("/homepage");
          ctx.setCurrentuser(data?._doc?.username);
        } else {
          setError(data?.message);
        }
      });
  };
  console.log("errrrr: ", error);
  const handleNewUser = () => {
    navigate("/newuser");
  };

  return (
    <div className="login-container">
      <div className="err-msg">{error}</div>
      <div className="err-msg">{errMsg}</div>
      <div className="login-modal">
        <div className="login-text">LOGIN</div>
        <div className="block">
          <div className="user-name">Username</div>
          <input
            className="input"
            type="text"
            placeholder="Enter your username"
            onChange={handleUserName}
          />
        </div>
        <div className="block">
          <div className="user-name">Password</div>
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            onChange={handlePassword}
          />
        </div>
        <div className="block">
          <button className="log-in-btn" onClick={handleLogin}>
            Log in
          </button>
        </div>
        <div className="new-account" onClick={handleNewUser}>
          Create a new account{" "}
        </div>
        <div className="forgot-password">Forgot password </div>
      </div>
    </div>
  );
};
export default LoginForm;
