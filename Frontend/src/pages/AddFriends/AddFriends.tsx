import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";

// Components
import NavBar from "../../components/NavBar/NavBarAddFriends";
import Notify from "../../components/Notify/Notify";

const userEmail = localStorage.getItem("email");
const userPassword = localStorage.getItem("password");

const AddFriends = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");
  const navigate = useNavigate();

  // @ts-expect-error
  const addUser = async (e) => {
    e.preventDefault();
    const usernameElement = document.querySelector(
      "#username"
    ) as HTMLInputElement;
    const emailElement = document.querySelector("#email") as HTMLInputElement;
    try {
      const response = await axios.post("http://localhost:5000/users/adduser", {
        email: userEmail,
        password: userPassword,
        clientEmail: email,
        clientUsername: username,
      });
      console.log(response.data);
      if (response.status == 200) {
        setNotify(true);
        setNotifyMessage(response.data);
        setTimeout(() => {
          setNotify(false);
          usernameElement.value = "";
          emailElement.value = "";
          setNotifyMessage("");
        }, 3000);
      }
    } catch (error) {
      setNotify(true);
      //@ts-expect-error
      setNotifyMessage(error.response.data);
      setTimeout(() => {
        setNotify(false);
        usernameElement.value = "";
        emailElement.value = "";
      }, 3000);
    }
  };

  return (
    <>
      <NavBar />
      <div className="container" id="form-container">
        <form action="" autoComplete="off">
          <div className="mt-2 d-flex flex-column" id="form-title">
            <h4>Add Friends</h4>
          </div>
          <div className="mt-2 d-flex flex-column">
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={(event) => setUsername(event.target.value)}
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
          <div className="mt-2 d-flex">
            <button
              type="submit"
              className="btn"
              onClick={addUser}
              id="add-btn"
            >
              Add
            </button>
            <button
              type="button"
              className="btn"
              id="cancel-btn"
              onClick={() => navigate("/home")}
            >
              Cancel
            </button>
          </div>
        </form>
        {notify ? <Notify message={notifyMessage} /> : null}
      </div>
    </>
  );
};

export default AddFriends;
