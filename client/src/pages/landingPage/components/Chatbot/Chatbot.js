import React, { useState } from "react";
import { Button, Card, FormControl, InputGroup } from "react-bootstrap";
import { BsFillChatSquareDotsFill } from "react-icons/bs";
import "./Chatbot.css";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    "Hello! How can I assist you today?",
  ]);
  const [input, setInput] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    // the user message is saved in {input}
    setMessages([
      ...messages,
      { type: "user", text: input },
      { type: "bot", text: input },
    ]);
    setInput("");
  };

  return (
    <div className="chatbot">
      {open && (
        <div className=" chat-box">
          <div className="card-body chat-content">
            {messages.map((message, index) => (
              <p key={index}>{message}</p>
            ))}
          </div>
          <div className="card">
            <form onSubmit={sendMessage}>
              <div className="row mx-auto">
                <input
                  type="text"
                  className="col-10"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className=" pl-0 col-2">
                  <button className="blackbg btn px-4 py-2 white" type="submit">
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center mt-2">
        <BsFillChatSquareDotsFill
          className="chat-icon"
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
}
