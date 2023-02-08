import axios from "axios";
import "./FriendList.css";

const email = localStorage.getItem("email");
const password = localStorage.getItem("password");

type friendsOBJ = {
  user1: string;
  user2: string;
  room: string;
  user2Username: string;
};
let frindsArray: Array<friendsOBJ> = [];

const getFriends = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/getfriends",
      {
        email: email,
        password: password,
      }
    );
    if (response.status == 200) {
        frindsArray = response.data;
        friendListPopulator(frindsArray);
    }
    console.log(frindsArray);
  } catch (error) {
    console.log(error);
  }
};
getFriends();

const friendListPopulator = async (jsonData: Array<friendsOBJ>) => {
    const friendListContainer = document.querySelector("#FriendList") as HTMLDivElement;
    for(let i = 0; i < jsonData.length; i++){
        const friendContainer = document.createElement("div");
        const friendName = document.createElement("p");

        friendContainer.className = "Friend";
        friendName.className = "Friend-Username";
        friendName.innerText = `${jsonData[i].user2Username}`;

        friendContainer.appendChild(friendName);
        friendListContainer.appendChild(friendContainer);
    }
};

const FriendList = () => {
  return (
    <>
      <div id="FriendList-Title-Container">
        <h4 id="FriendList-Title">Chats</h4>
      </div>
      <div id="FriendList">
        <div className="Friend">
          <p className="Friend-Username">Robert Downey Jr. (Hard Coded)</p>
        </div>
      </div>
    </>
  );
};

export default FriendList;
