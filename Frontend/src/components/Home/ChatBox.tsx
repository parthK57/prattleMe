import { useEffect, useState, useLayoutEffect } from "react";
import axios from "axios";
import "./ChatBox.css";
import Notify from "../Notify/Notify";
import { useSelector } from "react-redux";

const email = localStorage.getItem("email");
const password = localStorage.getItem("password");
const USERNAME = localStorage.getItem("username");

interface groupMessage {
  from: string;
  message: string;
}
interface messages {
  email: string;
  message: string;
  timestamp: string;
  clientEmail: string;
}
type messageArray = messages[] | undefined | null;
type groupMessageArray = groupMessage[] | null | undefined;

const ChatBox = (props: any) => {
  const [message, setMessage] = useState("");
  const [messageRecieved, setMessageRecieved] = useState("");
  const [notifyMessage, setNotifyMessage] = useState("");
  const [notify, setNotify] = useState(false);

  // GROUP CHAT LOGIC
  const groupChatMode: boolean = useSelector(
    (state: any) => state.groupChatMode.value
  );
  console.log(groupChatMode);
  const groupChatName: string | null = useSelector(
    (state: any) => state.groupChatDetails.value.groupname
  );
  const groupChatRoom: string | null = useSelector(
    (state: any) => state.groupChatDetails.value.room
  );
  const groupMessageArray: groupMessageArray = useSelector(
    (state: any) => state.groupMessages.value
  );

  // PERSON TO PERSON LOGIC
  const user2Username: string | null = useSelector(
    (state: any) => state.friendsList.value.user2Username
  );
  const clientEmail: string | null = useSelector(
    (state: any) => state.friendsList.value.user2
  );
  const room: string | null = useSelector(
    (state: any) => state.friendsList.value.room
  );
  const messageArray: messageArray = useSelector(
    (state: any) => state.messages.value
  );
  const socket = props.socket;

  // Send Message Logic
  const sendMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/message/sendmessage",
        {
          email: email,
          password: password,
          message: message,
          clientEmail: clientEmail,
        }
      );
      // clearing input tag
      const messageInputElement = document.querySelector(
        "#message"
      ) as HTMLInputElement;
      messageInputElement.value = "";

      if (response.status == 201) {
        socket.emit("send_message", {
          message: message,
          room: room,
        });
        const chatBody = document.querySelector(
          "#ChatBox-Body"
        ) as HTMLDivElement;
        const messageContainer = document.createElement("div");
        const messageElement = document.createElement("p");

        messageContainer.className = "message-container";
        messageElement.className = "message";
        messageElement.innerText = `${message}`;

        messageContainer.appendChild(messageElement);
        chatBody.appendChild(messageContainer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Send Group Message Logic
  const sendGroupMessage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/message/sendgroupmessage",
        {
          email: email,
          password: password,
          groupname: groupChatName,
          username: USERNAME,
          message: message,
          groupid: groupChatRoom,
        }
      );
      console.log(response);
      // clearing input tag
      const messageInputElement = document.querySelector(
        "#message"
      ) as HTMLInputElement;
      messageInputElement.value = "";
      if (response.status == 201) {
        socket.emit("send_group_message", {
          username: USERNAME,
          message: message,
          room: groupChatRoom,
        });
        const chatBody = document.querySelector(
          "#ChatBox-Body"
        ) as HTMLDivElement;
        const messageContainer = document.createElement("div");
        const wrapper = document.createElement("div");
        const messageElement = document.createElement("p");
        const person = document.createElement("p");
        person.innerText = "Me";
        wrapper.className = "message-details-wrapper";
        messageContainer.className = "message-container";
        person.className = "user-group-name";
        messageElement.className = "user-group-message";
        messageElement.innerText = `${message}`;

        wrapper.appendChild(person);
        wrapper.appendChild(messageElement);
        messageContainer.appendChild(wrapper);
        chatBody.appendChild(messageContainer);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // SOCKET RECIEVE MESSAGE
  groupChatMode
    ? useEffect(() => {
        // socket.on("server", (data: any) => {
        //   console.log(`Message from server:${data}`);
        // });
        socket.on("server-client-group-message", (data: any) => {
          console.log(data);
          setMessageRecieved(data);
          const chatBody = document.querySelector(
            "#ChatBox-Body"
          ) as HTMLDivElement;
          const messageContainer = document.createElement("div");
          const wrapper = document.createElement("div");
          const message = document.createElement("p");
          const person = document.createElement("p");

          message.innerText = `${data.message}`;
          if (data.username == USERNAME) {
            person.innerText = "Me";
            wrapper.className = "message-details-wrapper";
            messageContainer.className = "message-container";
            person.className = "user-group-name";
            message.className = "user-group-message";
          } else {
            person.innerText = `${data.username}`;
            wrapper.className = "friend-message-details-wrapper";
            messageContainer.className = "friend-message-container";
            person.className = "friend-group-name";
            message.className = "friend-group-mesage";
          }

          wrapper.appendChild(person);
          wrapper.appendChild(message);
          messageContainer.appendChild(wrapper);
          chatBody.appendChild(messageContainer);
        });
      }, [socket])
    : useEffect(() => {
        socket.on("server", (data: any) => {
          console.log(`Message from server:${data}`);
        });
        socket.on("server-client-message", (data: any) => {
          // setMessageRecieved(data);
          const chatBody = document.querySelector(
            "#ChatBox-Body"
          ) as HTMLDivElement;
          const messageContainer = document.createElement("div");
          const messageElement = document.createElement("p");

          messageContainer.className = "friend-message-container";
          messageElement.className = "friend-message";
          messageElement.innerText = `${data}`;

          messageContainer.appendChild(messageElement);
          chatBody.appendChild(messageContainer);
        });
      }, [socket]);

  // Recieve Message Logic
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
        // @ts-expect-error
        for (let i = 0; i < data.length; i++) {
          const messageContainer = document.createElement("div");
          const message = document.createElement("p");
          // @ts-expect-error
          if (data[i].email == email) {
            messageContainer.className = "message-container";
            message.className = "message";
            // @ts-expect-error
            message.innerText = `${data[i].message}`;
            // @ts-expect-error
          } else if (data[i].email == clientEmail) {
            messageContainer.className = "friend-message-container";
            message.className = "friend-message";
            // @ts-expect-error
            message.innerText = `${data[i].message}`;
          }
          messageContainer.appendChild(message);
          chatBody.appendChild(messageContainer);
        }
      };
      groupChatMode ? null : populateChatbox(messageArray);
    }
  }, [messageArray]);

  // Receive Group Message
  useEffect(() => {
    if (groupMessageArray != undefined || groupMessageArray != null) {
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

      // Group Chat Populator
      const populateGroupChatbox = (data: groupMessageArray) => {
        const chatBody = document.querySelector(
          "#ChatBox-Body"
        ) as HTMLDivElement;
        // @ts-expect-error
        for (let i = 0; i < data.length; i++) {
          const messageContainer = document.createElement("div");
          const wrapper = document.createElement("div");
          const message = document.createElement("p");
          const person = document.createElement("p");

          // @ts-expect-error
          message.innerText = `${data[i].message}`;
          // @ts-expect-error
          if (data[i].from == USERNAME) {
            person.innerText = "Me";
            wrapper.className = "message-details-wrapper";
            messageContainer.className = "message-container";
            person.className = "user-group-name";
            message.className = "user-group-message";
          } else {
            // @ts-expect-error
            person.innerText = `${data[i].from}`;
            wrapper.className = "friend-message-details-wrapper";
            messageContainer.className = "friend-message-container";
            person.className = "friend-group-name";
            message.className = "friend-group-mesage";
          }

          wrapper.appendChild(person);
          wrapper.appendChild(message);
          messageContainer.appendChild(wrapper);
          chatBody.appendChild(messageContainer);
        }
      };
      groupChatMode ? populateGroupChatbox(groupMessageArray) : null;
    }
  }, [groupMessageArray]);

  return (
    <>
      <div id="Chatbox-Title-Container">
        <h4 id="Chatbox-Title">
          {groupChatMode ? groupChatName : user2Username}
        </h4>
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
          onClick={groupChatMode ? sendGroupMessage : sendMessage}
          id="send-message"
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatBox;
