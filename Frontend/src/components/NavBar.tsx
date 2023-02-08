import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg" id="navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
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
              <a className="nav-link active" href="">
                Login
              </a>
              <a className="nav-link" href="">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
