import './Chatbot.css';

import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { BsFillChatSquareDotsFill } from 'react-icons/bs';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);  // Create a ref

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);  // Scroll to the end when a new message is added
  const sendMessage = async (event) => {
    event.preventDefault();

    // Check if input is not empty
    if (input.trim() !== '') {
        // Save the user's message immediately.
        setMessages(prevMessages => [
            ...prevMessages,
            { type: "user", text: input },
        ]);

        try {
            let requestOptions = {
                method: "POST",
                body: JSON.stringify({ "question": input }),
                headers: { "Content-Type": "application/json" },
            };
            setInput("");
            const response = await fetch(
                "http://127.0.0.1:5000/chatbot",
                requestOptions
            );
            const data = await response.json();
            console.log(data);

            // Then update with the bot's message when it arrives.
            setMessages(prevMessages => [
                ...prevMessages,
                { type: "bot", text: data.result },
            ]);
        } catch (error) {
            setInput("");
            console.error("Error:", error);
            setMessages(prevMessages => [
                ...prevMessages,
                { type: "bot", text: "Sorry I can't answer you." },
            ]);
        }
    }
};
  return (
    <div className="chatbot">
      {open && (
        <div className="chat-box p-3 d-flex flex-column">
          <div className="border-bottom p-1">
            <h5 className="mb-0">Chatbot (Neo)</h5>
          </div>

          <div className="MessagesSection mb-3">
            <div className="my-4 mr-3">
              {messages.map((message, index) => (
                <p key={index} className={message.type + " word-break"}>
                  {message.text}
                </p>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>

          <div className="inputSection mt-auto ">
            <form onSubmit={sendMessage}>
              <div className="row mx-auto ">
                <input
                  type="text"
                  className="col-10 borderRadiusChatInput"
                  placeholder="Type a message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <div className="pl-0 col-2 ">
                  <button
                    className="blackbg btn px-4 py-2 white borderRadiusChatBtn"
                    type="submit"
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="d-flex justify-content-center align-items-center mt-2">
        <BsFillChatSquareDotsFill
          className="chat-icon"
          onClick={() => setOpen(!open)}
        />
      </div>
    </div>
  );
}
