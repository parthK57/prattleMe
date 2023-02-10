import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./NavBar.css";
import { clearFriendsList, clearMessages } from "../../store";

const NavBarHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // @ts-expect-error
  const logoutUser = (e) =>{
    e.preventDefault();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("username");
    dispatch(clearFriendsList());
    dispatch(clearMessages());
    navigate("/");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg" id="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate("/signup")}>
            prattleMe
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavAltMarkup"
          >
            <div className="navbar-nav">
              <a className="nav-link active" onClick={() => navigate("/addfriends")}>
                Add Friends
              </a>
              <a className="nav-link active" onClick={() => navigate("/group")}>
                Groups
              </a>
              <a className="nav-link" onClick={logoutUser}>
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBarHome;
