import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
  const [message, setMessage] = useState("");

  const handleTyping = () =>
    socket.emit(
      "typing",
      `${localStorage.getItem("ws-chat-userName")} is typing`
    );
  const handleTypingStopped = () =>
    socket.emit("idle", `${localStorage.getItem("ws-chat-userName")} is idle`);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem("ws-chat-userName")) {
      socket.emit("message", {
        text: message,
        name: localStorage.getItem("ws-chat-userName"),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage("");
  };
  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
          onBlur={handleTypingStopped}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
