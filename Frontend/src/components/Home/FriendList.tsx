import axios from "axios";
import "./FriendList.css";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearMessages,
  friendsListPopulate,
  messagesPopulate,
  clearFriendsList,
  activateGroupChatMode,
  deactivateGroupChatMode,
  setGroupChatDetails,
  groupMessagePopulate,
} from "../../store";

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
interface groupInterface {
  groupname: string;
  id: string;
}
type messageArray = messages[];
let friendsArray: Array<friendsOBJ> = [];
let group: Array<groupInterface> = [];

const FriendList = (props: any) => {
  const dispatch = useDispatch();
  const socket = props.socket;

  // Resetting FriendList
  dispatch(clearFriendsList());
  friendsArray = [];

  useLayoutEffect(() => {
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
          friendsArray = response.data;
          friendListPopulator(friendsArray);
        }
        // console.log(frindsArray);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();

    const getGroups = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/users/getgroup",
          {
            email: email,
            password: password,
          }
        );
        if (response.status == 200) {
          group = response.data;
          groupPopulator(group);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getGroups();

    const groupPopulator = async (jsonData: Array<groupInterface>) => {
      const friendListContainer = document.querySelector(
        "#FriendList"
      ) as HTMLDivElement;
      for (let i = 0; i < jsonData.length; i++) {
        const friendContainer = document.createElement("div");
        const friendName = document.createElement("p");

        friendContainer.className = "Friend";
        friendName.className = "Friend-Username";
        friendName.innerText = `${jsonData[i].groupname}`;
        friendContainer.style.cursor = "pointer";
        friendContainer.addEventListener("click", openChat);
        function openChat() {
          // join the room for realtime chatting
          socket.emit("join-group", jsonData[i]);

          // clearing message and populating friends
          dispatch(clearMessages());
          dispatch(activateGroupChatMode(true));
          dispatch(
            setGroupChatDetails({
              room: `${jsonData[i].id}`,
              groupname: `${jsonData[i].groupname}`,
            })
          );
          const getMessages = async () => {
            try {
              const response: any = await axios.post(
                "http://localhost:5000/message/getgroupmessage",
                {
                  email: email,
                  password: password,
                  groupname: jsonData[i].groupname,
                  groupid: jsonData[i].id,
                }
              );
              const groupMessageArray = response.data;
              dispatch(groupMessagePopulate(groupMessageArray));
            } catch (error) {
              console.log(error);
            }
          };
          getMessages();
        }
        // Appending messages
        friendContainer.appendChild(friendName);
        friendListContainer.appendChild(friendContainer);
      }
    };

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
          // join the room for realtime chatting
          socket.emit("join-room", jsonData[i]);

          // clearing message and populating friends
          dispatch(clearMessages());
          dispatch(deactivateGroupChatMode());
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

        // Appending messages
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
