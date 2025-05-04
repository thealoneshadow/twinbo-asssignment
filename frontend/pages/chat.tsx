"use client"
import React, {useState,useEffect} from 'react';
import { useUser } from '@clerk/nextjs'
import Header from '@/app/components/Header';
import "../app/globals.css";
import "../style/chat.css";
import { Spin } from 'antd';
import axios from 'axios';


const ChatPage: React.FC = () => {

    const {user, isSignedIn, isLoaded} = useUser();
    console.log(user);

    const [messages, setMessages] = useState<{ question: string; answer: string }[]>([])
    const [input, setInput] = useState('');
    const [loader, setLoader] = useState(false);
  
    const handleSend = async () => {
      if (!input.trim()) return

      setLoader(true);
      const answer =  await aiResponse();
      console.log(answer);
      setMessages([...messages, { question: input, answer: '' }])
      setInput('');
      setLoader(false);

    }

    useEffect(() => {

    }, []);

    // const addUser = async () =>{
    //     const clerkId = user?.id;
    //     const result = await axios.post(`${process.env.BACKEND_URL}/api/add-user`, {
    //         clerkId,
    //         userName: user?.username,
    //     });
    //     console.log(result.data);
    // }

    // const addChats = async (message: { question: String; answer: String; }) =>{
    //     const userId = user?.id;
    //     const question = message.question;
    //     const answer = message.answer;
    //     const result = await axios.post(`${process.env.BACKEND_URL}/api/add-chats`, {
    //         userId,
    //         question,
    //         answer
    //     });
    //     console.log(result.data);
    // }

    // const getChats = async () =>{
    //     const userId = user?.id;
    //     const result = await axios.get(`${process.env.BACKEND_URL}/api/get-chats`, {
    //         params: { userId }
    //     });
    //     console.log(result.data);
    // }

    const aiResponse = async () =>{
        // const userId = user?.id;
        const prompt = input;
        const historyList = messages.slice(-10);

        const history = [];
        for(let i=0;i<historyList.length;i++){
            history.push({
                role: "user",
                content: historyList[i].question || ''
            });
            history.push({
                role: "assistant",
                content: historyList[i].answer || ""
            });
        }

        const result = await axios.post(`https://twinbo-asssignment.onrender.com/api/gemini-ai`, {
            prompt,
            history
        });
        return result;
    }



    if (!isLoaded) return <div>
        <Header />
        Loading...</div>
    if (!isSignedIn) return <div>
        <Header />
        Please sign in</div>

    return (
        <div>
            <div className="app-container">
      <aside className="sidebar">
        <div className="logo">🤖 ChatBot</div>
        <nav>
          <button className="new-chat">+ New Chat</button>
        </nav>
      </aside>
      <main className="chat-main">
      <p className="welcome-heading">Welcome , {user.fullName}!</p>
      <Header />
      
        <div className="chat-window">
          {messages.map((msg, idx) => (
            <div key={idx} className="message">
              <div className="user">You</div>
              <div className="bubble">{msg.question}</div>
            </div>
          ))}
        </div>

        {
            loader && (
                <div className='spinner-ui'>
                <Spin tip="Loading" size="large">
                </Spin>
                </div>
            )
        }

    
        <div className="input-bar">
          <input
            className="chat-input"
            value={input}
            placeholder="Send a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-button" onClick={handleSend}>➤</button>
        </div>
      </main>
    </div>
          
   
        </div>
    );
};

export default ChatPage;