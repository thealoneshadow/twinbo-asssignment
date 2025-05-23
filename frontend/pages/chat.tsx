"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Header from "@/app/components/Header";
import "../app/globals.css";
import "./chat.css";
import axios from "axios";

import dynamic from "next/dynamic";
const Spin = dynamic(() => import("antd").then((mod) => mod.Spin), {
  ssr: false,
});

const ChatPage: React.FC = () => {
  const { user, isSignedIn, isLoaded } = useUser();
  console.log(user);

  const [messages, setMessages] = useState<
    { question: string; answer: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loader, setLoader] = useState(false);


  useEffect(() => {
    if (isLoaded && isSignedIn) {
      addUser();
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded)
    return (
      <div>
        <Header />
        <div className="spinner-ui">
              <Spin tip="Loading" size="large"></Spin>
            </div>
      </div>
    );
  if (!isSignedIn)
    return (
      <div>
        <Header />
        <div className="login-heading">
              <h1 className="login-text">
                Kindly Login or SignUp to use the chat feature
              </h1>
            </div>
        
      </div>
    );
    


  const handleSend = async () => {
    if (!input.trim()) return;

    setLoader(true);
    const answer = await aiResponse();
  
    setMessages([...messages, { question: input, answer: answer }]);
    setInput("");
    setLoader(false);
    const message = { question: input, answer: answer };
    addChats(message);
    const element = document.getElementsByClassName(`chat-window`)[0] as HTMLElement;
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
  };



  const addUser = async () => {
    try {
      
      const clerkId = user?.id;
        console.log(clerkId);
      const result = await axios.post(
        `https://twinbo-asssignment.onrender.com/api/add-user`,
        {
          clerkId,
          userName: user?.fullName,
        }
      );
      console.log(result.data);
      await getChats();
    } catch (err) {
      console.log(err);

      await getChats();
    }
  };

  const addChats = async (message: { question: string; answer: string }) => {
    const userId = user?.id;
    const question = message.question;
    const answer = message.answer;
    const result = await axios.post(
      `https://twinbo-asssignment.onrender.com/api/add-chats`,
      {
        userId,
        question,
        answer,
      }
    );
    console.log(result.data);
  };

  const getChats = async () => {
    
    const userId = user?.id;
    console.log(userId);
    const result = await axios.get(
      `https://twinbo-asssignment.onrender.com/api/get-chats`,
      {
        params: { userId },
      }
    );

    const maindata = [];
    for (let i = result.data.result.length-1; i >= 0 ; i--) {
      maindata.push({
        question: result.data.result[i].question,
        answer: result.data.result[i].answer,
      });
    }
    setMessages(maindata);
    
  };

  const aiResponse = async () => {
    // const userId = user?.id;
    const prompt = input;
    const historyList = messages.slice(-10);

    const history = [];
    for (let i = 0; i < historyList.length; i++) {
      history.push({
        role: "user",
        content: historyList[i].question || "",
      });
      history.push({
        role: "assistant",
        content: historyList[i].answer || "",
      });
    }

    const result = await axios.post(
      `https://twinbo-asssignment.onrender.com/api/gemini-ai`,
      {
        prompt,
        history,
      }
    );
    return result?.data.result;
  };

  return (
    <div>
      <div className="app-container">
        <aside className="sidebar">
          <div className="logo">🤖 Smart Echo AI</div>
          <nav>
            Coming Soon...
          </nav>
        </aside>
        <main className="chat-main">
          <p className="welcome-heading">Welcome , {user.fullName ? user.fullName : "User"}!</p>
          <Header />

          <div className="chat-window">
            {messages.map((msg, idx) => (
              <>
                <div key={idx} className="message-question">
                  <div className="user">{user.fullName ? user.fullName : "User" + " (You)"}</div>
                  <div className="bubble">{msg.question}</div>
                </div>
                <div key={idx+"1"} className="message">
                  <div className="user">Gemini Smart Echo AI</div>
                  <div className="bubble">{msg.answer}</div>
                </div>
              </>
            ))}
            {loader && (
            <div className="spinner-ui">
              <Spin tip="Loading" size="large"></Spin>
            </div>
          )}
          </div>



          <div className="input-bar">
            <input
              className="chat-input"
              value={input}
              placeholder="Send a message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="send-button" onClick={handleSend}>
              ➤
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatPage;
