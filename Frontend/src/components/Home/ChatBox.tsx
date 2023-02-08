import { useState } from "react";
import io from "socket.io-client";
import "./ChatBox.css";
import Notify from "../Notify/Notify";

const email = localStorage.getItem("email");
const password = localStorage.getItem("password");
// @ts-expect-error
const socket = io.connect("http://localhost:5000");

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notify, setNotify] = useState(false);

  const sendMessage = () => {
    try {
      console.log(message);
      socket.emit("send_message", {
        email: email,
        password: password,
        message: message,
      });
      const messageInputElement = document.querySelector(
        "#message"
      ) as HTMLInputElement;
      messageInputElement.value = "";
    } catch (error) {
      // setNotify(true);
      // //@ts-expect-error
      // setNotifyMessage(error.response.data);
      // setTimeout(() => {
      //   setNotify(false);
      // }, 2000);
      console.log(error);
    }
  };

  return (
    <>
      <div id="Chatbox-Title-Container">
        <h4 id="Chatbox-Title">Steve Rogers</h4>
      </div>
      <div id="ChatBox-Body">
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="message-container">
          <p className="msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="message-container">
          <p className="msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="message-container">
          <p className="msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="message-container">
          <p className="msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="friend-message-container">
          <p className="friend-msg">hello</p>
        </div>
        <div className="message-container">
          <p className="msg">hello</p>
        </div>
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
