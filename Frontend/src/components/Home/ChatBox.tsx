import "./ChatBox.css";

const ChatBox = () => {
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
      </div>
      <div id="ChatBox-ToolBox">
        <input type="text" id="message" className="form-controll" />
        <button type="submit" className="btn" id="send-message">Send</button>
      </div>
    </>
  );
};

export default ChatBox;
