import { useState, useEffect } from "react";
import axios from "axios";
import robot from "../assets/roboot.jpg";

const ChatApp = () => {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userNameBot, setUserNameBot] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([{ text: "Hello! I am here to assist you?", sender: "bot" }]);

    const resetSession = async () => {
      try {
        await axios.post("https://resumebuilder-su2e.onrender.com/reset-session");
      } catch (error) {
        console.error("Failed to reset session:", error);
      }
    };
    resetSession();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await axios.post("https://resumebuilder-su2e.onrender.com/chat", { message: input });
      const botMessage = response.data.reply;
      const userName = response.data.name;
      setUserNameBot(userName);
      if (botMessage.includes("<a href=")) {
        const downloadLink = `https://resumebuilder-su2e.onrender.com/resumes/${userName}_resume.pdf`;
        setMessages([
          ...newMessages,
          {
            text: botMessage.replace("<a href=", `<a href="${downloadLink}" target="_blank" class="text-blue-400 underline" `),
            sender: "bot",
            isHTML: true
          }
        ]);
      } else {
        setMessages([...newMessages, { text: botMessage, sender: "bot" }]);
      }
    } catch (error) {
      setMessages([...newMessages, { text: "Sorry, something went wrong. Please try again later.", sender: "bot" }]);
    }
  };

  const closeChat = () => {
    setShowChat(false);
    setMessages([{ text: "Hello! What's your name?", sender: "bot" }]);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <h1 className="text-center text-4xl font-bold p-8">Welcome to My App</h1>
 
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
        {!showChat && (
          <div
            className="flex flex-col items-center p-4 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 shadow-lg cursor-pointer animate-top-down"
            onClick={() => setShowChat(true)}
          >
            <img
              src={robot}
              alt="Chatbot Icon"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <button className="bg-white text-black font-semibold px-4 py-2 rounded-full mt-2 sm:px-6 sm:py-3">
              Start Chat
            </button>
          </div>
        )}
      </div>

    
      {showChat && (
        <div className="chat-container flex flex-col h-screen bg-gray-800 mx-5 ">
        <div className="chat-window flex-1 p-4 sm:p-6 h-[calc(80vh-100px)] sm:h-[calc(80vh-150px)] overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} mb-2`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs sm:max-w-sm lg:max-w-md text-sm sm:text-base ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-gray-700 text-white rounded-tl-none"
                }`}
              >
                {msg.isHTML ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
      
          {isLoading && <div className="text-center text-sm text-gray-400">Bot is typing...</div>}
        </div>
      
        <div className="input-container bg-gray-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="border border-gray-600 bg-gray-700 text-white p-2 sm:p-3 w-full text-sm sm:text-base rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      )}
    </div>
  );
};

export default ChatApp;
