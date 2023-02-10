import NavBarGroup from "../../components/NavBar/NavBarGroup";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Notify from "../../components/Notify/Notify";

const email = localStorage.getItem("email");
const password = localStorage.getItem("password");

const Group = () => {
  const navigate = useNavigate();
  const [groupNameJ, setGroupNameJ] = useState("");
  const [groupNameC, setGroupNameC] = useState("");
  const [adminNameJ, setAdminNameJ] = useState("");
  const [adminNameC, setAdminNameC] = useState("");
  const [passwordJ, setPasswordJ] = useState("");
  const [passwordC, setPasswordC] = useState("");
  const [notify, setNotify] = useState(false);
  const [notifyMessage, setNotifyMessage] = useState("");

  const joinGroup = async (event: Event) => {
    event.preventDefault();
    try {
      const response: any = await axios.post(
        "http://localhost:5000/users/joingroup",
        {
          email: email,
          password: password,
          groupname: groupNameJ,
          adminname: adminNameJ,
          grouppassword: passwordJ,
        }
      );
      console.log(response);
      if (response.status == 201) {
        const groupNameElement = document.querySelector(
          "#group-name"
        ) as HTMLInputElement;
        const adminNameElement = document.querySelector(
          "#admin-name"
        ) as HTMLInputElement;
        const passwordElement = document.querySelector(
          "#password"
        ) as HTMLInputElement;

        setNotify(true);
        setNotifyMessage(response.data);
        setTimeout(() => {
          setNotify(false);
          groupNameElement.value = "";
          adminNameElement.value = "";
          passwordElement.value = "";
          setNotifyMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createGroup = async (event: Event) => {
    event.preventDefault();
    try {
      const response: any = await axios.post(
        "http://localhost:5000/users/creategroup",
        {
          email: email,
          password: password,
          groupname: groupNameC,
          adminname: adminNameC,
          grouppassword: passwordC,
        }
      );
      console.log(response);
      if (response.status == 200) {
        const groupNameElement = document.querySelector(
          "#create-group-name"
        ) as HTMLInputElement;
        const adminNameElement = document.querySelector(
          "#create-admin-name"
        ) as HTMLInputElement;
        const passwordElement = document.querySelector(
          "#create-password"
        ) as HTMLInputElement;

        setNotify(true);
        setNotifyMessage(response.data);
        setTimeout(() => {
          setNotify(false);
          groupNameElement.value = "";
          adminNameElement.value = "";
          passwordElement.value = "";
          setNotifyMessage("");
        }, 3000);
      }
    } catch (error) {
      console.log();
    }
  };

  return (
    <>
      <NavBarGroup />
      <div
        className="container d-flex flex-column justify-content-center align-items-center w-50"
        style={{ marginTop: "100px" }}
      >
        <div className="d-flex w-100 justify-content-between mb-3">
          <form action="" autoComplete="off">
            <div
              className="mt2 d-flex justify-content-center align-center"
              style={{ borderBottom: "1px solid black", paddingBottom: "10px" }}
            >
              <h5>Join Group</h5>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="group-name">Group Name:</label>
              <input
                type="text"
                name="group-name"
                id="group-name"
                className="form-control"
                onChange={(e) => setGroupNameJ(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="admin-name">Admin's Name:</label>
              <input
                type="text"
                name="admin-name"
                id="admin-name"
                className="form-control"
                onChange={(e) => setAdminNameJ(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="admin-name">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                onChange={(e) => setPasswordJ(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn"
                id="join"
                // @ts-expect-error
                onClick={joinGroup}
              >
                Join
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
          <form action="" autoComplete="off">
            <div
              className="mt2 d-flex justify-content-center align-center"
              style={{ borderBottom: "1px solid black", paddingBottom: "10px" }}
            >
              <h5>Create Group</h5>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="create-group-name">Group Name:</label>
              <input
                type="text"
                name="create-group-name"
                id="create-group-name"
                className="form-control"
                onChange={(e) => setGroupNameC(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="admin-name">Admin's Name:</label>
              <input
                type="text"
                name="create-admin-name"
                id="create-admin-name"
                className="form-control"
                onChange={(e) => setAdminNameC(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="create-password">Password:</label>
              <input
                type="password"
                name="create-password"
                id="create-password"
                className="form-control"
                onChange={(e) => setPasswordC(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button
                type="submit"
                className="btn"
                id="create-btn"
                // @ts-expect-error
                onClick={createGroup}
              >
                Create
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => navigate("/home")}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        {notify ? <Notify message={notifyMessage} /> : null}
      </div>
    </>
  );
};

export default Group;
