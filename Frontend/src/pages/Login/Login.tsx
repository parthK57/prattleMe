import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/NavBar";
import "./Login.css";
import Notify from "../../components/Notify/Notify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const navigate = useNavigate();

  // @ts-expect-error
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/users/login", {
        email: email,
        password: password,
      });
      //console.log(response.data);
      if (response.status == 200) {
        localStorage.setItem("email", `${email}`);
        localStorage.setItem("password", `${password}`);
        navigate("/home");
      }
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
      <Navbar />
      <div className="container" id="form-container">
        <form action="" autoComplete="off">
          <div className="mt-2 d-flex flex-column" id="form-title">
            <h4>Login</h4>
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
              onClick={loginUser}
              id="login-btn"
            >
              Login
            </button>
            <button
              type="button"
              className="btn"
              id="signup-btn"
              onClick={() => navigate("/signup")}
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

export default Login;
