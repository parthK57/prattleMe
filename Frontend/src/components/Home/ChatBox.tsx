import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./ChatBox.css";
import Notify from "../Notify/Notify";
import { useSelector } from "react-redux";

const email = localStorage.getItem("email");
const password = localStorage.getItem("password");
interface messages {
  email: string;
  message: string;
  timestamp: string;
  clientEmail: string;
}
type messageArray = messages[] | undefined | null;

// @ts-expect-error
const socket = io.connect("http://localhost:5000");

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notify, setNotify] = useState(false);
  const user2Username = useSelector(
    (state: any) => state.friendsList.value.user2Username
  );
  const clientEmail = useSelector(
    (state: any) => state.friendsList.value.user2
  );
  const messageArray: messageArray = useSelector(
    (state: any) => state.messages.value
  );
  console.log(messageArray);

  const sendMessage = () => {
    try {
      console.log(message);
      socket.emit("send_message", {
        email: email,
        password: password,
        clientEmail: "clientEmail",
        message: message,
      });
      const messageInputElement = document.querySelector(
        "#message"
      ) as HTMLInputElement;
      messageInputElement.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (messageArray != undefined || messageArray != null) {
      const deleteChats = () => {
        const chatBody = document.querySelector(
          "#ChatBox-Body"
        ) as HTMLDivElement;
        let child = chatBody.lastElementChild;
        while (child) {
          chatBody.removeChild(child);
          child = chatBody.lastElementChild;
        }
      };
      deleteChats();
      
      const populateChatbox = (data: messageArray) => {
        const chatBody = document.querySelector(
          "#ChatBox-Body"
        ) as HTMLDivElement;
        // @ts-nocheck
        for (let i = 0; i < data.length; i++) {
          const messageContainer = document.createElement("div");
          const message = document.createElement("p");

          if (data[i].email == email) {
            messageContainer.className = "message-container";
            message.className = "message";
            message.innerText = `${data[i].message}`;
          } else if (data[i].email == clientEmail) {
            messageContainer.className = "friend-message-container";
            message.className = "friend-message";
            message.innerText = `${data[i].message}`;
          }
          messageContainer.appendChild(message);
          chatBody.appendChild(messageContainer);
        }
      };
      populateChatbox(messageArray);
    }
  }, [messageArray]);
  return (
    <>
      <div id="Chatbox-Title-Container">
        <h4 id="Chatbox-Title">{user2Username}</h4>
      </div>
      <div id="ChatBox-Body">
        {notify ? <Notify message={notifyMessage} /> : null}
      </div>
      <div id="ChatBox-ToolBox">
        <input
          type="text"
          id="message"
          onChange={(event) => setMessage(event.target.value)}
          className="form-controll"
        />
        <button
          type="submit"
          className="btn"
          onClick={sendMessage}
          id="send-message"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatBox;
