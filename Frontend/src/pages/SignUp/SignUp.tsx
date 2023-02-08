import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";

// Components
import NavBar from "../../components/NavBar/NavBar";
import Notify from "../../components/Notify/Notify";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const navigate = useNavigate();

  // @ts-expect-error
  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/register", {
        username: username,
        phonenumber: phoneNumber,
        email: email,
        password: password,
      });
      //console.log(response.data);
      if (response.status == 200) navigate("/");
    } catch (error) {
      setNotify(true);
      //@ts-expect-error
      setNotifyMessage(error.response.data);
      setTimeout(() => {
        setNotify(false);
      }, 3000);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container" id="form-container">
        <form action="" autoComplete="off">
          <div className="mt-2 d-flex flex-column" id="form-title">
            <h4>Sign Up</h4>
          </div>
          <div className="mt-2 d-flex flex-column">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="mt-2 d-flex flex-column">
            <label htmlFor="phonenumber">Phone Number:</label>
            <input
              type="number"
              className="form-control"
              id="phonenumber"
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>
          <div className="mt-2 d-flex flex-column">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              className="form-control"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="mt-2 d-flex flex-column">
            <label htmlFor="email">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="mt-2 d-flex">
            <button
              type="submit"
              className="btn"
              onClick={signupUser}
              id="signup-btn"
            >
              Sign Up
            </button>
          </div>
        </form>
        {notify ? <Notify message={notifyMessage} /> : null}
      </div>
    </>
  );
};

export default SignUp;
