// import { useContext } from "react";
// import UserContext from "./../context/UserContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Homepage.css";

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [isEdit, setIsEdit] = useState();
  const [errMsg, setErrMsg] = useState();

  // const handleLogout = () => {
  //   localStorage.removeItem("user");
  //   navigate("/");
  // };

  useEffect(() => {
    fetch(`http://localhost:9002/home/${localStorage.getItem("user")}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData({
          name: data?._doc.name,
          username: data?._doc?.username,
          email: data?._doc?.email,
          phone: data?._doc?.phone
        });
      });
  }, []);

  console.log("api: ", userData);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
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
    setUserData({ ...userData, username: input });
  };
  const handleMail = (e) => {
    setUserData({ ...userData, email: e.target.value });
  };

  const handlePhone = (e) => {
    const input = e.target.value;
    if (parseInt(input, 10) < 0 || input.length !== 10) {
      setErrMsg({ ...errMsg, phoneErr: "Enter a valid phone number!" });
    } else {
      setErrMsg({ ...errMsg, phoneErr: "" });
    }
    setUserData({ ...userData, phone: input });
  };

  const handleSave = () => {
    const response = confirm("Are You Sure?");

    if (response) {
      fetch("http://localhost:9002/update", {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...userData })
      })
        .then((res) => res.json())
        .then(() => {
          setIsEdit(false);
        });
      displayUpdateNotification();
    } else return;
  };

  const displayUpdateNotification = () => {
    toast.success("Successfully Updated!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {isEdit ? (
        <div className="home-container">
          <div className="curr-user">Hello {userData?.name}</div>
          <div className="form-container">
            <div className="user-detail">
              <div className="user">Email: </div>
              <input
                type="text"
                value={userData?.email}
                onChange={handleMail}
              />
            </div>
            <div className="user-detail">
              <div className="user">Phone: </div>
              <input
                type="number"
                value={userData?.phone}
                onChange={handlePhone}
              />
            </div>
          </div>
          <div className="btn-edit-container">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="home-container">
          <div className="curr-user">Hello {userData?.name}</div>
          <div className="form-container">
            <div className="user-detail">
              <div className="user">Username: </div>
              <div>{userData?.username} </div>
            </div>
            <div className="user-detail">
              <div className="user">Email: </div>
              <div>{userData?.email} </div>
            </div>
            <div className="user-detail">
              <div className="user">Phone: </div>
              <div>{userData?.phone} </div>
            </div>
          </div>
          <div className="btn-container">
            <button onClick={handleEdit}>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      )}
    </>
  );
};
export default HomePage;
