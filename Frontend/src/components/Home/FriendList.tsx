import axios from "axios";
import "./FriendList.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearMessages, friendsListPopulate, messagesPopulate } from "../../store";

const email = localStorage.getItem("email");
const password = localStorage.getItem("password");

type friendsOBJ = {
  user1: string;
  user2: string;
  room: string;
  user2Username: string;
};
interface messages {
  email: string;
  message: string;
  timestamp: string;
  clientEmail: string;
}
type messageArray = messages[];
let frindsArray: Array<friendsOBJ> = [];

const FriendList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
        // console.log(frindsArray);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();

    const friendListPopulator = async (jsonData: Array<friendsOBJ>) => {
      const friendListContainer = document.querySelector(
        "#FriendList"
      ) as HTMLDivElement;
      for (let i = 0; i < jsonData.length; i++) {
        const friendContainer = document.createElement("div");
        const friendName = document.createElement("p");

        friendContainer.className = "Friend";
        friendName.className = "Friend-Username";
        friendName.innerText = `${jsonData[i].user2Username}`;
        friendContainer.style.cursor = "pointer";
        friendContainer.addEventListener("click", openChat);
        function openChat() {
          dispatch(clearMessages());
          dispatch(friendsListPopulate(jsonData[i]));
          const getMessages = async () => {
            try {
              const response: any = await axios.post(
                "http://localhost:5000/message/getmessage",
                {
                  email: email,
                  password: password,
                  clientEmail: jsonData[i].user2,
                }
                );
                const messageArray = response.data as messageArray;
                dispatch(messagesPopulate(messageArray));
            } catch (error) {
              console.log(error);
            }
          };
          getMessages();
        }

        friendContainer.appendChild(friendName);
        friendListContainer.appendChild(friendContainer);
      }
    };
  }, []);
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
