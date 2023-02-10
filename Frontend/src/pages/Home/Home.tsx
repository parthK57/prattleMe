import "./Home.css";
import NavBarHome from "../../components/NavBar/NavBarHome";
import FriendList from "../../components/Home/FriendList";
import ChatBox from "../../components/Home/ChatBox";
import { io } from "socket.io-client";

// @ts-expect-error
const socket: any = io.connect("http://localhost:5000");
const Home = () => {
  return (
    <>
      <NavBarHome />
      <div className="container" id="home-container">
        <div className="row">
          <div className="col-4" id="friendlist-container">
            <FriendList socket={socket} />
          </div>
          <div
            className="col-8 d-flex flex-column justify-content-space-between"
            id="chatbox-container"
          >
            <ChatBox socket={socket} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
