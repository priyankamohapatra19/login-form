import { useEffect, useState } from "react";
import LoginForm from "./component/LoginForm";
import HomePage from "./component/HomePage";
import NewUser from "./component/NewUser";
import UserContext from "./context/UserContext";
import { Routes, Route } from "react-router-dom";
import "./styles.css";

export default function App() {
  const [users, setUsers] = useState();
  const [currentUser, setCurrentuser] = useState();
  const getData = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/users");
    const response = await data.json();
    response.map((val) => {
      return (val.password = `${val.username}@121`);
    });
    setUsers(response);
  };
  useEffect(() => {
    getData();
  }, []);
  const userData = {
    users,
    setUsers,
    currentUser,
    setCurrentuser
  };

  return (
    <div className="App">
      <UserContext.Provider value={userData}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/newuser" element={<NewUser />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}
